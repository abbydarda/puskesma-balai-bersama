# Datacakra - Abby Darda Damarullah

Ini adalah API untuk test backend developer Datacakra.

# Dokumentasi

1. Ini dokumentasi [Postman](https://documenter.getpostman.com/view/3704595/2s9Y5Ww3Bf)
2. Ini desain [ERD](https://dbdocs.io/darda.abby/puskesma-balai-bersama)
3. Ini live demo [puskesmas-balai-bersama](https://puskesmas-balai-bersama.onrender.com)

## Instalasi

1. Clone repositori ini ke direktori lokal Anda:

   ```bash
   git clone git@github.com:abbydarda/puskesmas-balai-bersama.git
   ```

2. Masuk ke direktori proyek:

   ```bash
   cd puskesmas-balai-bersama
   ```

3. Buat file `.env` untuk production atau `.env.development` untuk tahap development dan isi dengan konfigurasi yang sesuai:

   ```bash
   touch .env
   ```

   Contoh isi file `.env`:

   ```
   APP_PORT=3000
   APP_URL=http://localhost:3000
   DB_URI=postgres://username:password@localhost:5432/dbname
   DB_SYNCHRONIZE=true
   JWT_SECRET=super-secret
   JWT_EXP=1d
   ```

4. Jalankan proses seeder

```bash
# production
npm run seed

# production seed refresh
npm run seed:refresh

# development
NODE_ENV=development npm run seed

# development seed refresh
NODE_ENV=development npm run seed:refresh

```

4. Jalankan aplikasi

```bash
# Development
npm run start

# Watch
npm run start:dev

# Debug
npm run start:debug

# Production
npm run start:prod

```

Aplikasi akan berjalan di `http://localhost:3000`
