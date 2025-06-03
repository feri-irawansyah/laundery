## 🧠 Alur Bisnis Aplikasi Laundery

### User Journey (Pelanggan)
- [x] Registrasi/Login
- [ ] Pelanggan buat akun / login.
- [ ] Order Laundry
- [ ] Pilih jenis layanan (cuci kering, setrika saja, ekspres, dll).
- [ ] Masukkan detail pakaian (jumlah, jenis).
- [ ] Pilih metode antar-jemput atau drop-off.
- [ ] Tentukan jadwal pengambilan/pengantaran.
- [ ] Estimasi harga langsung muncul.
- [ ] Konfirmasi order.
- [ ] Pembayaran
- [ ] Pilih metode pembayaran (cash, transfer, e-wallet).
- [ ] Konfirmasi pembayaran.
- [ ] Tracking Order
- [ ] Status order: Dijemput → Diproses → Selesai → Diantar.
- [ ] Review dan Riwayat
- [ ] Lihat histori order.
- [ ] Beri rating & ulasan.

### Admin Journey (Pengelola Laundery)
- [ ] Manajemen Order
- [ ] Lihat order masuk & status.
- [ ] Update status (diproses, selesai, diantar).
- [ ] Notifikasi ke customer.
- [ ] Manajemen Pelanggan
- [ ] Lihat data pelanggan & histori order mereka.
- [ ] Manajemen Harga & Layanan
- [ ] Tambah/edit jenis layanan (cuci, setrika, dll).
- [ ] Atur harga berdasarkan berat/jenis.
- [ ] Manajemen Kurir
- [ ] Assign kurir ke order.
- [ ] Tracking pengambilan/pengiriman.
- [ ] Laporan Keuangan
- [ ] Total order, omzet, pembayaran belum lunas.
- [ ] Ekspor laporan.

### Kurir Journey
- [ ] Login
- [ ] Lihat Jadwal Penjemputan & Pengantaran
- [ ] Update Status Order (Dijemput, Diantar)
- [ ] Scan QR/Order ID saat jemput/antar pakaian

## 🛠️ Fitur Utama Aplikasi Laundry
### Untuk Pelanggan:
- [ ] Registrasi/Login
- [ ] Buat order laundry
- [ ] Pilih layanan dan jadwal
- [ ] Estimasi harga otomatis
- [ ] Pembayaran online/offline
- [ ] Tracking status laundry
- [ ] Notifikasi (email/WA)
- [ ] Review & rating
- [ ] Riwayat order

### Untuk Admin:
- [ ] Dashboard order
- [ ] Update status order
- [ ] Manajemen layanan & harga
- [ ] Manajemen pelanggan
- [ ] Manajemen kurir
- [ ] Laporan transaksi

### Untuk Kurir:
- [ ] Login
- [ ] Daftar tugas (jemput/antar)
- [ ] Masukan berat pakaian
- [ ] Update status via mobile
- [ ] Scan barcode/QR order

## 🔧 Teknologi yang Bisa Dipakai
Komponen	Teknologi
- [ ] Backend	`Hono + Bun` => TypeScript/Javascript
- [ ] Frontend	`React (atau Next kalau butuh routing SSR)` => TypeScript/Javascript
- [ ] Database	`PostgreSQL / MongoDB`
- [ ] Auth	`JWT atau cookie session`
- [ ] File Storage	`Local / Cloudinary (untuk foto bukti)`
- [ ] Notification	`Email (SMTP) / WhatsApp API`
- [ ] Deployment	`Railway / Vercel / VPS`
