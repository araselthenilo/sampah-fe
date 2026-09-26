# S.A.M.P.A.H — Frontend
> **S**istem **A**dministrasi **M**anajemen **P**ribadi & **A**ktivitas **H**arian  

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.18.4-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Status](https://img.shields.io/badge/Status-Works%20On%20My%20Machine-success)](#)
[![CSS](https://img.shields.io/badge/CSS-Vanilla%20Tanpa%20MSG-blue)](#)
[![Kadar Kafein](https://img.shields.io/badge/Kafein-9999%20mg%2FdL-orange)](#)

---

## 📖 Latar Belakang (Biar Keren Aja)

Apakah hidup Anda terasa berantakan? Apakah tumpukan deadline Anda sudah ditagih berkali-kali? Apakah otak jenius Anda sudah tahu harus ngapain tapi mager aja?

**Sama dong**

Singkat aja, **S.A.M.P.A.H** hadir sebagai mahakarya *over-engineering* antarmuka web personal management. Dibangun dengan kombinasi teknologi terdepan abad ke-21 hanya demi membantu Anda mencatat tugas-tugas yang pada akhirnya akan tetap Anda tunda hingga H-1 jam pengumpulan.

---

## 📑 Daftar Isi

- [✨ Fitur-Fitur "Revolusioner"](#-fitur-fitur-revolusioner)
- [🏗️ Arsitektur & Teknologi](#️-arsitektur--teknologi)
- [🚀 Cara Menjalankan Ritual (Installation)](#-cara-menjalankan-ritual-installation)
- [🎮 Easter Egg & Protokol Rahasia](#-easter-egg--protokol-rahasia)
- [❓ Tanya Jawab Gak Penting (FAQ)](#-tanya-jawab-gak-penting-faq)
- [📜 Lisensi](#-lisensi)

---

## ✨ Fitur-Fitur "Revolusioner"

Aplikasi ini dibagi menjadi beberapa zona dimensional yang dikendalikan oleh router mutakhir:

### 1. 📊 Dashboard of False Productivity (`/dashboard`)
Pusat komando utama. Tempat Anda membuka aplikasi, memandangi grafik atau ringkasan status beberapa detik, merasa sudah sangat produktif, lalu menutupnya kembali untuk membuka TikTok/YouTube.

### 2. 🗂️ Tasks & Assignments Multiverse (`/tasks-assignments`)
Fitur pemisah eksistensial menggunakan nested routing:
- **`/tasks` (Tasks View):** Daftar hal-hal yang *katanya* mau Anda kerjakan hari ini (misal: "minum air", "napas", "mulai tobat").
- **`/assignments` (Assignments View):** Daftar kewajiban formal yang punya bobot nilai atau ancaman SP/teguran bos. Dilengkapi tombol switch yang dibuat dengan penuh pergolakan batin dan keringat dingin.

### 3. 👤 Profil Diri (`/profile`)
Tempat memverifikasi bahwa Anda masih seorang manusia yang bernyawa dan belum sepenuhnya berevolusi menjadi secangkir kopi dingin.

### 4. ⚙️ Pengaturan Semesta (`/settings`)
Berisi switch dan tombol-tombol yang memberikan ilusi bahwa Anda memegang kendali penuh atas takdir dan sistem ini.

### 5. 🕳️ The Mythical 404 Void (`/missing-page` atau URL ngawur apa saja)
Halaman failsafe yang jauh lebih niat pengembangannya daripada fitur utama:
- Random excuse generator bertema Anki & spaced repetition (dari *"Algoritma spaced repetition melempar halaman ini ke tahun 2035"* sampai *"SIPON! YTTA..."*).
- Konami Code detector (`↑ ↑ ↓ ↓ ← → ← → B A`) untuk memanggil konsol mini-arcade terlarang.
- Penghormatan khusus untuk Sylveon ✨.

---

## 🏗️ Arsitektur & Teknologi

Kami tidak menggunakan sembarang teknologi. Semuanya dipilih melalui pertimbangan spiritual yang matang:

| Komponen      | Senjata            | Alasan Ilmiah                                                                                                 |
| :--------------| :-------------------| :--------------------------------------------------------------------------------------------------------------|
| **Framework** | `React 19`         | Menggunakan versi paling mutakhir biar keliatan kredibel bet di bio Twitter/GitHub.                           |
| **Bundler**   | `Vite 8`           | Kecepatan reload lebih cepat daripada hilangnya motivasi belajar Anda.                                        |
| **Routing**   | `React Router 7`   | Menjamin Anda bisa tersesat di dalam aplikasi dengan navigasi yang sangat mulus.                              |
| **Styling**   | `Pure Vanilla CSS` | Menolak Tailwind demi melestarikan resep tulisan tangan CSS leluhur tanpa MSG dan dependensi ribuan gigabyte. |
| **Linting**   | `ESLint 10`        | Entitas digital yang tugas utamanya memarahi spasi dan titik koma Anda.                                       |

---

## 🚀 Cara Menjalankan Ritual (Installation)

### Syarat & Prasyarat
1. Komputer yang masih menyala (laptop kentang dipersilakan, Vite cukup ramah).
2. [Node.js](https://nodejs.org/) terpasang (versi modern, jangan pakai Node zaman Majapahit).
3. Waras (Opsional).

### Langkah-Langkah

1. **Unduh Mantra (Clone repository):**
   ```bash
   git clone https://github.com/username-anda/personal-management-fe.git
   cd personal-management-fe
   ```

2. **Panggil Roh Dependensi:**
   ```bash
   npm install
   ```
   *(Tunggu sampai folder `node_modules` memakan gravitasi lokal harddisk Anda).*

3. **Bakar Menyan (Jalankan Development Server):**
   ```bash
   npm run dev
   ```
   Biasanya Vite akan berbisik manja di:  
   👉 `http://localhost:5173` *(atau port lain jika 5173 sedang kena karma proses lain).*

4. **Kompilasi Menuju Keabadian (Production Build):**
   ```bash
   npm run build
   ```

5. **Minta Dihakimi (Linting):**
   ```bash
   npm run lint
   ```

---

## 🎮 Easter Egg & Protokol Rahasia

Jika Anda bosan menghadapi kenyataan hidup:
1. Ketik URL nguwawur di browser, contoh: `http://localhost:5173/mau-nikah-aja-rasanya`
2. Anda akan nyasar di **Halaman 404 (MissingPage)**.
3. Siapkan diri Anda, lalu tekan urutan tombol legendaris:  
   `↑` `↑` `↓` `↓` `←` `→` `←` `→` `B` `A`
4. Nikmati portal rahasia yang terbuka. Jangan lapor dosen atau atasan Anda.

---

## ❓ Tanya Jawab Gak Penting (FAQ)

**Q: Kenapa nama aplikasinya S.A.M.P.A.H?**  
A: Filosofi daur ulang. Barang yang awalnya dianggap **SAMPAH** bisa diolah jadi karya seni bernilai tinggi. Lagipula singkatannya keren dan mudah diingat.

**Q: Apakah aplikasi ini bisa otomatis menyelesaikan tugas saya?**  
A: Tentu saja tidak. Aplikasi ini hanya mencatat. Yang mengerjakan tetap Anda abis doomscroll seharian di kamar.

**Q: Tombolnya diklik tapi kok gak ngefek apa-apa?**  
A: Itu bukan bug, itu fitur melatih kesabaran dan keikhlasan dalam berteknologi. *(Atau mungkin backend-nya belum Anda nyalakan, coba cek tetangga sebelah).*

**Q: Layar saya mendadak blank putih, harus bagaimana?**  
A: Buka DevTools (`F12`), tatap tulisan merah di tab *Console* dengan penuh penyesalan, lalu restart dev server sambil scroll tiktok bentar.

---

## 📜 Lisensi

Dilisensikan di bawah lisensi santai sedunia:  
**"Pakai Saja Sesuka Hati, Kalau Ada Bug Jangan Marah-Marah."**  
Dibuat dengan cinta, begadang, dan sisa-sisa (ataupun nggak ada) kewarasan oleh pengembang tercinta :3

---

*Tapi, masih WIP yaa...*
*Doain biar cepet selesai dan bisa langsung dipake buat nambah portofolio...*