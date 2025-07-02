import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Simulate sending
    console.log("Form submitted:", formData);

    // Show popup
    setShowPopup(true);

    // Clear form
    setFormData({ name: "", email: "", message: "" });

    // Hide popup after 3.5s
    setTimeout(() => setShowPopup(false), 3500);
  };

  return (
    <div className="contact-container">
      {/* Toast Popup */}
      {showPopup && (
        <div className="toast-popup">
          ✅ Your message has been sent to the company!
        </div>
      )}

      <style>{`
        .toast-popup {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #16a34a;
          color: #fff;
          padding: 12px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          font-weight: 600;
          z-index: 1000;
          animation: fadeInOut 3.5s ease forwards;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          10% { opacity: 1; transform: translateX(-50%) translateY(0); }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }

        .contact-container {
          max-width: 1000px;
          margin: 3rem auto;
          padding: 2rem;
          background-color: #f9fafb;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          font-family: 'Segoe UI', sans-serif;
          color: #1f2937;
        }

        .contact-title {
          font-size: 2.25rem;
          text-align: center;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .contact-subtext {
          text-align: center;
          color: #6b7280;
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .contact-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
        }

        .contact-form {
          flex: 1 1 320px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-form input,
        .contact-form textarea {
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          transition: border-color 0.3s;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .contact-form button {
          background: #2563eb;
          color: white;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .contact-form button:hover {
          background: #1d4ed8;
        }

        .contact-info {
          flex: 1 1 280px;
          background: #e0f2fe;
          padding: 1.5rem;
          border-radius: 12px;
          font-size: 1rem;
          line-height: 1.6;
          color: #1e293b;
        }

        .contact-info h4 {
          margin-bottom: 1rem;
          font-size: 1.25rem;
          color: #0369a1;
        }

        @media (max-width: 768px) {
          .contact-content {
            flex-direction: column;
          }

          .contact-container {
            padding: 1.5rem 1rem;
          }

          .contact-form button {
            width: 100%;
          }
        }
      `}</style>

      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtext">
        We'd love to hear from you! Fill out the form or reach us directly.
      </p>

      <div className="contact-content">
        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <h4>Contact Information</h4>
          <p><strong>Email:</strong> support@expenses.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> 123 Expense Lane, Mumbai, India</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
