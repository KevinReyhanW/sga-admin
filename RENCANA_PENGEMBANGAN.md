# Rencana Pengembangan Layanan SGA (Smart Guest Assistant)

Dokumen ini berisi rencana peningkatan fitur tampilan (frontend) agar aplikasi SGA bisa jadi alat bantu yang lebih canggih dan memudahkan admin hotel. Fokus utamanya adalah supaya kerja admin lebih cepat, layanan ke tamu lebih personal, dan semuanya terpantau dengan jelas.

---

## 📊 1. Analisis Data & Pantauan Operasional
*Bantu admin melihat data statistik dan tren untuk meningkatkan kualitas layanan hotel.*

### [SGA-ADM-01] Filter Data Harian & Kalender (DatePicker)
- **Fokus:** Tampilan dashboard otomatis menunjukkan data "Hari Ini". Ditambah fitur kalender untuk melihat data dari tanggal-tanggal sebelumnya.
- **Manfaat:** Admin bisa fokus ke kerjaan hari ini, tapi tetap gampang kalau mau cek performa atau laporan hari kemarin.

### [SGA-ADM-02] Perbandingan Performa Respon (Hari Ini vs Kemarin)
- **Fokus:** Update visual "Rata-rata Waktu Respon" supaya bisa bandingkan performa hari ini dengan kemarin secara langsung.
- **Manfaat:** Jadi tahu langsung apakah tim makin cepat atau malah melambat dibanding hari sebelumnya.

### [SGA-ADM-03] Pantauan Kinerja & Beban Kerja Staf
- **Fokus:** Halaman khusus untuk melihat staf mana yang paling cepat respon dan berapa banyak tugas yang mereka pegang.
- **Manfaat:** Bantu manajer bagi-bagi tugas supaya adil dan kasih penghargaan buat staf yang kerjanya paling oke.

---

## ⚡ 2. Manajemen Target & Kecepatan Layanan (SLA)
*Memastikan setiap permintaan tamu diproses cepat sebelum lewat batas waktu.*

### [SGA-SLA-01] Penanda Urgensi & Timer Hitung Mundur
- **Fokus:** Kasih warna khusus (misal merah untuk yang sudah lama) dan timer di setiap tugas yang masuk.
- **Manfaat:** Admin jadi tahu mana yang harus dikerjakan duluan supaya tamu nggak nunggu kelamaan.

### [SGA-SLA-02] Pusat Peringatan Real-Time (Suara & Notifikasi)
- **Fokus:** Notifikasi terpusat yang muncul otomatis dan ada suaranya kalau ada permintaan mendesak masuk.
- **Manfaat:** Admin nggak bakal kelewatan request tamu meskipun lagi sibuk buka halaman lain.

---

## 👤 3. Profil & Riwayat Lengkap Pengalaman Tamu
*Nggak cuma liat nomor kamar, tapi benar-benar kenal apa yang tamu suka.*

### [SGA-GRM-01] Riwayat Lengkap Pesanan & Layanan Tamu
- **Fokus:** Bikin tampilan riwayat pesanan (makanan atau layanan) per tamu secara lengkap di satu tempat.
- **Manfaat:** Admin bisa kasih layanan yang lebih personal karena tahu apa yang tamu suka pesan sebelumnya.

### [SGA-GRM-02] Sistem Rating & Feedback dari Tamu
- **Fokus:** Menampilkan bintang rating (1-5) dan komentar langsung dari tamu setelah tugas selesai dikerjakan.
- **Manfaat:** Admin langsung tahu kalau tamu puas atau ada yang perlu diperbaiki dari layanan Housekeeping/Room Service.

---

## 🛠️ 4. Kontrol Alur Kerja Tingkat Lanjut
*Bikin operasional hotel yang rumit jadi lebih simpel buat admin.*

### [SGA-WKF-01] Tombol Filter Status Tugas di Dashboard
- **Fokus:** Tambahkan tombol filter (Pending, In-Progress, Selesai) langsung di kartu-kartu dashboard.
- **Manfaat:** Admin bisa langsung hilangkan tugas yang sudah selesai dari pandangan dan fokus ke yang masih butuh dikerjakan.

### [SGA-WKF-02] Sistem Pengumuman (Broadcast) ke Tamu
- **Fokus:** Fitur buat admin kirim pesan massal ke semua tamu atau lantai tertentu (misal: "Lift lagi diperbaiki" atau "Kolam renang tutup").
- **Manfaat:** Komunikasi jadi lebih cepat dan tamu nggak bingung kalau ada update mendadak di hotel.

### [SGA-WKF-03] Pantauan Stok Barang (Mini-Inventory)
- **Fokus:** Kasih tanda kalau ada stok barang di Room Service yang mulai habis.
- **Manfaat:** Tamu nggak bakal kecewa karena pesan barang yang ternyata kosong, dan tim dapur bisa langsung restock.

---

## 💎 UX & Tampilan Masa Depan
- **Dark/Light Mode:** Biar mata admin nggak capek, terutama yang kerja shift malam.
- **Optimistic UI:** Dibikin supaya aplikasi terasa sangat cepat saat admin ganti-ganti status tugas.
