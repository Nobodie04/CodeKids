let lessons = {
  html: { name: 'HTML', modules: [{ title: 'Struktur halaman', concept: 'Kenalan dengan HTML', summary: 'Bangun kerangka halaman dengan tag HTML.', code: '<h1>Halo, CodeKids!</h1>\n<p>Aku sedang belajar coding.</p>', explanation: ['<h1> membuat judul terbesar.', '<p> membuat paragraf.', 'Teks di antara tag menjadi isi halaman.'], task: 'Ketik ulang contoh HTML di atas.', question: 'Tag mana yang membuat judul besar?', answers: ['<h1>', '<color>', '<loop>', '<style>'], correct: 0, checks: ['<h1', '</h1', '<p', '</p'], challenge: 'Pilih bagian yang dibutuhkan kartu profil HTML.', choices: ['Nama', 'Foto', 'Warna CSS'], challengeCorrect: [0, 1] }] },
  css: { name: 'CSS', modules: [{ title: 'Tampilan halaman', concept: 'Mengenal CSS', summary: 'Atur warna, jarak, dan tampilan elemen.', code: '.kartu {\n  color: blue;\n  padding: 20px;\n}', explanation: ['.kartu memilih elemen dengan class kartu.', 'color mengubah warna teks.', 'padding memberi ruang di dalam elemen.'], task: 'Ketik ulang contoh CSS di atas.', question: 'Properti apa yang mengubah warna teks?', answers: ['color', 'padding', 'margin', 'display'], correct: 0, checks: ['.kartu', 'color:', 'padding:'], challenge: 'Pilih aturan yang membuat kartu nyaman dibaca.', choices: ['padding: 20px', 'color: blue', 'random: wow'], challengeCorrect: [0, 1] }] },
  javascript: { name: 'JavaScript', modules: [{ title: 'Interaksi halaman', concept: 'Membuat tombol bereaksi', summary: 'Gunakan event untuk menjalankan aksi.', code: 'const tombol = document.querySelector("button");\ntombol.addEventListener("click", function () {\n  alert("Halo!");\n});', explanation: ['const menyimpan tombol ke variabel.', 'querySelector mencari elemen button.', 'click menjalankan fungsi saat tombol ditekan.'], task: 'Ketik ulang contoh JavaScript di atas.', question: 'Event apa yang dipakai saat tombol diklik?', answers: ['hover', 'click', 'loop', 'submit'], correct: 1, checks: ['const tombol', 'querySelector', 'addEventListener', 'click'], challenge: 'Pilih bahan tombol interaktif.', choices: ['button HTML', 'event click', 'fungsi JavaScript', 'tag rahasia'], challengeCorrect: [0, 1, 2] }] },
  python: { name: 'Python', modules: [{ title: 'Output dan variabel', concept: 'Mulai berpikir dengan Python', summary: 'Simpan informasi dan tampilkan hasilnya.', code: 'nama = "Bima"\nprint(nama)', explanation: ['nama adalah variabel.', 'Tanda kutip menyimpan teks.', 'print menampilkan data ke layar.'], task: 'Ketik ulang contoh Python di atas.', question: 'Perintah apa yang menampilkan data?', answers: ['print', 'show', 'display', 'output'], correct: 0, checks: ['nama=', 'print(nama)'], challenge: 'Pilih bagian program sapaan.', choices: ['variabel nama', 'print()', 'loop wajib'], challengeCorrect: [0, 1] }] },
  cpp: { name: 'C++', modules: [{ title: 'Fondasi program', concept: 'Kenali C++', summary: 'Pahami main, output, dan library dasar.', code: '#include <iostream>\nint main() {\n  std::cout << "Halo!";\n  return 0;\n}', explanation: ['include mengambil library.', 'main adalah awal program.', 'cout menampilkan teks.'], task: 'Ketik ulang contoh C++ di atas.', question: 'Fungsi mana yang menjadi awal program?', answers: ['main()', 'start()', 'run()', 'begin()'], correct: 0, checks: ['#include', 'int main', 'std::cout', 'return 0'], challenge: 'Pilih fondasi program C++.', choices: ['main()', 'std::cout', 'warna CSS'], challengeCorrect: [0, 1] }] },
  scratch: { name: 'Scratch', modules: [{ title: 'Event dan sprite', concept: 'Hidupkan sprite', summary: 'Susun blok untuk memulai dan menggerakkan sprite.', code: 'ketika bendera hijau diklik\nbergerak 10 langkah\nkatakan "Halo!" selama 2 detik', explanation: ['Bendera hijau memulai script.', 'Bergerak mengubah posisi sprite.', 'Katakan menampilkan pesan.'], task: 'Pelajari urutan blok pada contoh Scratch.', question: 'Blok apa yang memulai project?', answers: ['Bendera hijau diklik', 'Ulangi selamanya', 'Ganti kostum', 'Saat sprite diklik'], correct: 0, checks: [], challenge: 'Pilih urutan blok sprite menyapa.', choices: ['Event bendera hijau', 'Bergerak', 'Ucapkan pesan', 'Hapus sprite'], challengeCorrect: [0, 1, 2] }] }
};

const makeModule = (title, concept, code, explanation, question, correctAnswer, checks, challenge) => ({
  title,
  concept,
  summary: `Pelajari ${title.toLowerCase()} lewat contoh kecil yang bisa langsung dicoba.`,
  code,
  explanation,
  task: `Ketik ulang contoh ${concept} di atas.`,
  question,
  answers: [correctAnswer, 'Pilihan yang tidak sesuai', 'Konsep untuk materi lain', 'Bukan bagian dari kode ini'],
  correct: 0,
  checks,
  challenge: `Latihan: ${challenge}`,
  choices: ['Gunakan konsep materi ini', 'Baca contoh kodenya', 'Abaikan strukturnya', 'Tambahkan ide yang relevan'],
  challengeCorrect: [0, 1, 3]
});

const htmlTopics = [
  ['Apa itu HTML?', 'Dasar HTML', '<p>Halaman web dibuat dari elemen HTML.</p>', ['HTML menyusun isi halaman.', 'Elemen terdiri dari tag dan isi.', 'Browser membaca tag HTML.'], 'Apa fungsi utama HTML?', 'Menyusun struktur halaman', ['<p', '</p'], 'Pilih cara yang benar untuk mulai membuat halaman.'],
  ['Struktur dokumen HTML', 'Struktur dokumen', '<!DOCTYPE html>\n<html>\n</html>', ['Dokumen memiliki struktur utama.', 'html membungkus seluruh halaman.', 'Indentasi membantu membaca kode.'], 'Tag apa yang membungkus dokumen?', '<html>', ['<!doctype', '<html', '</html'], 'Pilih bagian struktur dokumen.'],
  ['DOCTYPE html', 'Deklarasi dokumen', '<!DOCTYPE html>', ['Deklarasi memberi tahu jenis dokumen.', 'Letaknya berada di baris paling atas.', 'Ini bukan elemen yang terlihat.'], 'Apa fungsi DOCTYPE?', 'Memberi tahu browser jenis dokumen', ['<!doctype'], 'Pilih deklarasi yang benar.'],
  ['html, head, body', 'Bagian dokumen', '<html>\n  <head><title>Profil</title></head>\n  <body>Halo!</body>\n</html>', ['head menyimpan informasi halaman.', 'body berisi isi yang terlihat.', 'title memberi judul tab browser.'], 'Di mana isi yang terlihat diletakkan?', '<body>', ['<html', '<head', '<body'], 'Pilih bagian yang terlihat oleh pengunjung.'],
  ['Heading', 'Judul halaman', '<h1>Judul Utama</h1>\n<h2>Subjudul</h2>', ['h1 adalah judul paling utama.', 'h2 adalah subjudul.', 'Heading membantu hierarki informasi.'], 'Tag untuk judul terbesar?', '<h1>', ['<h1', '</h1'], 'Pilih heading yang tepat.'],
  ['Paragraph', 'Paragraf', '<p>Ini adalah paragraf.</p>', ['p membuat paragraf.', 'Teks berada di antara tag.', 'Paragraf membuat tulisan teratur.'], 'Tag untuk paragraf?', '<p>', ['<p', '</p'], 'Pilih elemen teks yang tepat.'],
  ['Text formatting', 'Format teks', '<strong>Penting</strong>\n<em>Miring</em>', ['strong menekankan teks.', 'em memberi penekanan miring.', 'Format tetap berada dalam HTML.'], 'Tag untuk teks penting?', '<strong>', ['<strong', '</strong'], 'Pilih format teks yang sesuai.'],
  ['Link', 'Tautan', '<a href="profil.html">Buka profil</a>', ['a membuat tautan.', 'href menyimpan tujuan.', 'Teks link bisa diklik.'], 'Atribut tujuan link?', 'href', ['<a', 'href'], 'Pilih komponen tautan.'],
  ['Image', 'Gambar', '<img src="foto.jpg" alt="Foto profil">', ['img menampilkan gambar.', 'src adalah lokasi gambar.', 'alt membantu aksesibilitas.'], 'Atribut lokasi gambar?', 'src', ['<img', 'src', 'alt'], 'Pilih atribut gambar yang penting.'],
  ['List', 'Daftar', '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>', ['ul membuat daftar tidak berurutan.', 'li adalah item daftar.', 'Setiap item berada di dalam list.'], 'Tag item daftar?', '<li>', ['<ul', '<li'], 'Pilih struktur daftar.'],
  ['Table dasar', 'Tabel', '<table>\n  <tr><td>Nama</td></tr>\n</table>', ['table membungkus tabel.', 'tr membuat baris.', 'td membuat sel data.'], 'Tag untuk baris tabel?', '<tr>', ['<table', '<tr', '<td'], 'Pilih struktur tabel.'],
  ['Comment', 'Komentar', '<!-- Catatan untuk pembuat kode -->', ['Komentar tidak tampil di halaman.', 'Komentar membantu menjelaskan kode.', 'Komentar dibungkus tanda khusus.'], 'Apakah komentar terlihat pengunjung?', 'Tidak', ['<!--', '-->'], 'Pilih catatan yang aman untuk kode.'],
  ['Attribute', 'Atribut', '<p class="intro">Halo!</p>', ['Atribut memberi informasi tambahan.', 'Atribut ditulis di tag pembuka.', 'Nilai atribut berada dalam kutip.'], 'Di mana atribut ditulis?', 'Tag pembuka', ['class=', 'intro'], 'Pilih atribut yang tepat.'],
  ['id dan class', 'Penanda elemen', '<p id="utama" class="teks-biru">Halo</p>', ['id sebaiknya unik.', 'class boleh dipakai berulang.', 'Keduanya membantu memilih elemen.'], 'Mana yang sebaiknya unik?', 'id', ['id=', 'class='], 'Pilih penanda elemen yang sesuai.']
];

const cssTopics = [
  ['Apa itu CSS?', 'Dasar CSS', 'p {\n  color: blue;\n}', ['CSS mengatur tampilan.', 'Selector memilih elemen.', 'Properti dan nilai memberi gaya.'], 'Apa fungsi CSS?', 'Mengatur tampilan halaman', ['color:', 'p'], 'Pilih aturan CSS dasar.'],
  ['Inline, internal, external CSS', 'Cara memakai CSS', '<link rel="stylesheet" href="style.css">', ['Inline berada di atribut style.', 'Internal berada di tag style.', 'External memakai file CSS.'], 'Cara external CSS?', '<link>', ['<link', 'stylesheet'], 'Pilih cara menghubungkan CSS.'],
  ['Selector', 'Selector', 'h1 { color: purple; }', ['Selector menentukan target.', 'Aturan berada di dalam kurung kurawal.', 'Properti memberi perubahan.'], 'Bagian mana yang memilih elemen?', 'h1', ['h1', 'color:'], 'Pilih selector.'],
  ['Element selector', 'Element selector', 'p { color: blue; }', ['Nama elemen menjadi selector.', 'Semua p dapat terkena aturan.', 'Deklarasi berada di dalam kurung.'], 'Selector ini memilih apa?', 'Semua elemen p', ['p {', 'color:'], 'Pilih element selector.'],
  ['Class selector', 'Class selector', '.card { padding: 20px; }', ['Titik menandai class.', 'Class dapat dipakai berulang.', 'Nama class harus cocok.'], 'Simbol class selector?', '.', ['.card', 'padding:'], 'Pilih selector class.'],
  ['ID selector', 'ID selector', '#header { background: white; }', ['Pagar menandai id.', 'ID biasanya unik.', 'Selector diarahkan ke id.'], 'Simbol ID selector?', '#', ['#header', 'background:'], 'Pilih selector id.'],
  ['Color', 'Warna', 'body { color: #17243d; }', ['color mengatur warna teks.', 'Nilai bisa berupa nama warna.', 'Hex juga dapat digunakan.'], 'Properti warna teks?', 'color', ['color:', '#17243d'], 'Pilih properti warna.'],
  ['Background', 'Latar', 'body { background: #fffaf2; }', ['background mengatur latar.', 'Nilai bisa berupa warna.', 'Latar membantu suasana halaman.'], 'Properti latar?', 'background', ['background:', '#fffaf2'], 'Pilih properti latar.'],
  ['Font', 'Font', 'body { font-family: sans-serif; }', ['font-family memilih jenis font.', 'Font memengaruhi karakter halaman.', 'Fallback membantu kompatibilitas.'], 'Properti jenis font?', 'font-family', ['font-family:', 'sans-serif'], 'Pilih aturan font.'],
  ['Text', 'Teks', 'h1 { text-align: center; }', ['text-align mengatur perataan.', 'center menaruh teks di tengah.', 'Properti text mengubah tampilan.'], 'Nilai untuk teks di tengah?', 'center', ['text-align:', 'center'], 'Pilih aturan teks.'],
  ['Border', 'Border', '.card { border: 1px solid #ddd; }', ['border memberi garis.', 'Ketebalan ditulis lebih dulu.', 'Warna menentukan garis.'], 'Properti garis elemen?', 'border', ['border:', 'solid'], 'Pilih border.'],
  ['Margin', 'Margin', '.card { margin: 20px; }', ['margin memberi jarak luar.', 'Jarak memisahkan elemen.', 'Nilai memakai satuan.'], 'Jarak luar disebut?', 'margin', ['margin:', '20px'], 'Pilih jarak luar.'],
  ['Padding', 'Padding', '.card { padding: 20px; }', ['padding memberi jarak dalam.', 'Isi tidak menempel border.', 'Nilai dapat memakai px.'], 'Jarak dalam disebut?', 'padding', ['padding:', '20px'], 'Pilih jarak dalam.'],
  ['Width & height', 'Ukuran', '.box { width: 200px; height: 100px; }', ['width mengatur lebar.', 'height mengatur tinggi.', 'Ukuran membantu layout.'], 'Properti tinggi?', 'height', ['width:', 'height:'], 'Pilih ukuran elemen.'],
  ['Box model', 'Box model', '.box { margin: 10px; border: 1px solid; padding: 20px; }', ['Box model punya content.', 'Padding berada dalam border.', 'Margin berada di luar border.'], 'Apa yang berada di luar border?', 'margin', ['margin:', 'border:', 'padding:'], 'Pilih bagian box model.'],
  ['display', 'Display', '.menu { display: flex; }', ['display menentukan cara elemen tampil.', 'flex membantu layout.', 'Nilai display memengaruhi posisi.'], 'Nilai display untuk flex layout?', 'flex', ['display:', 'flex'], 'Pilih display yang sesuai.'],
  ['Basic positioning', 'Positioning', '.badge { position: absolute; top: 10px; }', ['position mengatur penempatan.', 'absolute bisa ditempatkan relatif.', 'top memberi jarak dari atas.'], 'Properti penempatan?', 'position', ['position:', 'top:'], 'Pilih positioning.']
];

const javascriptTopics = [
  ['Apa itu JavaScript?', 'Dasar JavaScript', 'console.log("Halo!");', ['JavaScript memberi interaksi.', 'Kode dapat merespons aksi.', 'Browser dapat menjalankannya.'], 'Fungsi JavaScript?', 'Membuat halaman interaktif', ['console.log'], 'Pilih contoh JavaScript.'],
  ['Menjalankan JavaScript', 'Menjalankan JS', '<script>\n  console.log("Mulai");\n</script>', ['script menjalankan JavaScript.', 'Kode dapat ditulis di HTML.', 'Browser membaca isi script.'], 'Tag untuk menjalankan JS?', '<script>', ['<script', 'console.log'], 'Pilih tempat menjalankan JS.'],
  ['console.log()', 'Console', 'console.log("Halo, CodeKids!");', ['console.log menampilkan nilai.', 'Console membantu mengecek kode.', 'Teks berada di dalam kurung.'], 'Perintah output console?', 'console.log()', ['console.log', 'Halo'], 'Pilih perintah console.'],
  ['Variable', 'Variabel', 'let nama = "Bima";', ['Variabel menyimpan nilai.', 'Nama variabel menjelaskan isi.', 'Nilai dapat dipakai lagi.'], 'Apa fungsi variabel?', 'Menyimpan nilai', ['let', 'nama', '='], 'Pilih deklarasi variabel.'],
  ['let', 'Let', 'let skor = 0;\nskor = 10;', ['let dapat diubah.', 'Nilai awal bisa diberikan.', 'Assignment mengganti nilai.'], 'Bolehkah nilai let diubah?', 'Boleh', ['let skor', 'skor ='], 'Pilih penggunaan let.'],
  ['const', 'Const', 'const namaApp = "CodeKids";', ['const membuat nilai tetap.', 'Const harus diberi nilai.', 'Nama tetap mudah dibaca.'], 'Kapan memakai const?', 'Saat nilai tidak berubah', ['const', 'namaApp'], 'Pilih penggunaan const.'],
  ['Data types', 'Tipe data', 'const aktif = true;\nconst umur = 12;', ['Tipe menjelaskan jenis nilai.', 'Boolean berisi true atau false.', 'Number berisi angka.'], 'Apa itu tipe data?', 'Jenis nilai', ['true', '12'], 'Pilih tipe data.'],
  ['String', 'String', 'const sapaan = "Halo";', ['String adalah teks.', 'String dibungkus kutip.', 'Teks dapat digabungkan.'], 'String berisi apa?', 'Teks', ['const', '"Halo"'], 'Pilih string.'],
  ['Number', 'Number', 'const umur = 12;', ['Number menyimpan angka.', 'Angka tidak memakai kutip.', 'Angka dapat dihitung.'], 'Number menyimpan?', 'Angka', ['umur', '12'], 'Pilih number.'],
  ['Boolean', 'Boolean', 'const sudahLogin = false;', ['Boolean punya dua nilai.', 'Nilainya true atau false.', 'Boolean cocok untuk kondisi.'], 'Nilai boolean?', 'true atau false', ['false', 'sudahLogin'], 'Pilih boolean.'],
  ['Array', 'Array', 'const warna = ["merah", "biru"];', ['Array menyimpan banyak nilai.', 'Nilai dipisah koma.', 'Array memakai kurung siku.'], 'Array menyimpan?', 'Kumpulan nilai', ['[', 'merah'], 'Pilih array.'],
  ['Object', 'Object', 'const siswa = { nama: "Bima" };', ['Object menyimpan pasangan data.', 'Key menjelaskan nilai.', 'Object memakai kurung kurawal.'], 'Object menyimpan data sebagai?', 'Key dan value', ['{', 'nama:'], 'Pilih object.'],
  ['Operator', 'Operator', 'const total = 4 + 3;', ['Operator melakukan operasi.', 'Tanda plus melakukan penjumlahan.', 'Hasil disimpan ke variabel.'], 'Operator penjumlahan?', '+', ['4 + 3', 'total'], 'Pilih operator.'],
  ['Comparison', 'Perbandingan', 'const sama = 5 === 5;', ['Comparison membandingkan nilai.', '=== membandingkan dengan ketat.', 'Hasilnya boolean.'], 'Hasil comparison?', 'Boolean', ['===', 'sama'], 'Pilih comparison.'],
  ['if', 'Kondisi if', 'if (skor > 0) {\n  console.log("Mulai");\n}', ['if mengecek kondisi.', 'Blok berjalan jika benar.', 'Kondisi berada di kurung.'], 'Kapan blok if berjalan?', 'Saat kondisi benar', ['if (', 'console.log'], 'Pilih kondisi if.'],
  ['else', 'Kondisi else', 'if (aktif) {\n  tampilkan();\n} else {\n  login();\n}', ['else menjadi pilihan lain.', 'else berjalan jika if salah.', 'Keduanya membentuk alur.'], 'Kapan else berjalan?', 'Saat kondisi if salah', ['else', 'login'], 'Pilih alur else.'],
  ['switch', 'Switch', 'switch (menu) {\n  case "home": break;\n}', ['switch memilih banyak kasus.', 'case berisi pilihan.', 'break menghentikan kasus.'], 'Bagian pilihan switch?', 'case', ['switch', 'case'], 'Pilih struktur switch.'],
  ['for', 'Loop for', 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}', ['for mengulang kode.', 'i adalah penghitung.', 'Kondisi menentukan jumlah ulang.'], 'Untuk apa for?', 'Mengulang kode', ['for', 'console.log'], 'Pilih loop for.'],
  ['while', 'Loop while', 'let i = 0;\nwhile (i < 3) { i++; }', ['while berjalan selama kondisi benar.', 'Counter mencegah loop terus-menerus.', 'Kondisi dicek setiap putaran.'], 'Kapan while berhenti?', 'Saat kondisi salah', ['while', 'i++'], 'Pilih loop while.'],
  ['Function', 'Function', 'function sapa() {\n  return "Halo";\n}', ['Function membungkus tugas.', 'Nama function menjelaskan tugas.', 'Function dapat dipanggil.'], 'Fungsi function?', 'Membungkus tugas', ['function', 'sapa'], 'Pilih function.'],
  ['Parameter', 'Parameter', 'function sapa(nama) {\n  return "Halo " + nama;\n}', ['Parameter menerima data.', 'Nilai dikirim saat dipanggil.', 'Parameter membuat function fleksibel.'], 'Parameter adalah?', 'Data masukan function', ['function sapa', 'nama'], 'Pilih parameter.'],
  ['Return', 'Return', 'function tambah(a, b) {\n  return a + b;\n}', ['return mengirim hasil.', 'Hasil dapat disimpan.', 'Function selesai setelah return.'], 'Fungsi return?', 'Mengirim hasil', ['return', 'a + b'], 'Pilih return.'],
  ['Basic error', 'Error dasar', 'try {\n  jalankan();\n} catch (error) {\n  console.log(error);\n}', ['Error menunjukkan masalah.', 'Pesan error membantu perbaikan.', 'Kode perlu dibaca perlahan.'], 'Apa yang membantu mencari error?', 'Pesan error', ['catch', 'error'], 'Pilih cara menangani error.'],
  ['getElementById', 'DOM dasar', 'const judul = document.getElementById("judul");', ['DOM mewakili halaman.', 'getElementById mencari id.', 'Hasilnya adalah elemen.'], 'Pencarian getElementById memakai?', 'id', ['getElementById', 'judul'], 'Pilih cara mencari elemen.'],
  ['querySelector', 'Selector DOM', 'const kartu = document.querySelector(".kartu");', ['querySelector memakai selector CSS.', 'Titik memilih class.', 'Hasilnya adalah elemen pertama.'], 'querySelector memakai?', 'Selector CSS', ['querySelector', '.kartu'], 'Pilih selector DOM.'],
  ['Mengubah text', 'Text DOM', 'judul.textContent = "Halo!";', ['textContent mengubah teks.', 'Elemen disimpan di variabel.', 'Nilai baru diberikan dengan assignment.'], 'Properti untuk mengubah teks?', 'textContent', ['textContent', 'Halo'], 'Pilih perubahan teks.'],
  ['Mengubah style', 'Style DOM', 'judul.style.color = "blue";', ['style mengubah tampilan.', 'Properti CSS diakses lewat titik.', 'Nilai baru diberikan sebagai teks.'], 'Cara mengubah warna lewat DOM?', 'style.color', ['style.color', 'blue'], 'Pilih perubahan style.'],
  ['Event', 'Event DOM', 'tombol.addEventListener("click", aksi);', ['Event adalah kejadian.', 'Listener menunggu kejadian.', 'Function dijalankan saat event.'], 'Event click berarti?', 'Tombol ditekan', ['addEventListener', 'click'], 'Pilih event.'],
  ['Button interaction', 'Interaksi tombol', 'tombol.addEventListener("click", () => {\n  judul.textContent = "Berhasil!";\n});', ['Button dapat menjalankan aksi.', 'click memicu function.', 'DOM dapat diubah setelah klik.'], 'Apa yang terjadi setelah klik?', 'Aksi dijalankan', ['button', 'click', 'textContent'], 'Pilih alur button.']
];

const projectModule = (title, concept, code, explanation, question, answer, checks) => makeModule(title, concept, code, explanation, question, answer, checks, `Bangun ${title.toLowerCase()} dengan konsep sebelumnya.`);
lessons.html.modules = htmlTopics.map(([title, concept, code, explanation, question, answer, checks, challenge]) => makeModule(title, concept, code, explanation, question, answer, checks, challenge)).concat([
  projectModule('Mini Project: Halaman profil', 'Halaman profil', '<h1>Nama Saya</h1>\n<p>Saya suka coding.</p>', ['Judul mengenalkan profil.', 'Paragraf berisi informasi.', 'Struktur sederhana mudah dikembangkan.'], 'Elemen untuk nama profil?', '<h1>', ['<h1', '<p']),
  projectModule('Mini Project: Halaman biodata', 'Halaman biodata', '<h1>Biodata</h1>\n<ul><li>Nama: Bima</li></ul>', ['Heading memberi judul.', 'List menampilkan data.', 'li menyimpan satu biodata.'], 'Elemen untuk daftar biodata?', '<li>', ['<h1', '<ul', '<li']),
  projectModule('Mini Project: Artikel sederhana', 'Artikel sederhana', '<h1>Judul Artikel</h1>\n<p>Isi artikel dimulai di sini.</p>', ['Judul memakai heading.', 'Isi memakai paragraf.', 'Keduanya membentuk artikel.'], 'Elemen isi artikel?', '<p>', ['<h1', '<p'])
]);
lessons.css.modules = cssTopics.map(([title, concept, code, explanation, question, answer, checks, challenge]) => makeModule(title, concept, code, explanation, question, answer, checks, challenge)).concat([
  projectModule('Project: Styling halaman profil', 'Styling halaman profil', '.profil {\n  color: #17243d;\n  padding: 24px;\n  border: 1px solid #ddd;\n}', ['Class memilih kartu profil.', 'color mengatur teks.', 'padding dan border memberi bentuk.'], 'Properti untuk jarak dalam?', 'padding', ['.profil', 'color:', 'padding:', 'border:'])
]);
lessons.javascript.modules = javascriptTopics.map(([title, concept, code, explanation, question, answer, checks, challenge]) => makeModule(title, concept, code, explanation, question, answer, checks, challenge)).concat([
  projectModule('Project: Calculator', 'Calculator', 'const hasil = 4 + 3;\nconsole.log(hasil);', ['Operator menghitung angka.', 'Variabel menyimpan hasil.', 'console menampilkan hasil.'], 'Apa fungsi calculator?', 'Menghitung angka', ['const', '4 + 3', 'console.log']),
  projectModule('Project: Counter', 'Counter', 'let angka = 0;\nangka = angka + 1;', ['let menyimpan angka.', 'Assignment menambah nilai.', 'Counter berubah setiap aksi.'], 'Variabel counter memakai?', 'let', ['let', 'angka']),
  projectModule('Project: To-do list sederhana', 'To-do list', 'const tugas = ["Belajar", "Membaca"];\nconsole.log(tugas);', ['Array menyimpan banyak tugas.', 'Setiap tugas berupa string.', 'Console membantu mengecek data.'], 'Struktur untuk banyak tugas?', 'Array', ['const', '[', 'tugas'])
]);

const pythonTopics = [
  ['Apa itu Python?', 'Dasar Python', 'print("Halo, Python!")', ['Python mudah dibaca.', 'print menampilkan pesan.', 'File Python biasanya berekstensi py.'], 'Python digunakan untuk?', 'Membuat program', ['print', 'Python'], 'Pilih ciri Python.'],
  ['Syntax Python', 'Syntax', 'nama = "Bima"\nprint(nama)', ['Syntax adalah aturan penulisan.', 'Python memakai indentasi.', 'Kode yang rapi mudah dibaca.'], 'Apa itu syntax?', 'Aturan penulisan kode', ['nama=', 'print'], 'Pilih syntax yang benar.'],
  ['Variable', 'Variabel', 'nama = "Bima"', ['Variabel menyimpan data.', 'Nama menjelaskan isi.', 'Nilainya dapat dipakai lagi.'], 'Fungsi variabel?', 'Menyimpan data', ['nama', '='], 'Pilih variabel.'],
  ['Data types', 'Tipe data', 'nama = "Bima"\numur = 12\naktif = True', ['Tipe menunjukkan jenis data.', 'String adalah teks.', 'Number adalah angka.'], 'Apa fungsi tipe data?', 'Menjelaskan jenis nilai', ['nama', 'umur', 'aktif'], 'Pilih tipe data.'],
  ['String', 'String', 'pesan = "Halo!"', ['String berisi teks.', 'Teks memakai kutip.', 'String dapat digabungkan.'], 'String berisi?', 'Teks', ['pesan', 'Halo'], 'Pilih string.'],
  ['Number', 'Number', 'total = 10 + 5', ['Number berisi angka.', 'Angka dapat dihitung.', 'Hasil dapat disimpan.'], 'Number berisi?', 'Angka', ['total', '10 + 5'], 'Pilih number.'],
  ['Boolean', 'Boolean', 'sudah_login = True', ['Boolean punya dua nilai.', 'Nilainya True atau False.', 'Cocok untuk kondisi.'], 'Nilai boolean?', 'True atau False', ['sudah_login', 'True'], 'Pilih boolean.'],
  ['List', 'List', 'buah = ["apel", "mangga"]', ['List menyimpan banyak item.', 'Item berada dalam kurung siku.', 'Item dipisah koma.'], 'List menyimpan?', 'Banyak item', ['buah', '[', 'apel'], 'Pilih list.'],
  ['Tuple', 'Tuple', 'warna = ("merah", "biru")', ['Tuple mirip list.', 'Tuple memakai kurung biasa.', 'Isinya cocok untuk data tetap.'], 'Tanda tuple?', 'Kurung biasa', ['warna', '(', ')'], 'Pilih tuple.'],
  ['Dictionary', 'Dictionary', 'siswa = {"nama": "Bima"}', ['Dictionary memakai key dan value.', 'Data berada dalam kurung kurawal.', 'Key membantu mencari nilai.'], 'Dictionary berisi?', 'Key dan value', ['siswa', 'nama:', '{'], 'Pilih dictionary.'],
  ['Set', 'Set', 'angka = {1, 2, 3}', ['Set menyimpan nilai unik.', 'Set memakai kurung kurawal.', 'Urutan bukan fokus utama.'], 'Kelebihan set?', 'Nilai unik', ['angka', '{', '1'], 'Pilih set.'],
  ['Operator', 'Operator', 'total = 4 + 3', ['Operator melakukan operasi.', 'Plus menjumlahkan.', 'Hasil bisa disimpan.'], 'Operator penjumlahan?', '+', ['total', '+'], 'Pilih operator.'],
  ['if', 'Kondisi if', 'if umur >= 12:\n    print("Boleh belajar")', ['if mengecek kondisi.', 'Blok memakai indentasi.', 'Kode berjalan jika benar.'], 'Kapan if berjalan?', 'Saat kondisi benar', ['if', 'print'], 'Pilih kondisi if.'],
  ['elif', 'Kondisi elif', 'if nilai >= 80:\n    print("A")\nelif nilai >= 60:\n    print("B")', ['elif berarti kondisi lain.', 'Diperiksa setelah if.', 'Hanya kondisi yang sesuai berjalan.'], 'Kapan elif diperiksa?', 'Setelah if tidak terpenuhi', ['elif', 'nilai'], 'Pilih elif.'],
  ['else', 'Kondisi else', 'if aktif:\n    print("Ya")\nelse:\n    print("Tidak")', ['else menjadi pilihan terakhir.', 'Berjalan saat kondisi salah.', 'Membuat alur lengkap.'], 'Kapan else berjalan?', 'Saat kondisi salah', ['else', 'print'], 'Pilih else.'],
  ['for', 'Loop for', 'for buah in buah_list:\n    print(buah)', ['for mengulang item.', 'Variabel menerima item.', 'Loop berhenti setelah semua item.'], 'Untuk apa for?', 'Mengulang data', ['for', 'print'], 'Pilih loop for.'],
  ['while', 'Loop while', 'angka = 0\nwhile angka < 3:\n    angka += 1', ['while berjalan selama kondisi benar.', 'Counter mengubah kondisi.', 'Kondisi mencegah loop tanpa akhir.'], 'Kapan while berhenti?', 'Saat kondisi salah', ['while', 'angka'], 'Pilih while.'],
  ['Function', 'Function', 'def sapa():\n    print("Halo")', ['def membuat function.', 'Function membungkus tugas.', 'Function dapat dipanggil.'], 'Fungsi function?', 'Membungkus tugas', ['def', 'sapa'], 'Pilih function.'],
  ['Parameter', 'Parameter', 'def sapa(nama):\n    print(nama)', ['Parameter menerima data.', 'Nilai dikirim saat dipanggil.', 'Function menjadi fleksibel.'], 'Parameter adalah?', 'Data masukan', ['def', 'nama'], 'Pilih parameter.'],
  ['Return', 'Return', 'def tambah(a, b):\n    return a + b', ['return mengirim hasil.', 'Hasil dapat dipakai lagi.', 'Function selesai setelah return.'], 'Fungsi return?', 'Mengirim hasil', ['return', 'a + b'], 'Pilih return.'],
  ['Input', 'Input', 'nama = input("Nama: ")\nprint(nama)', ['input menerima ketikan.', 'Hasil input biasanya teks.', 'Nilainya disimpan di variabel.'], 'Fungsi input?', 'Menerima data pengguna', ['input', 'nama'], 'Pilih input.'],
  ['Basic error', 'Error dasar', 'try:\n    angka = int(input("Angka: "))\nexcept ValueError:\n    print("Masukkan angka")', ['Error menunjukkan masalah.', 'try mencoba kode.', 'except menangani error tertentu.'], 'Apa fungsi except?', 'Menangani error', ['try', 'except'], 'Pilih penanganan error.']
];
lessons.python.modules = pythonTopics.map(([title, concept, code, explanation, question, answer, checks, challenge]) => makeModule(title, concept, code, explanation, question, answer, checks, challenge)).concat([
  projectModule('Project: Calculator', 'Calculator', 'a = 4\nb = 3\nprint(a + b)', ['Dua angka disimpan.', 'Operator menjumlahkan.', 'print menampilkan hasil.'], 'Project calculator digunakan untuk?', 'Menghitung angka', ['a =', 'print', '+']),
  projectModule('Project: Program kasir', 'Program kasir', 'harga = 10000\njumlah = 2\nprint(harga * jumlah)', ['Harga dan jumlah adalah data.', 'Operator kali menghitung total.', 'Hasil menjadi total belanja.'], 'Cara menghitung total?', 'Harga dikali jumlah', ['harga', 'jumlah', '*']),
  projectModule('Project: Tebak angka', 'Tebak angka', 'jawaban = 7\ntebakan = 5\nif tebakan == jawaban:\n    print("Benar")', ['Jawaban disimpan.', 'Input dibandingkan.', 'if memberi feedback.'], 'Konsep utama tebak angka?', 'Perbandingan', ['jawaban', 'tebakan', 'if']),
  projectModule('Project: Konversi suhu', 'Konversi suhu', 'celsius = 30\nfahrenheit = celsius * 9 / 5 + 32\nprint(fahrenheit)', ['Celsius menjadi input.', 'Operator melakukan konversi.', 'Hasil ditampilkan.'], 'Project ini memakai?', 'Perhitungan matematika', ['celsius', 'fahrenheit', 'print'])
]);

const cppTopics = [
  ['Apa itu C++?', 'Dasar C++', '#include <iostream>\nint main() {\n  std::cout << "Halo";\n}', ['C++ adalah bahasa pemrograman.', 'Program dimulai dari main.', 'iostream membantu output.'], 'C++ digunakan untuk?', 'Membuat program', ['#include', 'main', 'cout'], 'Pilih ciri C++.'],
  ['Struktur program', 'Struktur program', '#include <iostream>\nint main() {\n  return 0;\n}', ['include mengambil library.', 'main menjadi pusat program.', 'Kurung kurawal membungkus blok.'], 'Pusat program C++?', 'main()', ['#include', 'int main', 'return'], 'Pilih struktur program.'],
  ['main()', 'Fungsi main', 'int main() {\n  return 0;\n}', ['main adalah titik mulai.', 'return 0 menandakan selesai.', 'Fungsi memakai kurung.'], 'Program dimulai dari?', 'main()', ['int main', 'return 0'], 'Pilih main.'],
  ['cout', 'Output cout', 'std::cout << "Halo";', ['cout menampilkan teks.', 'Operator << mengirim data.', 'std berada di namespace standar.'], 'Fungsi cout?', 'Menampilkan output', ['std::cout', '<<'], 'Pilih cout.'],
  ['cin', 'Input cin', 'int umur;\nstd::cin >> umur;', ['cin menerima input.', 'Operator >> mengambil data.', 'Data masuk ke variabel.'], 'Fungsi cin?', 'Menerima input', ['std::cin', '>>', 'umur'], 'Pilih cin.'],
  ['Variable', 'Variabel C++', 'int skor = 100;', ['Variabel menyimpan nilai.', 'int menunjukkan tipe.', 'Nilai dapat dipakai lagi.'], 'Variabel menyimpan?', 'Nilai', ['int', 'skor', '='], 'Pilih variabel.'],
  ['Data types', 'Tipe data', 'int umur = 12;\ndouble tinggi = 1.5;\nbool aktif = true;', ['int menyimpan bilangan bulat.', 'double menyimpan desimal.', 'bool menyimpan true atau false.'], 'Tipe untuk bilangan bulat?', 'int', ['int', 'double', 'bool'], 'Pilih tipe data.'],
  ['Operator', 'Operator C++', 'int total = 4 + 3;', ['Operator melakukan hitung.', 'Plus menjumlahkan.', 'Hasil masuk variabel.'], 'Operator tambah?', '+', ['total', '+'], 'Pilih operator.'],
  ['if', 'Kondisi if', 'if (nilai >= 75) {\n  std::cout << "Lulus";\n}', ['if mengecek kondisi.', 'Blok berjalan jika benar.', 'Kondisi berada di kurung.'], 'Kapan if berjalan?', 'Saat kondisi benar', ['if', 'cout'], 'Pilih if.'],
  ['else', 'Kondisi else', 'if (lulus) {\n  std::cout << "Ya";\n} else {\n  std::cout << "Tidak";\n}', ['else menjadi pilihan lain.', 'Berjalan saat if salah.', 'Membentuk alur keputusan.'], 'Kapan else berjalan?', 'Saat if salah', ['else', 'cout'], 'Pilih else.'],
  ['switch', 'Switch', 'switch (menu) {\n  case 1: break;\n}', ['switch memilih kasus.', 'case menjadi pilihan.', 'break menghentikan kasus.'], 'Bagian pilihan switch?', 'case', ['switch', 'case'], 'Pilih switch.'],
  ['for', 'Loop for', 'for (int i = 0; i < 3; i++) {\n  std::cout << i;\n}', ['for mengulang kode.', 'i menjadi penghitung.', 'Kondisi menentukan putaran.'], 'Untuk apa for?', 'Mengulang kode', ['for', 'i++'], 'Pilih for.'],
  ['while', 'Loop while', 'int i = 0;\nwhile (i < 3) { i++; }', ['while memakai kondisi.', 'Counter mencegah loop tanpa akhir.', 'Kondisi dicek setiap putaran.'], 'Kapan while berhenti?', 'Saat kondisi salah', ['while', 'i++'], 'Pilih while.'],
  ['Function', 'Function C++', 'int tambah(int a, int b) {\n  return a + b;\n}', ['Function membungkus tugas.', 'Parameter menerima input.', 'return mengirim hasil.'], 'Fungsi function?', 'Membungkus tugas', ['int tambah', 'return'], 'Pilih function.'],
  ['Array', 'Array', 'int nilai[3] = {80, 90, 75};', ['Array menyimpan banyak nilai.', 'Ukuran berada di kurung siku.', 'Index dimulai dari nol.'], 'Array menyimpan?', 'Banyak nilai', ['nilai[3]', '{80'], 'Pilih array.'],
  ['String', 'String C++', 'std::string nama = "Bima";', ['string menyimpan teks.', 'Library string dapat dipakai.', 'Teks berada dalam kutip.'], 'String menyimpan?', 'Teks', ['std::string', 'nama'], 'Pilih string.'],
  ['Basic pointer introduction', 'Pointer dasar', 'int angka = 10;\nint* ptr = &angka;', ['Pointer menyimpan alamat.', '& mengambil alamat.', '* menandai pointer.'], 'Pointer menyimpan?', 'Alamat memori', ['int*', '&angka'], 'Pilih pointer.']
];
lessons.cpp.modules = cppTopics.map(([title, concept, code, explanation, question, answer, checks, challenge]) => makeModule(title, concept, code, explanation, question, answer, checks, challenge)).concat([
  projectModule('Project: Calculator', 'Calculator C++', 'int a = 4, b = 3;\nstd::cout << a + b;', ['Variabel menyimpan angka.', 'Operator menghitung.', 'cout menampilkan hasil.'], 'Calculator digunakan untuk?', 'Menghitung angka', ['int', 'cout', '+']),
  projectModule('Project: Program nilai mahasiswa', 'Nilai mahasiswa', 'int nilai = 85;\nif (nilai >= 75) std::cout << "Lulus";', ['Nilai disimpan.', 'if mengecek kelulusan.', 'cout memberi hasil.'], 'Konsep utama nilai mahasiswa?', 'Kondisi', ['int nilai', 'if', 'cout']),
  projectModule('Project: Kasir sederhana', 'Kasir sederhana', 'int harga = 10000, jumlah = 2;\nstd::cout << harga * jumlah;', ['Harga dan jumlah dikalikan.', 'Hasil adalah total.', 'cout menampilkan total.'], 'Total kasir dihitung dengan?', 'Perkalian', ['harga', 'jumlah', '*']),
  projectModule('Project: Tebak angka', 'Tebak angka C++', 'int jawaban = 7, tebakan = 5;\nif (tebakan == jawaban) std::cout << "Benar";', ['Dua nilai dibandingkan.', 'if menentukan hasil.', 'cout memberi pesan.'], 'Konsep tebak angka?', 'Perbandingan', ['jawaban', 'tebakan', 'if'])
]);

const scratchTopics = [
  ['Mengenal Scratch', 'Dasar Scratch', 'ketika bendera hijau diklik', ['Scratch memakai blok.', 'Blok disusun menjadi script.', 'Project dapat dibuat tanpa mengetik.'], 'Scratch menggunakan?', 'Blok visual', ['bendera hijau'], 'Pilih ciri Scratch.'],
  ['Sprite', 'Sprite', 'ketika bendera hijau diklik\nbergerak 10 langkah', ['Sprite adalah karakter.', 'Sprite dapat bergerak.', 'Script mengatur aksinya.'], 'Sprite adalah?', 'Karakter project', ['Sprite', 'bergerak'], 'Pilih sprite.'],
  ['Stage', 'Stage', 'ketika bendera hijau diklik\npergi ke x: 0 y: 0', ['Stage adalah panggung.', 'Sprite tampil di stage.', 'Koordinat mengatur posisi.'], 'Stage berfungsi sebagai?', 'Panggung project', ['stage', 'x: 0'], 'Pilih stage.'],
  ['Motion', 'Motion', 'bergerak 10 langkah\nputar 15 derajat', ['Motion menggerakkan sprite.', 'Langkah mengubah posisi.', 'Putar mengubah arah.'], 'Motion mengatur?', 'Gerakan', ['bergerak', 'putar'], 'Pilih motion.'],
  ['Looks', 'Looks', 'katakan "Halo!" selama 2 detik\nganti kostum', ['Looks mengubah tampilan.', 'Katakan menampilkan pesan.', 'Kostum mengubah penampilan.'], 'Looks mengatur?', 'Tampilan sprite', ['katakan', 'kostum'], 'Pilih looks.'],
  ['Sound', 'Sound', 'mainkan suara "Meow"\ntunggu 1 detik', ['Sound memainkan suara.', 'Suara membuat project hidup.', 'Blok sound dapat diurutkan.'], 'Sound digunakan untuk?', 'Memainkan suara', ['mainkan suara'], 'Pilih sound.'],
  ['Events', 'Events', 'ketika bendera hijau diklik\nketika sprite ini diklik', ['Event memulai aksi.', 'Bendera memulai project.', 'Klik sprite juga event.'], 'Event berfungsi untuk?', 'Memulai aksi', ['ketika', 'diklik'], 'Pilih event.'],
  ['Control', 'Control', 'ulangi 10 kali\n  bergerak 10 langkah', ['Control mengatur alur.', 'Ulangi membuat loop.', 'Blok berada dalam urutan.'], 'Control mengatur?', 'Alur script', ['ulangi', 'bergerak'], 'Pilih control.'],
  ['Variables', 'Variables', 'atur [skor] ke 0\nubah [skor] sebesar 1', ['Variabel menyimpan nilai.', 'Skor dapat berubah.', 'Blok atur memberi nilai awal.'], 'Variabel menyimpan?', 'Nilai yang dapat berubah', ['skor', 'atur', 'ubah'], 'Pilih variables.'],
  ['Basic operators', 'Operator dasar', 'gabungkan [2] dan [3]\n[4] + [2]', ['Operator menghitung.', 'Blok plus menjumlahkan.', 'Operator membantu logika.'], 'Operator digunakan untuk?', 'Mengolah nilai', ['+', '2'], 'Pilih operator.'],
  ['Keyboard input', 'Input keyboard', 'ketika tombol [spasi] ditekan\nkatakan "Mulai!"', ['Keyboard menjadi input.', 'Event tombol memulai aksi.', 'Script merespons pengguna.'], 'Keyboard adalah?', 'Input pengguna', ['tombol', 'spasi'], 'Pilih input keyboard.']
];
lessons.scratch.modules = scratchTopics.map(([title, concept, code, explanation, question, answer, checks, challenge]) => makeModule(title, concept, code, explanation, question, answer, checks, challenge)).concat([
  projectModule('Project: Animasi sederhana', 'Animasi sederhana', 'ketika bendera hijau diklik\nulangi 10 kali\n  bergerak 10 langkah', ['Event memulai animasi.', 'Control mengulang gerakan.', 'Motion memindahkan sprite.'], 'Animasi menggabungkan?', 'Event, control, motion', ['bendera', 'ulangi', 'bergerak']),
  projectModule('Project: Dialog dua karakter', 'Dialog dua karakter', 'ketika bendera hijau diklik\nkatakan "Halo!" selama 2 detik\ntunggu 2 detik', ['Event memulai dialog.', 'Looks menampilkan ucapan.', 'Wait mengatur giliran.'], 'Dialog membutuhkan?', 'Urutan ucapan', ['bendera', 'katakan', 'tunggu']),
  projectModule('Project: Clicker game', 'Clicker game', 'ketika sprite ini diklik\nubah [skor] sebesar 1\nmainkan suara', ['Klik menjadi event.', 'Skor memakai variabel.', 'Sound memberi feedback.'], 'Clicker game memakai?', 'Event dan variabel', ['diklik', 'skor', 'suara'])
]);

const explorerCurriculum = {
  html: { topics: ['Semantic HTML', '<header>', '<nav>', '<main>', '<section>', '<article>', '<aside>', '<footer>', 'Form', 'Input types', 'Label', 'Select', 'Textarea', 'Button', 'Audio & video', 'iframe', 'HTML entities', 'Accessibility dasar', 'SEO dasar'], projects: ['Website portfolio', 'Halaman login', 'Website artikel'] },
  css: { topics: ['Flexbox', 'CSS Grid', 'Position', 'Z-index', 'Overflow', 'Pseudo-class', 'Pseudo-element', 'CSS variables', 'Responsive design', 'Media query', 'Mobile-first', 'Transition', 'Transform', 'Animation', 'Shadow', 'Gradient'], projects: ['Landing page', 'Dashboard sederhana', 'Responsive portfolio'] },
  javascript: { topics: ['Array methods: map, filter, find, reduce', 'Object methods', 'Destructuring', 'Spread operator', 'Template literals', 'Scope', 'Callback', 'Arrow function', 'DOM manipulation', 'Event delegation', 'Form handling', 'JSON', 'Local Storage', 'Date', 'Error handling', 'Promise', 'Async/await', 'Fetch API', 'REST API', 'ES Modules'], projects: ['Weather app', 'Notes app', 'Movie search', 'To-do app dengan Local Storage'] },
  python: { topics: ['List comprehension', 'Function advanced', 'Lambda', 'Module', 'Package', 'File handling', 'CSV', 'JSON', 'Exception handling', 'OOP', 'Class', 'Object', 'Inheritance', 'Encapsulation', 'Virtual environment', 'pip', 'Regular expression', 'API', 'Database dasar'], projects: ['Sistem kasir', 'Expense tracker', 'Contact management', 'Simple API'] },
  cpp: { topics: ['Pointer', 'Reference', 'Struct', 'Class', 'Object', 'Constructor', 'Destructor', 'Encapsulation', 'Inheritance', 'Polymorphism', 'STL', 'Vector', 'Map', 'Set', 'Stack', 'Queue', 'Iterator', 'File handling', 'Exception'], projects: ['Sistem perpustakaan', 'Sistem mahasiswa', 'Inventory system'] },
  scratch: { topics: ['Conditional', 'Loop', 'Variable', 'List', 'Broadcast', 'Clone', 'Custom block', 'Timer', 'Score system', 'Collision', 'Game state'], projects: ['Pong', 'Flappy Bird sederhana', 'Platformer', 'Quiz game'] }
};

const builderCurriculum = {
  html: { topics: ['Advanced forms', 'Accessibility', 'SEO structure', 'Metadata', 'Open Graph', 'HTML validation', 'Semantic architecture', 'Progressive enhancement', 'Web Components dasar', 'Optimasi struktur HTML'], projects: ['Struktur website portfolio profesional yang accessible dan SEO-friendly'] },
  css: { topics: ['Advanced Grid', 'Advanced Flexbox', 'Container queries', 'Advanced responsive design', 'CSS architecture', 'Custom properties', 'Advanced animation', 'CSS functions: calc(), min(), max(), clamp()', 'Dark mode', 'Accessibility dalam CSS', 'Performance', 'Maintainable CSS'], projects: ['Responsive dashboard lengkap untuk desktop, tablet, dan mobile'] },
  javascript: { topics: ['Advanced asynchronous JavaScript', 'API architecture', 'Authentication concepts', 'Web Storage', 'WebSocket dasar', 'Module architecture', 'Design patterns', 'State management', 'Performance optimization', 'Debouncing & throttling', 'Security dasar', 'Testing', 'Debugging', 'Build tools', 'Package manager', 'TypeScript introduction'], projects: ['Full frontend application dengan API, authentication flow, routing, state management, dan responsive UI'] },
  python: { topics: ['Advanced OOP', 'Decorator', 'Generator', 'Iterator', 'Context manager', 'Type hints', 'Async Python', 'Database', 'ORM', 'REST API', 'Authentication', 'Testing', 'Logging', 'Automation', 'Web scraping', 'Deployment', 'Environment variables'], projects: ['REST API manajemen data dengan database, authentication, validation, dan testing'] },
  cpp: { topics: ['Advanced pointers', 'Dynamic memory', 'Smart pointer', 'Move semantics', 'Templates', 'Lambda', 'Advanced STL', 'Data structures', 'Algorithm', 'Sorting', 'Searching', 'Graph', 'Tree', 'Memory management', 'Multithreading', 'CMake', 'Debugging', 'Performance optimization'], projects: ['File management system', 'Game sederhana', 'Graph visualization', 'Mini database'] },
  scratch: { topics: ['Game architecture', 'State management', 'Advanced collision', 'Enemy AI sederhana', 'Level system', 'Save system', 'Complex variables', 'Custom blocks', 'Optimization', 'Project organization'], projects: ['Game 2D lengkap dengan menu, level, score, enemy, health system, dan game-over screen'] }
};

const languageCode = {
  html: (title) => `<section>\n  <h2>${title}</h2>\n</section>`,
  css: (title) => `.component {\n  display: flex;\n  gap: 1rem;\n}`,
  javascript: (title) => `const feature = "${title}";\nconsole.log(feature);`,
  python: (title) => `def belajar():\n    return "${title}"\n\nprint(belajar())`,
  cpp: (title) => `#include <iostream>\nint main() {\n  std::cout << "${title}";\n  return 0;\n}`,
  scratch: (title) => `ketika bendera hijau diklik\nkatakan "${title}" selama 2 detik`
};

function buildAdvancedModules(languageKey, levelKey) {
  const curriculum = (levelKey === 'explorer' ? explorerCurriculum : builderCurriculum)[languageKey];
  const checks = languageKey === 'scratch' ? [] : [languageKey === 'html' ? '<section' : languageKey === 'css' ? 'display' : languageKey === 'javascript' ? 'const' : languageKey === 'python' ? 'def' : languageKey === 'cpp' ? '#include' : 'ketika'];
  const topicModules = curriculum.topics.map((topic) => makeModule(topic, topic, languageCode[languageKey](topic), [`${topic} adalah bagian penting dari level ${levelKey}.`, 'Perhatikan struktur contoh.', 'Coba hubungkan konsep ini dengan project.'], `Apa fokus utama materi ${topic}?`, topic, checks, `Latih pemahaman ${topic}.`));
  const projectModules = curriculum.projects.map((project) => projectModule(`Project: ${project}`, project, languageCode[languageKey](project), [`Project ini menggabungkan materi ${levelKey}.`, 'Pecah masalah menjadi langkah kecil.', 'Uji hasilnya secara bertahap.'], `Apa tujuan project ${project}?`, project, checks));
  return topicModules.concat(projectModules);
}

Object.keys(lessons).forEach((languageKey) => {
  lessons[languageKey].levels = {
    beginner: lessons[languageKey].modules,
    explorer: buildAdvancedModules(languageKey, 'explorer'),
    builder: buildAdvancedModules(languageKey, 'builder')
  };
});

// Expose dynamic curriculum accessor for achievements.js
if (typeof window !== 'undefined') {
  window.lessons = lessons;
  window.CodeKidsCurriculum = {
    getModuleCount: (lang, level) => {
      const langKey = (lang || '').toLowerCase();
      const lvlKey = (level || '').toLowerCase() === 'newbie' ? 'beginner' : (level || '').toLowerCase();
      const lObj = lessons[langKey] || Object.values(lessons).find(l => (l.name || '').toLowerCase() === langKey);
      if (!lObj || !lObj.levels || !Array.isArray(lObj.levels[lvlKey])) return 0;
      return lObj.levels[lvlKey].length;
    }
  };
}

const params = new URLSearchParams(window.location.search);
let language = params.get('bahasa') || '';
let requestedLevel = params.get('level') || '';
let selected = lessons[language] || lessons.html;
let pendingLanguage = language;
let selectedLevel = requestedLevel === 'newbie' ? 'beginner' : (requestedLevel || 'beginner');
let currentModule = 0;
let activeStep = 0;
let codeDone = false;
let quizDone = false;
let challengeDone = false;
let selectedChoices = [];
const API_BASE_URL = 'http://localhost:8000/api';
const ACCOUNT_SESSION_KEY = 'codekids_session';
const ACCOUNT_USER_ID_KEY = 'codekids_session_user_id';
const CURRENT_USER_CACHE_KEY = 'codekids_current_user';

let currentUserData = null;

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const moduleData = () => selected.modules[currentModule];

function renderXpSidebar(xp) {
  const totalXp = xp || 0;
  const xpTextEl = $('#xpText');
  const xpBarEl = $('#xpBar');
  if (xpTextEl) {
    xpTextEl.textContent = `${totalXp} XP`;
  }
  if (xpBarEl && typeof getXpBadge === 'function') {
    const badge = getXpBadge(totalXp);
    xpBarEl.style.width = `${badge.progress}%`;
  }
}

async function loadUserData() {
  const userId = localStorage.getItem(ACCOUNT_USER_ID_KEY);
  const userEmail = localStorage.getItem(ACCOUNT_SESSION_KEY);

  // 1. Initial read from cache for fast startup
  try {
    const cached = localStorage.getItem(CURRENT_USER_CACHE_KEY);
    if (cached) currentUserData = JSON.parse(cached);
  } catch (e) {}

  // 2. Fetch fresh user data from REST API backend
  if (userId) {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${userId}`);
      const data = await res.json();
      if (data.success && data.user) {
        currentUserData = data.user;
        localStorage.setItem(CURRENT_USER_CACHE_KEY, JSON.stringify(data.user));
        localStorage.setItem(ACCOUNT_SESSION_KEY, data.user.email);
        localStorage.setItem(ACCOUNT_USER_ID_KEY, data.user.id);
      }
    } catch (err) {
      console.warn('Backend API not reachable from lesson, using cached user if available.');
    }
  } else if (userEmail) {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        const matched = data.users.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
        if (matched) {
          currentUserData = matched;
          localStorage.setItem(CURRENT_USER_CACHE_KEY, JSON.stringify(matched));
          localStorage.setItem(ACCOUNT_SESSION_KEY, matched.email);
          localStorage.setItem(ACCOUNT_USER_ID_KEY, matched.id);
        }
      }
    } catch (err) {
      console.warn('Backend API not reachable from lesson, using cached user if available.');
    }
  }

  if (currentUserData) {
    renderXpSidebar(currentUserData.xp || 0);
    const lessonShell = $('#lessonShell');
    if (lessonShell && !lessonShell.classList.contains('is-hidden')) {
      renderLesson();
    }
  }
}

// Start loading user data immediately
loadUserData();

function setLevel(level) {
  document.querySelectorAll('.level-choice').forEach((button) => button.classList.toggle('active', button.dataset.level === level));
  $('#startLevel').textContent = `Mulai level ${level[0].toUpperCase() + level.slice(1)} →`;
  $('#startLevel').dataset.level = level;
}

document.querySelectorAll('.level-choice').forEach((button) => button.addEventListener('click', () => setLevel(button.dataset.level)));
const languageOptions = [
  ['html', '<svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M4 3l1.6 18 6.4 2 6.4-2L20 3H4z" fill="#E44D26"/><path d="M12 4.8v16.4l4.9-1.5L18.3 4.8H12z" fill="#F16529"/><path d="M8 8h8l-.3 3.5H9.2l.2 2.5h6.3l-.6 6-3.1 1-3.1-1-.2-2.5h-2l.4 4.5 4.9 1.5 4.9-1.5 1-11.5H8V8z" fill="#fff"/></svg>', 'HTML', 'Struktur halaman'],
  ['css', '<svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M4 3l1.6 18 6.4 2 6.4-2L20 3H4z" fill="#1572B6"/><path d="M12 4.8v16.4l4.9-1.5L18.3 4.8H12z" fill="#33A9DC"/><path d="M8 8h8l-.3 3.5H9.2l.2 2.5h6.3l-.6 6-3.1 1-3.1-1-.2-2.5h-2l.4 4.5 4.9 1.5 4.9-1.5 1-11.5H8V8z" fill="#fff"/></svg>', 'CSS', 'Desain tampilan'],
  ['javascript', '<svg viewBox="0 0 24 24" width="28" height="28"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M7 16.5c.5.8 1.2 1.3 2.1 1.3 1 0 1.6-.5 1.6-1.5v-6H9.2v6c0 .3-.1.5-.4.5-.3 0-.5-.2-.7-.5L7 16.5zm6.5-.2c.6 1 1.5 1.5 2.6 1.5 1.5 0 2.4-.8 2.4-2 0-1.2-.8-1.7-2-2.2l-.4-.2c-.7-.3-1-.6-1-1.1 0-.5.4-.9 1.1-.9.6 0 1 .3 1.4.8l1.1-.8c-.6-.9-1.4-1.3-2.5-1.3-1.4 0-2.3.8-2.3 2 0 1.1.7 1.6 1.8 2.1l.4.2c.8.3 1.2.7 1.2 1.3 0 .6-.5 1-1.3 1-.8 0-1.3-.4-1.7-1.1l-1.2.7z" fill="#000"/></svg>', 'JavaScript', 'Interaksi halaman'],
  ['python', '<svg viewBox="0 0 24 24" width="28" height="28"><path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.1 1.4h3v.4H6.3S4 4.8 4 8c0 3.2 2 3.1 2 3.1h1.2v-1.7c0-1.9 1.7-1.8 1.7-1.8h2.9c1.6 0 1.6-1.5 1.6-1.5V3.5S13.6 2 11.9 2zm-1.6 1a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="#3776AB"/><path d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.1-1.4h-3v-.4h5.8s2.3.3 2.3-2.9c0-3.2-2-3.1-2-3.1h-1.2v1.7c0 1.9-1.7 1.8-1.7 1.8H12.2c-1.6 0-1.6 1.5-1.6 1.5v2.6s-.2 1.5 1.5 1.5zm1.6-1a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" fill="#FFD438"/></svg>', 'Python', 'Logika pemrograman'],
  ['cpp', '<svg viewBox="0 0 24 24" width="28" height="28"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="#00599C"/><text x="12" y="15" fill="#fff" font-family="Inter,sans-serif" font-weight="900" font-size="8" text-anchor="middle">C++</text></svg>', 'C++', 'Fondasi program'],
  ['scratch', '<svg viewBox="0 0 24 24" width="28" height="28"><rect width="24" height="24" rx="6" fill="#F49C25"/><path d="M12 4C7.6 4 4 7.6 4 12c0 2.2.9 4.2 2.3 5.7L12 12V4zm0 16c4.4 0 8-3.6 8-8 0-2.2-.9-4.2-2.3-5.7L12 12v8z" fill="#FFB84D"/><circle cx="12" cy="12" r="3.5" fill="#fff"/></svg>', 'Scratch', 'Visual coding']
];

function renderLanguageChoices() {
  $('#languageChoices').innerHTML = languageOptions.map(([key, logo, name, description]) => `<button class="language-choice ${key === pendingLanguage ? 'active' : ''}" data-language="${key}" type="button"><span class="language-logo logo-${key}">${logo}</span><span><strong>${name}</strong><small>${description}</small></span></button>`).join('');
  $('#languageChoices').querySelectorAll('.language-choice').forEach((button) => button.addEventListener('click', () => {
    pendingLanguage = button.dataset.language;
    $('#startLanguage').disabled = false;
    $('#languageChoices').querySelectorAll('.language-choice').forEach((choice) => choice.classList.toggle('active', choice === button));
  }));
  $('#startLanguage').disabled = !pendingLanguage;
}

function openLanguageGate(level) {
  $('#levelGate').classList.add('is-hidden');
  $('#languageGate').classList.remove('is-hidden');
  $('#lessonShell').classList.add('is-hidden');
  $('#languageGateEyebrow').textContent = `Level ${level[0].toUpperCase() + level.slice(1)}`;
  renderLanguageChoices();
}

function goToLevelGate() {
  $('#lessonShell').classList.add('is-hidden');
  $('#languageGate').classList.add('is-hidden');
  $('#levelGate').classList.remove('is-hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToLanguageGate() {
  $('#lessonShell').classList.add('is-hidden');
  $('#levelGate').classList.add('is-hidden');
  $('#languageGate').classList.remove('is-hidden');
  $('#languageGateEyebrow').textContent = `Level ${selectedLevel[0].toUpperCase() + selectedLevel.slice(1)}`;
  renderLanguageChoices();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function isModuleCompleted(index) {
  if (!currentUserData || !currentUserData.progress) return false;
  const key = `${selected.name} · ${selectedLevel} · ${index + 1}`;
  return !!(currentUserData.progress[key] && currentUserData.progress[key].completed);
}

function getResumeModuleIndex() {
  const urlModule = parseInt(params.get('modul') || params.get('module') || '0');
  if (urlModule > 0 && urlModule <= selected.modules.length) {
    return urlModule - 1;
  }

  if (currentUserData && currentUserData.progress) {
    let highestVisited = 0;
    Object.values(currentUserData.progress).forEach(item => {
      if (item && (item.language || '').toLowerCase() === selected.name.toLowerCase() && item.level === selectedLevel) {
        const modIndex = Number(item.module) - 1;
        if (!isNaN(modIndex) && modIndex >= 0 && modIndex < selected.modules.length) {
          if (modIndex > highestVisited) highestVisited = modIndex;
        }
      }
    });
    if (highestVisited > 0) return highestVisited;
  }

  const stored = localStorage.getItem(`codekids_last_${selected.name.toLowerCase()}_${selectedLevel}`);
  if (stored !== null) {
    const idx = parseInt(stored);
    if (!isNaN(idx) && idx >= 0 && idx < selected.modules.length) {
      return idx;
    }
  }

  return 0;
}

function openLesson() {
  const languageLesson = lessons[language] || lessons.html;
  selected = { ...languageLesson, modules: languageLesson.levels[selectedLevel] || languageLesson.modules };
  currentModule = getResumeModuleIndex();
  $('#levelGate').classList.add('is-hidden');
  $('#languageGate').classList.add('is-hidden');
  $('#lessonShell').classList.remove('is-hidden');
  renderLesson();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

$('#startLevel').addEventListener('click', () => {
  selectedLevel = $('#startLevel').dataset.level;
  if (language) {
    openLesson();
  } else {
    openLanguageGate('beginner');
  }
});

$('#startLanguage').addEventListener('click', () => {
  language = pendingLanguage;
  openLesson();
});

['#backToLevelBtn', '#changeLevelBtn', '#backLevelFromLanguage'].forEach((selector) => {
  const el = $(selector);
  if (el) el.addEventListener('click', goToLevelGate);
});
['#backToLanguageBtn', '#changeLanguageBtn'].forEach((selector) => {
  const el = $(selector);
  if (el) el.addEventListener('click', goToLanguageGate);
});

if (requestedLevel) {
  selectedLevel = requestedLevel;
  if (language) {
    openLesson();
  } else {
    openLanguageGate(requestedLevel);
  }
} else if (language) {
  setLevel('beginner');
}

function isModuleUnlocked(index) {
  if (index === 0) return true;
  if (isModuleCompleted(index - 1)) return true;
  if (isModuleCompleted(index)) return true;

  if (currentUserData && currentUserData.progress) {
    const key = `${selected.name} · ${selectedLevel} · ${index + 1}`;
    if (currentUserData.progress[key]) return true;
  }
  return false;
}

function renderLesson() {
  const item = moduleData();
  const levelName = selectedLevel[0].toUpperCase() + selectedLevel.slice(1);
  $('#moduleEyebrow').textContent = `${levelName} · ${selected.name}`;
  $('#sidebarEyebrow').textContent = `Level ${levelName} · ${selected.name}`;
  $('#moduleTitle').textContent = item.concept;
  $('#moduleSummary').textContent = item.summary;
  $('#conceptTitle').textContent = item.title;
  $('#conceptCopy').textContent = item.summary;
  $('#practiceTitle').textContent = item.title;
  $('#practiceQuestion').textContent = item.task;
  $('#challengeTitle').textContent = item.challenge;
  $('#challengeDescription').textContent = item.challenge;
  $('#progressText').textContent = `${currentModule + 1}/${selected.modules.length}`;
  $('#previousModule').disabled = currentModule === 0;

  const alreadyDone = isModuleCompleted(currentModule);
  $('#nextModule').disabled = !alreadyDone || (currentModule >= selected.modules.length - 1);
  if (alreadyDone) {
    $('#practiceStatus').textContent = 'Modul selesai ✓';
  } else {
    $('#practiceStatus').textContent = 'Belum dicoba';
  }

  localStorage.setItem(`codekids_last_${selected.name.toLowerCase()}_${selectedLevel}`, currentModule);

  // Hitung modul yang sudah selesai dan terbuka
  let completedCount = 0;
  let unlockedCount = 0;
  for (let i = 0; i < selected.modules.length; i++) {
    if (isModuleCompleted(i)) completedCount++;
    if (isModuleUnlocked(i)) unlockedCount++;
  }

  // Update Trigger Button Text
  const triggerText = $('#dropdownTriggerText');
  if (triggerText) {
    const isCurrentDone = isModuleCompleted(currentModule);
    triggerText.textContent = `${isCurrentDone ? '✓ ' : ''}Modul ${currentModule + 1}: ${item.title} (${currentModule + 1}/${selected.modules.length})`;
  }

  const unlockedCountEl = $('#dropdownUnlockedCount');
  if (unlockedCountEl) {
    unlockedCountEl.innerHTML = `<span style="color:#15803d;font-weight:800">Selesai: ${completedCount}/${selected.modules.length}</span>`;
  }

  // Render Dropdown Items
  const dropdownItems = $('#moduleDropdownItems');
  if (dropdownItems) {
    dropdownItems.innerHTML = selected.modules.map((mod, idx) => {
      const isCompleted = isModuleCompleted(idx);
      const isUnlocked = isModuleUnlocked(idx);
      const isActive = idx === currentModule;

      let itemClass = 'dropdown-item';
      let statusBadge = '';

      if (isCompleted) {
        itemClass += ' is-completed';
        if (isActive) itemClass += ' is-active';
        statusBadge = '<span class="badge-status badge-done">✓ Selesai</span>';
      } else if (isActive) {
        itemClass += ' is-active';
        statusBadge = '<span class="badge-status badge-current">📍 Sedang Dipelajari</span>';
      } else if (isUnlocked) {
        itemClass += ' is-unlocked';
        statusBadge = '<span class="badge-status badge-open">Mulai Belajar</span>';
      } else {
        itemClass += ' is-locked';
        statusBadge = '<span class="badge-status badge-lock">🔒 Terkunci</span>';
      }

      return `
        <button class="${itemClass}" data-index="${idx}" data-unlocked="${isUnlocked}" type="button">
          <div class="item-left">
            <span style="${isCompleted ? 'color:#15803d;font-weight:900' : ''}">${isCompleted ? '✓' : (isUnlocked ? (idx + 1) : '🔒')}</span>
            <span class="item-title">${idx + 1}. ${escapeHtml(mod.title)}</span>
          </div>
          ${statusBadge}
        </button>
      `;
    }).join('');

    dropdownItems.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetIdx = Number(btn.dataset.index);
        const unlocked = btn.dataset.unlocked === 'true';

        if (!unlocked) {
          e.stopPropagation();
          alert(`🔒 Modul ${targetIdx + 1} masih terkunci!\nSelesaikan Modul ${targetIdx} terlebih dahulu untuk membuka materi ini.`);
          return;
        }

        currentModule = targetIdx;
        const wrap = $('#moduleDropdownWrap');
        if (wrap) wrap.classList.remove('is-open');
        renderLesson();
      });
    });
  }

  $('#moduleList').innerHTML = selected.modules.map((module, index) => {
    const done = isModuleCompleted(index);
    const unlocked = isModuleUnlocked(index);
    return `<button class="module-button ${index === currentModule ? 'active' : ''} ${done ? 'completed' : ''}" type="button" ${!unlocked ? 'disabled style="opacity:.45;cursor:not-allowed"' : ''}><span class="module-number">${done ? '✓' : (unlocked ? index + 1 : '🔒')}</span><span><strong>${module.title}</strong><small>${unlocked ? `${levelName} · ${selected.name}` : '🔒 Terkunci'}</small></span></button>`;
  }).join('');
  $('#moduleList').querySelectorAll('button:not([disabled])').forEach((button) => button.addEventListener('click', () => { currentModule = Number(button.querySelector('.module-number').textContent === '✓' ? selected.modules.findIndex(m => m.title === button.querySelector('strong').textContent) : (parseInt(button.querySelector('.module-number').textContent) - 1)); renderLesson(); }));

  codeDone = alreadyDone; quizDone = alreadyDone; challengeDone = alreadyDone; selectedChoices = []; activeStep = 0;
  renderConcept(item); renderPractice(item); renderChallenge(item);
}

function renderConcept(item) {
  $('#codeExample').textContent = item.code;
  $('#codeExplanation').innerHTML = item.explanation.map((text, index) => `<div class="explanation-item"><b>${index + 1}</b><p>${escapeHtml(text)}</p></div>`).join('');
  $('#stepDots').innerHTML = [0, 1, 2].map((step) => `<button class="step-dot ${step === 0 ? 'active' : ''}" data-step="${step}" type="button" aria-label="Langkah ${step + 1}"></button>`).join('');
  $('#stepDots').querySelectorAll('button').forEach((button) => button.addEventListener('click', () => { activeStep = Number(button.dataset.step); showStep(); }));
  showStep();
}

function showStep() {
  const item = moduleData();
  const focus = item.explanation[activeStep] || item.explanation[0];
  $('#stageCaption').textContent = focus;
  $('#stepDots').querySelectorAll('button').forEach((button, index) => button.classList.toggle('active', index === activeStep));
}

function renderPractice(item) {
  $('#codeEditor').value = '';
  $('#codeFeedback').textContent = '';
  $('#codeFeedback').className = 'feedback';
  $('#practiceFeedback').textContent = '';
  $('#practiceFeedback').className = 'feedback';
  $('#practiceStatus').textContent = 'Belum dicoba';
  $('#quizQuestion').textContent = item.question;
  $('#practiceAnswers').innerHTML = item.answers.map((answer, index) => `<button class="answer-button" data-answer="${index}" type="button">${escapeHtml(answer)}</button>`).join('');
  $('#practiceAnswers').querySelectorAll('button').forEach((button) => button.addEventListener('click', () => { const correct = Number(button.dataset.answer) === item.correct; $('#practiceAnswers').querySelectorAll('button').forEach((option) => { option.disabled = true; if (Number(option.dataset.answer) === item.correct) option.classList.add('correct'); }); button.classList.toggle('wrong', !correct); $('#practiceFeedback').textContent = correct ? 'Benar! Konsepnya sudah dipahami.' : 'Belum tepat. Baca lagi penjelasan materi.'; $('#practiceFeedback').className = `feedback ${correct ? 'success' : 'error'}`; if (correct) quizDone = true; updateProgress(); }));
  $('#checkCode').onclick = () => {
    const raw = $('#codeEditor').value;
    const typed = raw.replace(/\s/g, '').toLowerCase();

    // Modul tanpa syarat kode (mis. Scratch) — lolos langsung
    if (item.checks.length === 0) {
      $('#codeFeedback').textContent = 'Kode benar! Kamu berhasil menulis sendiri.';
      $('#codeFeedback').className = 'feedback success';
      codeDone = true;
      updateProgress();
      return;
    }

    // Panjang minimum: 30% dari karakter non-whitespace pada contoh, minimal 10 karakter
    const exampleNonWs = (item.code || '').replace(/\s/g, '').length;
    const minLength = Math.max(10, Math.floor(exampleNonWs * 0.3));
    if (typed.length < minLength) {
      $('#codeFeedback').textContent = 'Kodenya masih terlalu pendek. Pastikan semua bagian penting sudah kamu tulis!';
      $('#codeFeedback').className = 'feedback error';
      return;
    }

    // Cek setiap elemen konsep/syntax yang diwajibkan (whitespace-insensitive, case-insensitive)
    const missing = item.checks.filter(
      (part) => !typed.includes(part.replace(/\s/g, '').toLowerCase())
    );
    const correct = missing.length === 0;

    if (correct) {
      $('#codeFeedback').textContent = 'Kode benar! Kamu berhasil menulis sendiri.';
    } else {
      $('#codeFeedback').textContent = 'Masih ada bagian yang kurang. Pastikan kamu sudah menggunakan semua konsep yang diwajibkan pada modul ini.';
    }
    $('#codeFeedback').className = `feedback ${correct ? 'success' : 'error'}`;
    if (correct) codeDone = true;
    updateProgress();
  };

}

function renderChallenge(item) {
  selectedChoices = [];
  $('#challengeFeedback').textContent = '';
  $('#challengeFeedback').className = 'feedback challenge-feedback';
  $('#challengeChoices').innerHTML = item.choices.map((choice, index) => `<button class="choice-button" data-choice="${index}" type="button">${escapeHtml(choice)}</button>`).join('');
  $('#challengeChoices').querySelectorAll('button').forEach((button) => button.addEventListener('click', () => { const choice = Number(button.dataset.choice); button.classList.toggle('selected'); selectedChoices = selectedChoices.includes(choice) ? selectedChoices.filter((value) => value !== choice) : [...selectedChoices, choice]; }));
  $('#checkChallenge').onclick = () => { const correct = [...selectedChoices].sort().join(',') === [...item.challengeCorrect].sort().join(','); $('#challengeFeedback').textContent = correct ? 'Challenge selesai! Kamu siap lanjut.' : 'Pilihan belum tepat. Coba periksa lagi.'; $('#challengeFeedback').className = `feedback challenge-feedback ${correct ? 'success' : 'error'}`; if (correct) challengeDone = true; updateProgress(); };
}

function updateProgress() {
  const complete = codeDone && quizDone && challengeDone;
  const isLastModule = currentModule >= selected.modules.length - 1;

  if (complete) {
    saveLessonProgress(true);

    if (isLastModule) {
      // Modul terakhir: tombol Selanjutnya tetap tersembunyi, tampilkan pesan selesai
      $('#nextModule').disabled = true;
      const levelLabel = selectedLevel === 'beginner' ? 'Newbie'
        : selectedLevel[0].toUpperCase() + selectedLevel.slice(1);
      $('#practiceStatus').textContent =
        `🎉 Semua modul ${levelLabel} ${selected.name} selesai! Luar biasa!`;
    } else {
      $('#nextModule').disabled = false;
      $('#practiceStatus').textContent = 'Modul selesai ✓';
    }
  } else {
    $('#nextModule').disabled = true;
  }
}


function getMakassarDateString() {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Makassar' }).format(new Date());
  } catch (e) {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const makassarTime = new Date(utc + (3600000 * 8));
    return makassarTime.toISOString().slice(0, 10);
  }
}

function updateLocalStreak(user) {
  const todayStr = getMakassarDateString();
  const currentStreak = user.streak || { current: 0, longest: 0, last_date: '', history: [] };
  const lastDate = currentStreak.last_date || '';
  const history = Array.isArray(currentStreak.history) ? [...currentStreak.history] : [];

  if (lastDate === todayStr) {
    return currentStreak;
  }

  let diffDays = null;
  if (lastDate) {
    try {
      const d1 = new Date(todayStr);
      const d2 = new Date(lastDate);
      diffDays = Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
    } catch (e) {
      diffDays = null;
    }
  }

  let newCurrent = 1;
  if (diffDays === 1) {
    newCurrent = (currentStreak.current || 0) + 1;
  }
  const newLongest = Math.max(currentStreak.longest || 0, newCurrent);
  if (!history.includes(todayStr)) {
    history.push(todayStr);
  }

  user.streak = {
    current: newCurrent,
    longest: newLongest,
    last_date: todayStr,
    history: history.slice(-100)
  };
  return user.streak;
}

async function saveLessonProgress(completed) {
  const userId = localStorage.getItem(ACCOUNT_USER_ID_KEY) || (currentUserData ? currentUserData.id : null);
  const userEmail = localStorage.getItem(ACCOUNT_SESSION_KEY);
  if (!userId && !userEmail) return;
  // Guard keamanan: jangan simpan apapun jika modul belum benar-benar diselesaikan
  if (!completed) return;

  let user = currentUserData;
  if (!user || (!user.id && userId)) {
    try {
      const endpoint = userId ? `${API_BASE_URL}/users/${userId}` : `${API_BASE_URL}/users`;
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.success) {
        user = data.user || (Array.isArray(data.users) ? data.users.find(u => u.email.toLowerCase() === (userEmail || '').toLowerCase()) : null);
      }
    } catch (e) {}
  }
  if (!user) return;

  user.progress = user.progress || {};
  const key = `${selected.name} · ${selectedLevel} · ${currentModule + 1}`;
  const alreadyCompleted = !!(user.progress[key] && user.progress[key].completed);

  // Tandai progress modul selesai
  user.progress[key] = {
    language: selected.name,
    level: selectedLevel,
    module: currentModule + 1,
    title: moduleData().title,
    completed: true,
    updatedAt: new Date().toISOString()
  };

  // Update streak harian (Asia/Makassar)
  updateLocalStreak(user);

  // Evaluasi achievement & XP hanya jika modul baru pertama kali diselesaikan
  // achievements.js memiliki anti-duplikasi sendiri, tapi ini mencegah komputasi berulang
  if (!alreadyCompleted) {
    if (typeof evaluateAchievements === 'function') {
      evaluateAchievements(user);
    } else {
      const calcXp = (user.achievements || []).reduce((tot, it) => tot + (it.xp || 0), 0);
      user.xp = Math.max(user.xp || 0, calcXp);
    }
  }

  // Simpan ke state dan cache lokal
  currentUserData = user;
  localStorage.setItem(CURRENT_USER_CACHE_KEY, JSON.stringify(user));
  renderXpSidebar(user.xp || 0);

  // Simpan ke database backend SQLite via REST API
  const targetId = user.id || userId;
  if (targetId) {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xp: user.xp,
          progress: user.progress,
          achievements: user.achievements,
          streak: user.streak
        })
      });
      const data = await res.json();
      if (data.success) {
        // Render ulang daftar modul agar status selesai / unlock terupdate
        const levelName = selectedLevel === 'beginner' ? 'Newbie' : (selectedLevel[0].toUpperCase() + selectedLevel.slice(1));
        const dropdownItems = $('#moduleDropdownItems');
        if (dropdownItems) {
          dropdownItems.innerHTML = selected.modules.map((mod, idx) => {
            const isCompleted = isModuleCompleted(idx);
            const isUnlocked = isModuleUnlocked(idx);
            const isActive = idx === currentModule;
            let itemClass = 'dropdown-item';
            let statusBadge = '';
            if (isCompleted) {
              itemClass += ' is-completed';
              if (isActive) itemClass += ' is-active';
              statusBadge = '<span class="badge-status badge-done">✓ Selesai</span>';
            } else if (isActive) {
              itemClass += ' is-active';
              statusBadge = '<span class="badge-status badge-current">📍 Sedang Dipelajari</span>';
            } else if (isUnlocked) {
              itemClass += ' is-unlocked';
              statusBadge = '<span class="badge-status badge-open">Mulai Belajar</span>';
            } else {
              itemClass += ' is-locked';
              statusBadge = '<span class="badge-status badge-lock">🔒 Terkunci</span>';
            }
            return `
              <button class="${itemClass}" data-index="${idx}" data-unlocked="${isUnlocked}" type="button">
                <div class="item-left">
                  <span style="${isCompleted ? 'color:#15803d;font-weight:900' : ''}">${isCompleted ? '✓' : (isUnlocked ? (idx + 1) : '🔒')}</span>
                  <span class="item-title">${idx + 1}. ${escapeHtml(mod.title)}</span>
                </div>
                ${statusBadge}
              </button>
            `;
          }).join('');

          dropdownItems.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const targetIdx = Number(btn.dataset.index);
              const unlocked = btn.dataset.unlocked === 'true';
              if (!unlocked) {
                e.stopPropagation();
                alert(`🔒 Modul ${targetIdx + 1} masih terkunci!\nSelesaikan Modul ${targetIdx} terlebih dahulu untuk membuka materi ini.`);
                return;
              }
              currentModule = targetIdx;
              const wrap = $('#moduleDropdownWrap');
              if (wrap) wrap.classList.remove('is-open');
              renderLesson();
            });
          });
        }

        $('#moduleList').innerHTML = selected.modules.map((module, index) => {
          const done = isModuleCompleted(index);
          const unlocked = isModuleUnlocked(index);
          return `<button class="module-button ${index === currentModule ? 'active' : ''} ${done ? 'completed' : ''}" type="button" ${!unlocked ? 'disabled style="opacity:.45;cursor:not-allowed"' : ''}><span class="module-number">${done ? '✓' : (unlocked ? index + 1 : '🔒')}</span><span><strong>${module.title}</strong><small>${unlocked ? `${levelName} · ${selected.name}` : '🔒 Terkunci'}</small></span></button>`;
        }).join('');
        $('#moduleList').querySelectorAll('button:not([disabled])').forEach((button) => button.addEventListener('click', () => { currentModule = Number(button.querySelector('.module-number').textContent === '✓' ? selected.modules.findIndex(m => m.title === button.querySelector('strong').textContent) : (parseInt(button.querySelector('.module-number').textContent) - 1)); renderLesson(); }));
      }
    } catch (err) {
      console.warn('Gagal menyimpan progress ke backend API:', err);
    }
  }
}

$('#previousModule').addEventListener('click', () => { if (currentModule > 0) { currentModule -= 1; renderLesson(); } });
$('#nextModule').addEventListener('click', () => { if (!$('#nextModule').disabled && currentModule < selected.modules.length - 1) { currentModule += 1; renderLesson(); } });

// Anti-Cheat: Cegah copy / cut / klik kanan pada materi contoh kode (Bagian 1)
document.querySelectorAll('.concept-card, #codeExample, .code-window, .explanation-list, #animationStage').forEach((el) => {
  el.addEventListener('copy', (e) => { e.preventDefault(); return false; });
  el.addEventListener('cut', (e) => { e.preventDefault(); return false; });
  el.addEventListener('contextmenu', (e) => { e.preventDefault(); return false; });
});

// Cegah paste pada editor latihan kode (Bagian 2)
const codeEditorEl = $('#codeEditor');
if (codeEditorEl) {
  codeEditorEl.addEventListener('paste', (e) => {
    e.preventDefault();
    $('#codeFeedback').textContent = '⚠️ Silakan ketik kodenya sendiri secara manual, jangan copy-paste ya!';
    $('#codeFeedback').className = 'feedback error';
  });
}

// Toggle Dropdown Modul on Click / Touch
const dropdownTrigger = $('#moduleDropdownTrigger');
if (dropdownTrigger) {
  dropdownTrigger.onclick = (e) => {
    e.stopPropagation();
    const wrap = $('#moduleDropdownWrap');
    if (wrap) wrap.classList.toggle('is-open');
  };
}
document.addEventListener('click', (e) => {
  const wrap = $('#moduleDropdownWrap');
  if (wrap && !wrap.contains(e.target)) {
    wrap.classList.remove('is-open');
  }
});
