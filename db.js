import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();
// String koneksi PostgreSQL
const connectionString = process.env.CONN_URL;

// Parse string koneksi menjadi objek parameter
const params = new URL(connectionString);

const pool = new Pool({
  user: params.username,
  host: params.hostname,
  database: params.pathname.split('/')[1], // Mengambil bagian path setelah hostname sebagai nama database
  password: params.password,
  port: params.port,
  ssl: { rejectUnauthorized: false } // Tambahkan opsi SSL jika diperlukan (misalnya, untuk koneksi ke cloud)
});

// Fungsi untuk mengeksekusi kueri ke basis data
const query = async (text, params) => {
    try {
      const start = Date.now();
      const result = await pool.query(text, params);
      const duration = Date.now() - start;
      console.log('Executed query:', { text, duration, rows: result.rowCount });
      return result.rows[0];
    } catch (error) {
      console.error('Error executing query:', { text, params, error });
      throw error;
    }
  };
  
  // Fungsi untuk mendapatkan profil pengguna berdasarkan ID
const getUserProfile = async (userId) => {
    const text = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];
    return query(text, values);
};
  
// Fungsi untuk memperbarui profil pengguna
const updateUserProfile = async (userId, fullName, address, phoneNumber) => {
    const text = `
      UPDATE users
      SET full_name = $2, address = $3, phone_number = $4
      WHERE id = $1
      RETURNING *;
    `;
    const values = [userId, fullName, address, phoneNumber];
    return query(text, values);
  };

export {
  query,
  getUserProfile,
  updateUserProfile,
};
