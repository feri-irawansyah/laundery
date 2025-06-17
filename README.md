# 🧠 Alur Bisnis Aplikasi Laundry
<table>
<tr>
<td style="vertical-align:top; width: 50%">

## 🔥 Progress Web Api

### 👤 User Journey (Pelanggan)
- [x] Registrasi  
- [x] Aktivasi pake OTP  
- [x] Login  
- [ ] Order Laundry  
- [x] Pilih jenis layanan (cuci kering, setrika saja, ekspres, dll)  
- [ ] Masukkan detail pakaian (jumlah, jenis)  
- [ ] Pilih metode antar-jemput atau drop-off  
- [ ] Tentukan jadwal pengambilan/pengantaran  
- [ ] Estimasi harga langsung muncul  
- [ ] Konfirmasi order  
- [ ] Pembayaran  
- [ ] Pilih metode pembayaran (cash, transfer, e-wallet)  
- [ ] Konfirmasi pembayaran  
- [ ] Tracking Order  
- [ ] Status order: Dijemput → Diproses → Selesai → Diantar  
- [ ] Review dan Riwayat  
- [ ] Lihat histori order  
- [ ] Beri rating & ulasan  
- [x] Forget Password  
- [x] Change Password  

### 🧑‍💼 Admin Journey (Pengelola Laundry)
- [ ] Manajemen Order  
- [ ] Lihat order masuk & status  
- [ ] Update status (diproses, selesai, diantar)  
- [ ] Notifikasi ke customer  
- [ ] Manajemen Pelanggan  
- [ ] Lihat data pelanggan & histori order mereka  
- [ ] Manajemen Harga & Layanan  
- [ ] Tambah/edit jenis layanan (cuci, setrika, dll)  
- [ ] Atur harga berdasarkan berat/jenis  
- [ ] Manajemen Kurir  
- [ ] Assign kurir ke order  
- [ ] Tracking pengambilan/pengiriman  
- [ ] Laporan Keuangan  
- [ ] Total order, omzet, pembayaran belum lunas  
- [ ] Ekspor laporan  

### 🚚 Kurir Journey
- [ ] Login  
- [ ] Lihat Jadwal Penjemputan & Pengantaran  
- [ ] Update Status Order (Dijemput, Diantar)  
- [ ] Scan QR/Order ID saat jemput/antar pakaian  

## 🛠️ Fitur Utama Aplikasi Laundry

### 👤 Untuk Pelanggan:
- [x] Registrasi/Login  
- [ ] Buat order laundry  
- [ ] Pilih layanan dan jadwal  
- [ ] Estimasi harga otomatis  
- [ ] Pembayaran online/offline  
- [ ] Tracking status laundry  
- [ ] Notifikasi (email/WA)  
- [ ] Review & rating  
- [ ] Riwayat order  

### 🧑‍💼 Untuk Admin:
- [ ] Dashboard order  
- [ ] Update status order  
- [ ] Manajemen layanan & harga  
- [ ] Manajemen pelanggan  
- [ ] Manajemen kurir  
- [ ] Laporan transaksi  

### 🚚 Untuk Kurir:
- [ ] Login  
- [ ] Daftar tugas (jemput/antar)  
- [ ] Masukan berat pakaian  
- [ ] Update status via mobile  
- [ ] Scan barcode/QR order  

</td>
<td style="vertical-align:top; width: 50%">

## 📺 Progress Frontend

### 👤 User Journey (Pelanggan)
- [ ] Registrasi  
- [ ] Aktivasi pake OTP  
- [ ] Login  
- [ ] Order Laundry  
- [ ] Pilih jenis layanan (cuci kering, setrika saja, ekspres, dll)  
- [ ] Masukkan detail pakaian (jumlah, jenis)  
- [ ] Pilih metode antar-jemput atau drop-off  
- [ ] Tentukan jadwal pengambilan/pengantaran  
- [ ] Estimasi harga langsung muncul  
- [ ] Konfirmasi order  
- [ ] Pembayaran  
- [ ] Pilih metode pembayaran (cash, transfer, e-wallet)  
- [ ] Konfirmasi pembayaran  
- [ ] Tracking Order  
- [ ] Status order: Dijemput → Diproses → Selesai → Diantar  
- [ ] Review dan Riwayat  
- [ ] Lihat histori order  
- [ ] Beri rating & ulasan  
- [ ] Forget Password  
- [ ] Change Password  

### 🧑‍💼 Admin Journey (Pengelola Laundry)
- [ ] Manajemen Order  
- [ ] Lihat order masuk & status  
- [ ] Update status (diproses, selesai, diantar)  
- [ ] Notifikasi ke customer  
- [ ] Manajemen Pelanggan  
- [ ] Lihat data pelanggan & histori order mereka  
- [ ] Manajemen Harga & Layanan  
- [ ] Tambah/edit jenis layanan (cuci, setrika, dll)  
- [ ] Atur harga berdasarkan berat/jenis  
- [ ] Manajemen Kurir  
- [ ] Assign kurir ke order  
- [ ] Tracking pengambilan/pengiriman  
- [ ] Laporan Keuangan  
- [ ] Total order, omzet, pembayaran belum lunas  
- [ ] Ekspor laporan  

### 🚚 Kurir Journey
- [ ] Login  
- [ ] Lihat Jadwal Penjemputan & Pengantaran  
- [ ] Update Status Order (Dijemput, Diantar)  
- [ ] Scan QR/Order ID saat jemput/antar pakaian  

## 🛠️ Fitur Utama Aplikasi Laundry

### 👤 Untuk Pelanggan:
- [ ] Registrasi/Login  
- [ ] Buat order laundry  
- [ ] Pilih layanan dan jadwal  
- [ ] Estimasi harga otomatis  
- [ ] Pembayaran online/offline  
- [ ] Tracking status laundry  
- [ ] Notifikasi (email/WA)  
- [ ] Review & rating  
- [ ] Riwayat order  

### 🧑‍💼 Untuk Admin:
- [ ] Dashboard order  
- [ ] Update status order  
- [ ] Manajemen layanan & harga  
- [ ] Manajemen pelanggan  
- [ ] Manajemen kurir  
- [ ] Laporan transaksi  

### 🚚 Untuk Kurir:
- [ ] Login  
- [ ] Daftar tugas (jemput/antar)  
- [ ] Masukan berat pakaian  
- [ ] Update status via mobile  
- [ ] Scan barcode/QR order  

</td>
</tr>
</table>

<center>
  ## 🔧 Teknologi yang Bisa Dipakai

| Komponen       | Teknologi                                 |
|----------------|--------------------------------------------|
| Backend        | `Hono + Bun` (TypeScript/JavaScript)       |
| Frontend       | `React / Next.js`                          |
| Database       | `PostgreSQL / MongoDB`                     |
| Auth           | `JWT / Cookie Session`                     |
| File Storage   | `Local / Cloudinary (untuk foto bukti)`    |
| Notification   | `Email (SMTP) / WhatsApp API`              |
| Deployment     | `Railway / Vercel / VPS`                   |
</center>
