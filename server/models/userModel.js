const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required and should be unique'],
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    // Add these two fields for password reset functionality
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
