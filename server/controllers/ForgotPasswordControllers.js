const crypto = require("crypto");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Security: don't reveal if user exists or not
      return res.json({
        message:
          "If that email is registered, password reset instructions will be sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set reset token and expiry (1 hour)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600 * 1000; // 1 hour from now
    await user.save();

    // Frontend reset password URL (make sure this route exists in frontend)
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email message
    const message = {
      from: `"FinTrack Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Instructions",
      html: `
        <p>Hello,</p>
        <p>You requested to reset your password for FinTrack.</p>
        <p>Please click the link below to reset your password. The link will expire in 1 hour.</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you did not request this, you can ignore this email.</p>
        <p>Thank you,<br/>FinTrack Team</p>
      `,
    };

    await transporter.sendMail(message);

    res.json({
      message: "Password reset instructions sent to your email!",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = forgotPasswordController;
