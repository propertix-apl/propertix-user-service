import redisClient from './redisConfig.js';
import { getUserProfile, updateUserProfile } from './db.js';

// Handler untuk mendapatkan profil pengguna
const getUserProfileHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const userProfile = await redisClient.get(id);
      if (userProfile) {
        // Jika data ditemukan di cache
        return res.status(200).json({
          fromCache: true,
          data: JSON.parse(userProfile)
        });
      } else {
        // Jika data tidak ditemukan di cache, ambil dari database
        const userProfileFromDb = await getUserProfile(id);
        if (!userProfileFromDb) {
          return res.status(404).json({ message: 'Profil pengguna tidak ditemukan' });
        }
        // Simpan data ke cache
        redisClient.setEx(id, 3600, JSON.stringify(userProfileFromDb)); // Cache untuk 1 jam
        res.status(200).json({
          fromCache: false,
          data: userProfileFromDb
        });
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil profil pengguna' });
    }
};

// Handler untuk memperbarui profil pengguna
const updateUserProfileHandler = async (req, res) => {
    const { id } = req.params;
    const { fullName, address, phoneNumber } = req.body;
    try {
        await updateUserProfile(id, fullName, address, phoneNumber);
        res.status(200).json({ message: 'Profil pengguna berhasil disimpan' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam memperbarui profil pengguna' });
    }
};

export {
    getUserProfileHandler,
    updateUserProfileHandler,
};