# Gunakan image Node.js versi terbaru sebagai base image
FROM node:latest

# Set working directory di dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependensi yang diperlukan
RUN npm install

# Salin seluruh kode proyek ke dalam container
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 3002

# Command untuk menjalankan aplikasi ketika container dijalankan
CMD ["npm", "start"]
