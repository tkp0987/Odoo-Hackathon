import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function PublicProfile() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const user = state?.user;

  if (!user) {
    return <p>User not found. Please go back.</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <img src={user.photo} alt="Profile" width="150" />
      <p><strong>Skills Offered:</strong> {user.skillsOffered.join(", ")}</p>
      <p><strong>Skills Wanted:</strong> {user.skillsWanted.join(", ")}</p>
      <p><strong>Availability:</strong> {user.availability}</p>
      <p><strong>Rating:</strong> {user.rating} ⭐</p>
      <button onClick={() => navigate(-1)}>← Back</button>
      <button
  onClick={() =>
    navigate("/request", {
      state: {
        targetUser: user,
        currentUser: {
          name: "You", 
          skillsOffered: ["Python", "Photoshop"], 
        }
      }
    })
  }
>
  Request
</button>

    </div>
  );
}

export default PublicProfile;
