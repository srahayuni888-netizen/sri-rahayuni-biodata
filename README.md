# Website Biodata Diri — Sri Rahayuni

**🌐 Situs online:** https://srahayuni888-netizen.github.io/sri-rahayuni-biodata/
**📦 Repository:** https://github.com/srahayuni888-netizen/sri-rahayuni-biodata

Website biodata diri satu halaman (static) yang berfungsi sebagai **pelengkap Curriculum Vitae (CV)**.
Gaya: formal, profesional, dan mudah dibaca. Aksen warna berupa gradasi **abu-abu → pink muda** dengan
paduan warna komplemen **teal/ hijau-keabuan** agar tetap menarik namun tetap serius.

---

## Struktur Berkas

```
Default Project/
├── index.html              # Halaman utama (semua isi/data ada di sini)
├── README.md
└── assets/
    ├── CV-Sri-Rahayuni.pdf  # File CV siap kirim (hasil cetak dari tampilan ini)
    ├── css/style.css       # Seluruh tampilan + gaya cetak (PDF)
    ├── js/main.js          # Interaksi: tema, menu, scroll spy, salin no. HP, form
    └── img/
        ├── foto.jpg        # Foto profil  ← GANTI dengan foto Anda
        ├── foto.svg        # Placeholder (dipakai jika foto.jpg hilang)
        └── favicon.svg
```

## Cara Menjalankan

Buka `index.html` langsung di browser (Chrome/Edge/Firefox). Tidak perlu server atau instalasi apa pun.

Untuk mengunggah ke hosting (GitHub Pages / Netlify / cPanel):
1. Unggah seluruh folder apa adanya.
2. Untuk GitHub Pages: Settings → Pages → branch `main` → folder `/ (root)`.
3. Untuk domain sendiri: arahkan DNS ke hosting, lalu unggah ke folder `public_html`.

### Update website yang sudah online

```bash
git add -A
git commit -m "Deskripsi perubahan"
git push origin main
```
GitHub Pages otomatis membangun ulang situs dalam ±1 menit.

---

## Cara Mengubah Data

Semua data biodata berada di `index.html` di dalam `<section>` masing-masing.
Cari teks yang ditandai komentar `<!-- EDIT: ... -->` lalu ubah isinya.

| Data | Lokasi | Status |
|---|---|---|
| Nama, foto, kontak | `index.html` → bagian Hero | Sesuai permintaan |
| Pendidikan | `index.html` → bagian **Data Pribadi** | Sesuai permintaan |
| Tanggal lahir (16 Juli 2008) | `index.html` → bagian **Data Pribadi** | Sesuai permintaan |
| Email & telepon | `index.html` → bagian **Data Pribadi / Kontak** | Sesuai permintaan |
| Hobi (Memasak) | `index.html` → bagian **Data Pribadi** | Sesuai permintaan |
| Keahlian (Konfigurasi Mikrotik) | `index.html` → bagian **Keahlian** | Sesuai permintaan |
| Tempat lahir, jenis kelamin, agama, alamat, tahun sekolah | `index.html` → `<!-- EDIT -->` | Perlu dilengkapi |
| Contoh proyek, sertifikat, persentase skill | `index.html` → bagian **Proyek / Keahlian** | Contoh — ganti dengan milik Anda |

### Mengganti foto profil

- Simpan foto Anda (format JPG/PNG, rasio 1:1, minimal 400×400 px) ke `assets/img/`.
- Pada `index.html`, ubah baris:

```html
<img src="assets/img/foto.svg" ...>
```

menjadi:

```html
<img src="assets/img/foto.jpg" ...>
```

> Foto otomatis kembali ke placeholder bila file tidak ditemukan.

---

## Fitur

- **Tombol "Unduh CV (PDF)"** — mengunduh file PDF siap kirim: `assets/CV-Sri-Rahayuni.pdf` (4 halaman A4).
  Tersedia juga tautan **"cetak langsung dari browser"** yang membuka dialog cetak (pilih *Save as PDF*);
  gaya `@media print` khusus sudah disiapkan agar hasilnya rapi.
- **Tema terang & gelap** — tombol bulan/matahari di kanan atas, pilihan tersimpan di browser.
- **Navigasi mulus** dengan penanda menu aktif (*scroll spy*) dan indikator progres scroll.
- **Tombol salin nomor telepon**.
- **Formulir kontak** yang langsung membuka aplikasi email (tanpa server/backend).
- **Responsif** untuk HP, tablet, dan desktop.
- **Ramah cetak** — gaya `@media print` khusus untuk menghasilkan dokumen CV.

---

## Menyesuaikan Warna

Semua warna terkumpul di bagian `:root` pada `assets/css/style.css`:

```css
--slate-800: #2f2f38;   /* abu tua   */
--rose-300:  #ecb0c1;   /* pink muda */
--rose-500:  #cd6d8a;   /* pink aksen */
--teal-500:  #3a9387;   /* warna komplemen */
```

Ubah nilai di atas, seluruh halaman (termasuk versi cetak) ikut menyesuaikan.

---

## Catatan

- Formulir kontak membuka `mailto:` sehingga tetap berfungsi tanpa hosting.
- Data pribadi sensitif (NIK, nomor KTP) sengaja tidak disertakan.
- Sebelum dikirim ke perusahaan, periksa kembali kolom bertanda `<!-- EDIT -->`.
