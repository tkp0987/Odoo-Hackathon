import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [skillsOffered, setSkillsOffered] = useState(["Graphic Design", "Video Editing"]);
  const [skillsWanted, setSkillsWanted] = useState(["Python", "JavaScript"]);
  const [availability, setAvailability] = useState("weekends");
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [newWantedSkill, setNewWantedSkill] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(URL.createObjectURL(file));
  };

  const handleSave = () => {
    alert("Profile saved!");
  };

  const handleDiscard = () => {
    window.location.reload();
  };

  return (
    <div>
      <h2>User Profile</h2>

      <button onClick={handleSave}>Save</button>
      <button onClick={handleDiscard}>Discard</button>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/swap")}>Swap Request</button>

      <hr />

      <p>Name:</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <p>Location:</p>
      <input value={location} onChange={(e) => setLocation(e.target.value)} />

      <p>Skills Offered:</p>
      {skillsOffered.map((skill, i) => (
        <div key={i}>
          {skill} <button onClick={() => setSkillsOffered(skillsOffered.filter(s => s !== skill))}>x</button>
        </div>
      ))}
      <input
        placeholder="Add skill"
        value={newOfferedSkill}
        onChange={(e) => setNewOfferedSkill(e.target.value)}
      />
      <button onClick={() => {
        if (newOfferedSkill.trim()) {
          setSkillsOffered([...skillsOffered, newOfferedSkill.trim()]);
          setNewOfferedSkill("");
        }
      }}>Add</button>

      <p>Skills Wanted:</p>
      {skillsWanted.map((skill, i) => (
        <div key={i}>
          {skill} <button onClick={() => setSkillsWanted(skillsWanted.filter(s => s !== skill))}>x</button>
        </div>
      ))}
      <input
        placeholder="Add skill"
        value={newWantedSkill}
        onChange={(e) => setNewWantedSkill(e.target.value)}
      />
      <button onClick={() => {
        if (newWantedSkill.trim()) {
          setSkillsWanted([...skillsWanted, newWantedSkill.trim()]);
          setNewWantedSkill("");
        }
      }}>Add</button>

      <p>Availability:</p>
      <input value={availability} onChange={(e) => setAvailability(e.target.value)} />

      <p>Profile Visibility:</p>
      <select value={profileVisibility} onChange={(e) => setProfileVisibility(e.target.value)}>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select>

      <p>Profile Photo:</p>
      <div>
        {profilePhoto && <img src={profilePhoto} alt="Profile" width="100" />}
        <br />
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        <br />
        <button onClick={() => setProfilePhoto(null)}>Remove Photo</button>
      </div>
    </div>
  );
}

export default UserProfile;
