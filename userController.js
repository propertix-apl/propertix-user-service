import { getUserProfile, updateUserProfile } from './db.js';

// Handler untuk mendapatkan profil pengguna
const getUserProfileHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const userProfile = await getUserProfile(id);
      if (!userProfile) {
        return res.status(404).json({ message: 'Profil pengguna tidak ditemukan' });
      }
      res.status(200).json(userProfile);
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
        const updatedUserProfile = await updateUserProfile(id, fullName, address, phoneNumber);
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