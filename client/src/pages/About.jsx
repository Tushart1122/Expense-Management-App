
import React from "react";
const About = () => {
  return (
    <div className="container mt-5 p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">About Us</h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        Welcome to <span className="font-semibold text-blue-500">FinTrack</span> — your personal
        assistant for managing and tracking expenses effortlessly.
      </p>
      <p className="text-gray-700 text-md leading-relaxed mb-3">
        Our mission is to help individuals and businesses gain complete visibility into their
        financial activities, track spending habits, and make smarter budgeting decisions.
      </p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Track income & expenses by category</li>
        <li>Visualize data through intuitive charts</li>
        <li>Get personalized insights & analytics</li>
        <li>Secure and easy-to-use interface</li>
      </ul>
      <p className="text-gray-700 text-md">
        Whether you're saving for a goal or keeping your business on track,{" "}
        <span className="font-semibold text-blue-500">FinTrack</span> makes financial tracking
        simpler, smarter, and more powerful.
      </p>
    </div>
  );
};

export default About;


