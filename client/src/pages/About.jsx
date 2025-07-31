import React from "react";

const features = [
  {
    title: "Data Visualization",
    description: "Interactive charts and graphs to simplify your financial insights.",
  },
  {
    title: "Secure & Trusted",
    description: "Built with top-notch security protocols to protect your data.",
  },
  {
    title: "Smart Insights",
    description: "Personalized tips and analytics to help you manage money smarter.",
  },
  {
    title: "Designed for Everyone",
    description: "Whether personal or business use, FinTrack fits seamlessly into your life.",
  },
];

const About = () => {
  return (
    <main className="about-main">
      <section className="about-section-center">
        <h1 className="about-title">
          About <span className="highlight">FinTrack</span>
        </h1>
        <p className="about-lead">
          Your ultimate companion for effortless expense management, budgeting, and financial clarity.
        </p>
      </section>

      <section className="about-grid">
        <div className="about-text-col">
          <h2>Our Mission</h2>
          <p>
            We empower individuals and businesses to take control of their finances by providing an intuitive, secure, and intelligent platform. With <span className="font-semibold text-blue-600">FinTrack</span>, managing money is no longer stressful but insightful and rewarding.
          </p>
          <p>
            Track your expenses, visualize your spending trends, set achievable budgets, and make confident financial decisions, all in one place.
          </p>
        </div>

        <div className="about-img-col">
          <img
            src="/myimage.jpg"
            alt="Financial Management Illustration"
            loading="lazy"
          />
        </div>
      </section>

      <section>
        <h2 className="features-title">Why Choose FinTrack?</h2>
        <ul className="features-list">
          {features.map(({ title, description }) => (
            <li key={title} className="feature-card">
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default About;
