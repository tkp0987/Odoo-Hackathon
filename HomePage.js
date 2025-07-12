import React from "react";
import { useNavigate } from "react-router-dom";

const users = [
  {
    id: "marc-demo",
    name: "Marc Demo",
    photo: "https://via.placeholder.com/80",
    skillsOffered: ["C++", "Communication"],
    skillsWanted: ["Excel", "UI Design"],
    availability: "Weekends",
    rating: 3.5,
    profileVisibility: "Public",
  },
  {
    id: "michell",
    name: "Michell",
    photo: "https://via.placeholder.com/80",
    skillsOffered: ["Java", "Public Speaking"],
    skillsWanted: ["Graphic Design"],
    availability: "Evenings",
    rating: 2.8,
    profileVisibility: "Private",
  },
  {
    id: "joe-wills",
    name: "Joe Wills",
    photo: "https://via.placeholder.com/80",
    skillsOffered: ["Photography"],
    skillsWanted: ["Video Editing", "Audio Design"],
    availability: "Weekends",
    rating: 4.0,
    profileVisibility: "Public",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const publicUsers = users.filter(user => user.profileVisibility === "Public");

  const goToProfile = (user) => {
    navigate(`/user/${user.id}`, { state: { user } });
  };

  return (
    <div>
      {/* Navbar */}
      <div>
        <h2 style={{ display: "inline-block" }}>Skill Swap Platform</h2>
        <button
          style={{ float: "right", marginTop: "10px" }}
          onClick={() => navigate("/profile")}
        >
          👤
        </button>
      </div>

      <hr />

      <div>
        <input type="text" placeholder="Search skill..." />
        <select>
          <option>All Availabilities</option>
          <option>Weekends</option>
          <option>Evenings</option>
        </select>
      </div>

      <br />
      {publicUsers.map((user, index) => (
        <div
          key={index}
          onClick={() => goToProfile(user)}
          style={{ cursor: "pointer", borderBottom: "1px solid #aaa", paddingBottom: "10px", marginBottom: "10px" }}
        >
          <img src={user.photo} alt="Profile" width="80" />
          <div>
            <h3>{user.name}</h3>
            <p><strong>Skills Offered:</strong> {user.skillsOffered.join(", ")}</p>
            <p><strong>Skills Wanted:</strong> {user.skillsWanted.join(", ")}</p>
            <p><strong>Availability:</strong> {user.availability}</p>
            <p><strong>Rating:</strong> {user.rating} ⭐</p>
          </div>
        </div>
      ))}
    </div>
  );
}

