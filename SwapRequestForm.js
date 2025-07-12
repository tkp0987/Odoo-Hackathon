import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SwapRequestForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { targetUser, currentUser } = state || {};

  const [yourSkill, setYourSkill] = useState("");
  const [theirSkill, setTheirSkill] = useState("");
  const [message, setMessage] = useState("");

  if (!targetUser || !currentUser) {
    return <p>Missing swap request info. Please go back.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      to: targetUser.name,
      skillOffered: yourSkill,
      skillWanted: theirSkill,
      message: message,
      status: "Pending",
    };

  
    const existingRequests = JSON.parse(localStorage.getItem("applications")) || [];
    const updatedRequests = [...existingRequests, newRequest];
    localStorage.setItem("applications", JSON.stringify(updatedRequests));
    
    navigate("/application-status");
  };

  return (
    <div>
      <h2>Send Request to {targetUser.name}</h2>

      <form onSubmit={handleSubmit}>
        <label>Your Skill:</label><br />
        <select value={yourSkill} onChange={(e) => setYourSkill(e.target.value)} required>
          <option value="">-- Select --</option>
          {currentUser.skillsOffered.map((skill, i) => (
            <option key={i} value={skill}>{skill}</option>
          ))}
        </select>

        <br /><br />

        <label>Skill You Want From Them:</label><br />
        <select value={theirSkill} onChange={(e) => setTheirSkill(e.target.value)} required>
          <option value="">-- Select --</option>
          {targetUser.skillsWanted.map((skill, i) => (
            <option key={i} value={skill}>{skill}</option>
          ))}
        </select>

        <br /><br />

        <label>Message:</label><br />
        <textarea
          rows="4"
          cols="40"
          placeholder="Say something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <br /><br />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default SwapRequestForm;
