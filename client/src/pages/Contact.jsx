import React, { useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowPopup(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setShowPopup(false), 3500);
  };

  return (
    <div className="contact-container">
      {/* Toast Notification */}
      {showPopup && (
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className="toast-popup"
        >
          <CheckCircleOutlined className="toast-icon" />
          <span>Message sent successfully!</span>
        </div>
      )}

      <header className="contact-header">
        <h2>Get in Touch</h2>
        <p>
          We'd love to hear from you. Fill out the form below or use the contact
          details on the right.
        </p>
      </header>

      <div className="contact-layout">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <FloatingInput
            label="Your Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FloatingInput
            label="Your Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FloatingTextarea
            label="Your Message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
        </form>

        {/* Contact Info Sidebar */}
        <aside className="contact-info">
          <h3>Contact Information</h3>

          <div className="contact-info-item">
            <MailOutlined className="contact-info-icon" />
            <a href="mailto:support@expenses.com" tabIndex={0}>
              support@expenses.com
            </a>
          </div>

          <div className="contact-info-item">
            <PhoneOutlined className="contact-info-icon" />
            <a href="tel:+919876543210" tabIndex={0}>
              +91 98765 43210
            </a>
          </div>

          <div className="contact-info-item">
            <EnvironmentOutlined className="contact-info-icon" />
            <address className="not-italic">123 Expense Lane, Mumbai, India</address>
          </div>
        </aside>
      </div>

      {/* CSS styles */}
      <style>{`
        /* Container */
        /* Updated Contact Page CSS to match About.jsx style */
.contact-container {
  max-width: 1200px;
  margin: 60px auto 80px;
  padding: 64px 48px;
  background: linear-gradient(to right, #eff6ff, #dbeafe);
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1e3a8a;
}

.toast-popup {
  top: 40px;
  padding: 14px 28px;
  border-radius: 14px;
  font-size: 1rem;
  background: #10b981;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.5);
  color: white;
}

.contact-header {
  text-align: center;
  margin-bottom: 48px;
}

.contact-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e40af;
  margin-bottom: 12px;
}

.contact-header p {
  font-size: 1.125rem;
  color: #1e3a8a;
  font-weight: 500;
  max-width: 700px;
  margin: 0 auto;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.floating-label-container {
  position: relative;
}

.floating-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #475569;
  font-size: 1rem;
  font-weight: 500;
  pointer-events: none;
  background-color: transparent;
  transition: all 0.2s ease;
}

input.floating-input,
textarea.floating-textarea {
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: none;
  background: #f1f5f9;
  font-size: 1rem;
  color: #0f172a;
  font-family: inherit;
}

input.filled + label,
input:focus + label,
textarea.filled + label,
textarea:focus + label {
  top: -10px;
  left: 12px;
  font-size: 0.75rem;
  background: #dbeafe;
  padding: 0 6px;
  color: #1e3a8a;
}

.contact-submit-btn {
  background: linear-gradient(to right, #3b82f6, #60a5fa);
  padding: 14px 36px;
  font-weight: 700;
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;
}

.contact-submit-btn:hover {
  background: linear-gradient(to right, #2563eb, #3b82f6);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.5);
}

.contact-info {
  background: white;
  padding: 36px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #1e3a8a;
}

.contact-info h3 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1d4ed8;
}

.contact-info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 10px;
}

.contact-info-item:last-child {
  border-bottom: none;
}

.contact-info-item a {
  color: #1d4ed8;
  font-weight: 600;
  text-decoration: none;
}

.contact-info-item a:hover {
  text-decoration: underline;
}

.contact-info-icon {
  font-size: 1.4rem;
  color: #2563eb;
}

@media (max-width: 768px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }

  .contact-submit-btn {
    width: 100%;
  }
}

      `}</style>
    </div>
  );
};

// FloatingInput Component
const FloatingInput = ({ label, name, type, value, onChange, required }) => (
  <div className="floating-label-container">
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={`floating-input ${value ? "filled" : ""}`}
      placeholder=" "
      aria-label={label}
      aria-required={required}
      autoComplete="off"
    />
    <label htmlFor={name} className="floating-label">
      {label}
    </label>
  </div>
);

// FloatingTextarea Component
const FloatingTextarea = ({ label, name, rows, value, onChange, required }) => (
  <div className="floating-label-container">
    <textarea
      id={name}
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      required={required}
      className={`floating-textarea ${value ? "filled" : ""}`}
      placeholder=" "
      aria-label={label}
      aria-required={required}
    />
    <label htmlFor={name} className="floating-label">
      {label}
    </label>
  </div>
);

export default Contact;
