import express from 'express';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await userModel.find({}, { password: 0 }); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
});

// Update a user's name or password
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, password } = req.body;

    try {
        const updates = {};
        if (name) updates.name = name; 
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); 
            updates.password = hashedPassword;
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, updates, { new: true, fields: { password: 0 } }); 
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'Failed to update user', error });
    }
});

//admin login
router.post("/login", (req, res) => {
  const { uname, pwd } = req.body;

  if (uname === "admin@gmail.com" && pwd === "admin") {
    return res.json({
      success: true,
      token: "admin-auth-token"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid admin credentials"
  });
});

export default router;
