"""
=============================================================================
CodeKids Academy - Database & Admin CRUD Manager (Python + SQLite)
=============================================================================
File ini adalah sistem database mandiri berbasis SQLite untuk menyimpan data 
pengguna, foto profil (avatar), progres belajar, pencapaian (achievements), 
dan level XP.

Fitur:
1. Database SQLite lokal (`codekids.db`) tanpa perlu instalasi library tambahan.
2. Fungsi CRUD lengkap (Create, Read, Update, Delete) untuk Admin.
3. Menu Interaktif Terminal (CLI Admin) untuk mengelola data user dengan mudah.
4. Server REST API lokal bawaan (Python standard library `http.server`) yang 
   dapat dijalankan untuk integrasi frontend/API jika diinginkan.

Cara Penggunaan:
- Menu Terminal Admin : python database.py
- Jalankan Server API  : python database.py --server
=============================================================================
"""

import sqlite3
import json
import os
import sys
import base64
import secrets
import time
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "codekids.db")
UPLOADS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads", "avatars")
os.makedirs(UPLOADS_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

MIME_TYPES = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
}


def safe_delete_avatar_file(avatar_filename):
    """Menghapus file avatar fisik dari folder uploads/avatars/ dengan aman."""
    if not avatar_filename or not isinstance(avatar_filename, str):
        return
    # Hindari path traversal dan Base64 legacy
    if avatar_filename.startswith("data:image/") or "/" in avatar_filename or "\\" in avatar_filename:
        avatar_filename = os.path.basename(avatar_filename)
    if not avatar_filename:
        return
    target_path = os.path.join(UPLOADS_DIR, avatar_filename)
    if os.path.isfile(target_path):
        try:
            os.remove(target_path)
        except Exception:
            pass


class CodeKidsDB:
    """Kelas pengelola database SQLite untuk CodeKids Academy."""

    def __init__(self, db_path=DB_FILE):
        self.db_path = db_path
        self.init_db()

    def get_connection(self):
        """Membuat koneksi ke database SQLite."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self):
        """Inisialisasi tabel dan akun admin default jika belum ada."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    role TEXT NOT NULL DEFAULT 'user',
                    avatar TEXT NOT NULL DEFAULT '',
                    xp INTEGER NOT NULL DEFAULT 0,
                    progress TEXT NOT NULL DEFAULT '{}',
                    achievements TEXT NOT NULL DEFAULT '[]',
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                )
            """)
            conn.commit()

            # Pastikan kolom avatar ada jika database dibuat sebelumnya tanpa kolom avatar
            cursor.execute("PRAGMA table_info(users)")
            columns = [row["name"] for row in cursor.fetchall()]
            if "avatar" not in columns:
                try:
                    cursor.execute("ALTER TABLE users ADD COLUMN avatar TEXT NOT NULL DEFAULT ''")
                    conn.commit()
                except Exception:
                    pass

            # Seed akun admin default jika belum ada
            cursor.execute("SELECT id FROM users WHERE email = ?", ("admin@codekids.local",))
            if not cursor.fetchone():
                now = datetime.now().isoformat()
                cursor.execute("""
                    INSERT INTO users (name, email, password, role, avatar, xp, progress, achievements, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    "CodeKids Admin",
                    "admin@codekids.local",
                    "admin123",
                    "admin",
                    "",
                    0,
                    json.dumps({}),
                    json.dumps([]),
                    now,
                    now
                ))
                conn.commit()

            # Migrasi avatar Base64 lama ke file fisik di uploads/avatars/
            try:
                cursor.execute("SELECT id, avatar FROM users WHERE avatar LIKE 'data:image/%'")
                legacy_users = cursor.fetchall()
                for row in legacy_users:
                    uid = row["id"]
                    raw_b64 = row["avatar"]
                    if "," in raw_b64:
                        header, encoded = raw_b64.split(",", 1)
                        ext = ".png"
                        if "jpeg" in header or "jpg" in header:
                            ext = ".jpg"
                        elif "gif" in header:
                            ext = ".gif"
                        elif "webp" in header:
                            ext = ".webp"
                        elif "svg" in header:
                            ext = ".svg"
                        try:
                            img_bytes = base64.b64decode(encoded)
                            fname = f"avatar_{uid}_legacy_{secrets.token_hex(4)}{ext}"
                            fpath = os.path.join(UPLOADS_DIR, fname)
                            with open(fpath, "wb") as f:
                                f.write(img_bytes)
                            cursor.execute("UPDATE users SET avatar = ? WHERE id = ?", (fname, uid))
                            conn.commit()
                            print(f"[CodeKids DB] Migrasi avatar user ID {uid} dari Base64 ke {fname} berhasil.")
                        except Exception as err:
                            print(f"[CodeKids DB] Peringatan: Gagal memigrasi avatar Base64 user {uid}: {err}")
            except Exception as mig_err:
                print(f"[CodeKids DB] Peringatan migrasi avatar: {mig_err}")

    # -------------------------------------------------------------------------
    # CRUD: CREATE
    # -------------------------------------------------------------------------
    def create_user(self, name, email, password, role="user", avatar="", xp=0, progress=None, achievements=None):
        """Menambahkan user baru ke database."""
        email = email.strip().lower()
        name = name.strip()
        progress_json = json.dumps(progress if progress is not None else {})
        achievements_json = json.dumps(achievements if achievements is not None else [])
        now = datetime.now().isoformat()

        try:
            with self.get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO users (name, email, password, role, avatar, xp, progress, achievements, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (name, email, password, role, avatar or "", xp, progress_json, achievements_json, now, now))
                conn.commit()
                return {"success": True, "id": cursor.lastrowid, "message": f"User '{name}' berhasil didaftarkan."}
        except sqlite3.IntegrityError:
            return {"success": False, "message": f"Email '{email}' sudah terdaftar."}
        except Exception as e:
            return {"success": False, "message": str(e)}

    # -------------------------------------------------------------------------
    # CRUD: READ
    # -------------------------------------------------------------------------
    def get_all_users(self):
        """Mengambil seluruh data user (untuk admin)."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, email, password, role, avatar, xp, progress, achievements, created_at, updated_at FROM users ORDER BY id ASC")
            rows = cursor.fetchall()
            users = []
            for row in rows:
                user_dict = dict(row)
                try:
                    user_dict["progress"] = json.loads(user_dict["progress"])
                except Exception:
                    user_dict["progress"] = {}
                try:
                    user_dict["achievements"] = json.loads(user_dict["achievements"])
                except Exception:
                    user_dict["achievements"] = []
                users.append(user_dict)
            return users

    def get_user_by_id(self, user_id):
        """Mengambil satu data user berdasarkan ID."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
            row = cursor.fetchone()
            if row:
                user_dict = dict(row)
                user_dict["progress"] = json.loads(user_dict["progress"])
                user_dict["achievements"] = json.loads(user_dict["achievements"])
                return user_dict
            return None

    def get_user_by_email(self, email):
        """Mengambil satu data user berdasarkan Email."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE email = ?", (email.strip().lower(),))
            row = cursor.fetchone()
            if row:
                user_dict = dict(row)
                user_dict["progress"] = json.loads(user_dict["progress"])
                user_dict["achievements"] = json.loads(user_dict["achievements"])
                return user_dict
            return None

    def authenticate_user(self, email, password):
        """Verifikasi login user berdasarkan email dan password."""
        user = self.get_user_by_email(email)
        if user and user["password"] == password:
            return {"success": True, "user": user}
        return {"success": False, "message": "Email atau password salah."}

    # -------------------------------------------------------------------------
    # CRUD: UPDATE
    # -------------------------------------------------------------------------
    def update_user(self, user_id, name=None, password=None, role=None, avatar=None, xp=None, progress=None, achievements=None):
        """Memperbarui informasi user."""
        user = self.get_user_by_id(user_id)
        if not user:
            return {"success": False, "message": f"User dengan ID {user_id} tidak ditemukan."}

        new_name = name if name is not None else user["name"]
        new_password = password if password is not None else user["password"]
        new_role = role if role is not None else user["role"]
        new_avatar = avatar if avatar is not None else user.get("avatar", "")
        new_xp = xp if xp is not None else user["xp"]
        new_progress = json.dumps(progress) if progress is not None else json.dumps(user["progress"])
        new_achievements = json.dumps(achievements) if achievements is not None else json.dumps(user["achievements"])
        now = datetime.now().isoformat()

        old_avatar = user.get("avatar", "")

        try:
            with self.get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    UPDATE users
                    SET name = ?, password = ?, role = ?, avatar = ?, xp = ?, progress = ?, achievements = ?, updated_at = ?
                    WHERE id = ?
                """, (new_name, new_password, new_role, new_avatar, new_xp, new_progress, new_achievements, now, user_id))
                conn.commit()

                # Jika avatar diganti/dihapus, hapus file avatar lama jika tidak dipakai user lain
                if avatar is not None and old_avatar and old_avatar != new_avatar:
                    cursor.execute("SELECT COUNT(*) as cnt FROM users WHERE avatar = ? AND id != ?", (old_avatar, user_id))
                    if cursor.fetchone()["cnt"] == 0:
                        safe_delete_avatar_file(old_avatar)

                return {"success": True, "message": f"Data user ID {user_id} ({new_name}) berhasil diperbarui."}
        except Exception as e:
            return {"success": False, "message": str(e)}

    # -------------------------------------------------------------------------
    # CRUD: DELETE
    # -------------------------------------------------------------------------
    def delete_user(self, user_id):
        """Menghapus user berdasarkan ID."""
        user = self.get_user_by_id(user_id)
        if not user:
            return {"success": False, "message": f"User dengan ID {user_id} tidak ditemukan."}

        old_avatar = user.get("avatar", "")

        try:
            with self.get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
                conn.commit()

                # Hapus file avatar user jika tidak dipakai user lain
                if old_avatar:
                    cursor.execute("SELECT COUNT(*) as cnt FROM users WHERE avatar = ?", (old_avatar,))
                    if cursor.fetchone()["cnt"] == 0:
                        safe_delete_avatar_file(old_avatar)

                return {"success": True, "message": f"User '{user['name']}' (ID: {user_id}) berhasil dihapus."}
        except Exception as e:
            return {"success": False, "message": str(e)}


# =============================================================================
# ADMIN TERMINAL CLI (Interactive Console)
# =============================================================================
def print_separator(title=""):
    print("\n" + "=" * 65)
    if title:
        print(f" {title.center(63)} ")
        print("=" * 65)


def cli_list_users(db):
    """Menampilkan daftar seluruh user dalam format tabel."""
    users = db.get_all_users()
    print_separator("DAFTAR PENGGUNA (CODEKIDS ACADEMY)")
    print(f"{'ID':<4} | {'Nama':<18} | {'Email':<24} | {'Role':<6} | {'XP':<6} | {'Modul'}")
    print("-" * 65)
    for u in users:
        completed_modules = len([v for v in u["progress"].values() if isinstance(v, dict) and v.get("completed")])
        print(f"{u['id']:<4} | {u['name'][:18]:<18} | {u['email'][:24]:<24} | {u['role']:<6} | {u['xp']:<6} | {completed_modules} selesai")
    print("-" * 65)
    print(f"Total: {len(users)} pengguna terdaftar.")


def cli_create_user(db):
    """Menu CLI untuk menambah user baru."""
    print_separator("TAMBAH PENGGUNA BARU")
    name = input("Masukkan Nama           : ").strip()
    if not name:
        print("❌ Nama tidak boleh kosong.")
        return
    email = input("Masukkan Email          : ").strip()
    if not email:
        print("❌ Email tidak boleh kosong.")
        return
    password = input("Masukkan Password       : ").strip()
    if len(password) < 6:
        print("❌ Password minimal 6 karakter.")
        return
    role_input = input("Role (1. user / 2. admin) [default: user]: ").strip()
    role = "admin" if role_input == "2" or role_input.lower() == "admin" else "user"

    res = db.create_user(name=name, email=email, password=password, role=role)
    if res["success"]:
        print(f"✅ Berhasil! {res['message']} (ID: {res['id']})")
    else:
        print(f"❌ Gagal: {res['message']}")


def cli_search_user(db):
    """Menu CLI untuk mencari user berdasarkan ID atau Email."""
    print_separator("CARI DATA PENGGUNA")
    keyword = input("Masukkan ID atau Email: ").strip()
    if not keyword:
        return

    user = None
    if keyword.isdigit():
        user = db.get_user_by_id(int(keyword))
    if not user:
        user = db.get_user_by_email(keyword)

    if user:
        print_separator(f"DETAIL USER: {user['name']}")
        print(f"ID           : {user['id']}")
        print(f"Nama         : {user['name']}")
        print(f"Email        : {user['email']}")
        print(f"Role         : {user['role']}")
        print(f"XP           : {user['xp']} XP")
        print(f"Dibuat Pada  : {user['created_at']}")
        print(f"Diupdate     : {user['updated_at']}")
        print(f"Modul Selesai: {len(user['progress'])} item tercatat")
        print(f"Achievements : {len(user['achievements'])} item tercatat")
    else:
        print(f"❌ User '{keyword}' tidak ditemukan.")


def cli_update_user(db):
    """Menu CLI untuk mengedit user."""
    print_separator("UPDATE / EDIT DATA PENGGUNA")
    user_id_str = input("Masukkan ID User yang ingin diedit: ").strip()
    if not user_id_str.isdigit():
        print("❌ ID harus berupa angka.")
        return
    user_id = int(user_id_str)
    user = db.get_user_by_id(user_id)
    if not user:
        print(f"❌ User dengan ID {user_id} tidak ditemukan.")
        return

    print(f"\nMengedit User: {user['name']} ({user['email']})")
    print("(Tekan Enter langsung jika tidak ingin mengubah data tertentu)\n")

    new_name = input(f"Nama baru [{user['name']}]: ").strip() or None
    new_pass = input(f"Password baru (kosongkan jika tetap): ").strip() or None
    new_role = input(f"Role baru (user/admin) [{user['role']}]: ").strip() or None
    new_xp_str = input(f"XP baru [{user['xp']}]: ").strip()
    new_xp = int(new_xp_str) if new_xp_str.isdigit() else None

    res = db.update_user(user_id=user_id, name=new_name, password=new_pass, role=new_role, xp=new_xp)
    if res["success"]:
        print(f"✅ {res['message']}")
    else:
        print(f"❌ {res['message']}")


def cli_delete_user(db):
    """Menu CLI untuk menghapus user."""
    print_separator("HAPUS PENGGUNA")
    user_id_str = input("Masukkan ID User yang akan dihapus: ").strip()
    if not user_id_str.isdigit():
        print("❌ ID harus berupa angka.")
        return
    user_id = int(user_id_str)
    user = db.get_user_by_id(user_id)
    if not user:
        print(f"❌ User dengan ID {user_id} tidak ditemukan.")
        return

    confirm = input(f"Apakah Anda yakin ingin menghapus '{user['name']}' ({user['email']})? (y/N): ").strip().lower()
    if confirm == "y":
        res = db.delete_user(user_id)
        if res["success"]:
            print(f"✅ {res['message']}")
        else:
            print(f"❌ {res['message']}")
    else:
        print("Operasi penghapusan dibatalkan.")


# =============================================================================
# REST API SERVER (Built-in Standard Library)
# =============================================================================
class CodeKidsAPIHandler(BaseHTTPRequestHandler):
    """HTTP Request Handler untuk menyediakan API endpoint data user dan serving file avatar."""
    db = CodeKidsDB()

    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Filename")
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Filename")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path == "" or path == "/":
            self._send_json(200, {
                "service": "CodeKids Academy Database API",
                "endpoints": {
                    "GET /api/users": "Ambil seluruh daftar pengguna (Admin)",
                    "GET /api/users/<id>": "Ambil data satu user berdasarkan ID",
                    "POST /api/users": "Tambah / Registrasi pengguna baru",
                    "POST /api/login": "Autentikasi login pengguna",
                    "POST /api/upload-avatar": "Upload file foto avatar (multipart/form-data)",
                    "PUT /api/users/<id>": "Update profil / foto / progres / XP pengguna",
                    "DELETE /api/users/<id>": "Hapus pengguna (Admin)",
                    "GET /uploads/avatars/<filename>": "Akses file gambar avatar"
                }
            })
            return

        # Serving Static Avatar Images
        if path.startswith("/uploads/avatars/"):
            filename = os.path.basename(path)
            file_path = os.path.join(UPLOADS_DIR, filename)
            # Keamanan: pastikan tidak ada directory traversal
            if os.path.abspath(file_path).startswith(os.path.abspath(UPLOADS_DIR)) and os.path.isfile(file_path):
                ext = os.path.splitext(filename)[1].lower()
                mime_type = MIME_TYPES.get(ext, "application/octet-stream")
                try:
                    with open(file_path, "rb") as f:
                        content = f.read()
                    self.send_response(200)
                    self.send_header("Content-Type", mime_type)
                    self.send_header("Content-Length", str(len(content)))
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.send_header("Cache-Control", "public, max-age=86400")
                    self.end_headers()
                    self.wfile.write(content)
                    return
                except Exception as e:
                    self._send_json(500, {"success": False, "message": f"Gagal membaca file: {str(e)}"})
                    return
            else:
                self._send_json(404, {"success": False, "message": "File avatar tidak ditemukan."})
                return

        if path == "/api/users":
            users = self.db.get_all_users()
            self._send_json(200, {"success": True, "count": len(users), "users": users})
            return

        if path.startswith("/api/users/"):
            user_id = path.split("/")[-1]
            if user_id.isdigit():
                user = self.db.get_user_by_id(int(user_id))
                if user:
                    self._send_json(200, {"success": True, "user": user})
                else:
                    self._send_json(404, {"success": False, "message": "User tidak ditemukan."})
                return

        self._send_json(404, {"success": False, "message": "Endpoint tidak ditemukan."})

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        content_len = int(self.headers.get("Content-Length", 0))

        # Endpoint: POST /api/upload-avatar (Upload file foto profil)
        if path in ["/api/upload-avatar", "/api/upload"]:
            if content_len <= 0:
                self._send_json(400, {"success": False, "message": "Tidak ada data file yang dikirim."})
                return

            if content_len > MAX_FILE_SIZE:
                self._send_json(400, {"success": False, "message": f"Ukuran file melebihi batas maksimum {MAX_FILE_SIZE // (1024 * 1024)} MB."})
                return

            content_type = self.headers.get("Content-Type", "")
            file_bytes = None
            original_filename = "avatar.png"

            # 1. Parse multipart/form-data
            if "multipart/form-data" in content_type:
                boundary = None
                for part in content_type.split(";"):
                    part = part.strip()
                    if part.startswith("boundary="):
                        boundary = part.split("=", 1)[1].strip('"\'').encode("latin-1")
                        break
                if boundary:
                    raw_body = self.rfile.read(content_len)
                    parts = raw_body.split(b"--" + boundary)
                    for p in parts:
                        p = p.strip()
                        if not p or p == b"--":
                            continue
                        if b"\r\n\r\n" in p:
                            header_part, data_part = p.split(b"\r\n\r\n", 1)
                            if data_part.endswith(b"\r\n"):
                                data_part = data_part[:-2]
                            header_text = header_part.decode("utf-8", errors="ignore")
                            for line in header_text.splitlines():
                                if "filename=" in line:
                                    original_filename = line.split("filename=")[1].split(";")[0].strip('"\' ')
                                    file_bytes = data_part
                                    break
                            if file_bytes is not None:
                                break

            # 2. Fallback parse JSON Base64 payload jika dikirim sebagai JSON
            elif "application/json" in content_type:
                post_body = self.rfile.read(content_len).decode("utf-8", errors="ignore")
                try:
                    body = json.loads(post_body)
                    raw_b64 = body.get("data") or body.get("image") or body.get("avatar", "")
                    original_filename = body.get("filename", "avatar.png")
                    if "," in raw_b64:
                        raw_b64 = raw_b64.split(",", 1)[1]
                    file_bytes = base64.b64decode(raw_b64)
                except Exception as e:
                    self._send_json(400, {"success": False, "message": f"Format JSON/Base64 tidak valid: {str(e)}"})
                    return

            # 3. Fallback direct binary stream
            else:
                original_filename = self.headers.get("X-Filename", "avatar.png")
                file_bytes = self.rfile.read(content_len)

            if not file_bytes:
                self._send_json(400, {"success": False, "message": "Gagal membaca isi file gambar."})
                return

            if len(file_bytes) > MAX_FILE_SIZE:
                self._send_json(400, {"success": False, "message": f"Ukuran file melebihi batas maksimum 5 MB."})
                return

            # Validasi ekstensi
            _, ext = os.path.splitext(original_filename)
            ext = ext.lower()
            if not ext or ext not in ALLOWED_EXTENSIONS:
                self._send_json(400, {
                    "success": False, 
                    "message": f"Ekstensi file '{ext}' tidak diizinkan. Gunakan format: {', '.join(sorted(ALLOWED_EXTENSIONS))}."
                })
                return

            # Simpan file dengan nama unik dan aman
            unique_filename = f"avatar_{int(time.time())}_{secrets.token_hex(4)}{ext}"
            file_path = os.path.join(UPLOADS_DIR, unique_filename)

            try:
                with open(file_path, "wb") as f:
                    f.write(file_bytes)
                
                self._send_json(201, {
                    "success": True,
                    "filename": unique_filename,
                    "url": f"/uploads/avatars/{unique_filename}",
                    "message": "Foto avatar berhasil diunggah."
                })
                return
            except Exception as e:
                self._send_json(500, {"success": False, "message": f"Gagal menyimpan file di server: {str(e)}"})
                return

        post_body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
        try:
            body = json.loads(post_body)
        except Exception:
            body = {}

        if path == "/api/login":
            email = body.get("email", "")
            password = body.get("password", "")
            res = self.db.authenticate_user(email, password)
            self._send_json(200 if res["success"] else 401, res)
            return

        if path == "/api/users":
            name = body.get("name", "")
            email = body.get("email", "")
            password = body.get("password", "")
            role = body.get("role", "user")
            avatar = body.get("avatar", "")
            xp = body.get("xp", 0)
            progress = body.get("progress", {})
            achievements = body.get("achievements", [])
            res = self.db.create_user(name, email, password, role, avatar, xp, progress, achievements)
            self._send_json(201 if res["success"] else 400, res)
            return

        self._send_json(404, {"success": False, "message": "Endpoint tidak ditemukan."})

    def do_PUT(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path.startswith("/api/users/"):
            user_id_str = path.split("/")[-1]
            if user_id_str.isdigit():
                content_len = int(self.headers.get("Content-Length", 0))
                post_body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
                try:
                    body = json.loads(post_body)
                except Exception:
                    body = {}

                res = self.db.update_user(
                    user_id=int(user_id_str),
                    name=body.get("name"),
                    password=body.get("password"),
                    role=body.get("role"),
                    avatar=body.get("avatar"),
                    xp=body.get("xp"),
                    progress=body.get("progress"),
                    achievements=body.get("achievements")
                )
                self._send_json(200 if res["success"] else 400, res)
                return

        self._send_json(404, {"success": False, "message": "Endpoint tidak ditemukan."})

    def do_DELETE(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path.startswith("/api/users/"):
            user_id_str = path.split("/")[-1]
            if user_id_str.isdigit():
                res = self.db.delete_user(int(user_id_str))
                self._send_json(200 if res["success"] else 404, res)
                return

        self._send_json(404, {"success": False, "message": "Endpoint tidak ditemukan."})


def run_server(port=8000):
    """Menjalankan HTTP API Server lokal."""
    server_address = ("", port)
    httpd = HTTPServer(server_address, CodeKidsAPIHandler)
    print_separator("CODEKIDS DATABASE API SERVER")
    print(f"🚀 Server REST API aktif di: http://localhost:{port}")
    print(f"📁 Database SQLite       : {DB_FILE}")
    print(f"📌 Tekan Ctrl+C untuk menghentikan server.\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server dihentikan.")
        httpd.server_close()


# =============================================================================
# MAIN ENTRYPOINT
# =============================================================================
def main():
    db = CodeKidsDB()

    if len(sys.argv) > 1 and sys.argv[1] in ["--server", "--serve", "-s"]:
        port = int(sys.argv[2]) if len(sys.argv) > 2 and sys.argv[2].isdigit() else 8000
        run_server(port)
        return

    while True:
        print_separator("CODEKIDS ACADEMY - ADMIN DATABASE CONSOLE")
        print(" [1] 📋 Lihat Semua Pengguna (Read All)")
        print(" [2] ➕ Tambah Pengguna Baru (Create)")
        print(" [3] 🔍 Cari Pengguna (Read by ID/Email)")
        print(" [4] ✏️  Edit/Update Data Pengguna (Update)")
        print(" [5] ❌ Hapus Pengguna (Delete)")
        print(" [6] 🚀 Jalankan Local API Server")
        print(" [0] 🚪 Keluar")
        print("=" * 65)

        choice = input("Pilih menu [0-6]: ").strip()

        if choice == "1":
            cli_list_users(db)
        elif choice == "2":
            cli_create_user(db)
        elif choice == "3":
            cli_search_user(db)
        elif choice == "4":
            cli_update_user(db)
        elif choice == "5":
            cli_delete_user(db)
        elif choice == "6":
            port_input = input("Masukkan Port Server [default: 8000]: ").strip()
            port = int(port_input) if port_input.isdigit() else 8000
            run_server(port)
        elif choice == "0":
            print("\nSampai jumpa! Terima kasih.")
            break
        else:
            print("❌ Pilihan tidak valid. Silakan pilih 0-6.")


if __name__ == "__main__":
    main()
