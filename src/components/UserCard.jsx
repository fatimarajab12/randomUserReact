
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa'; // Import the favorite icon
import './UserCard.css'; // Import CSS file for styling

import { useEffect } from 'react'; // Import useEffect hook for local storage

const UserCard = ({ name, email, avatar, bio }) => {
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the icon is favorited
  useEffect(() => {
    // Load favorites from local storage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(savedFavorites.includes(email)); // Use email to uniquely identify user
    console.log(savedFavorites);
  }, [email]);
  
  // Save favorites to local storage when favorite state changes

  
  // Toggle favorite state when the favorite icon is clicked
  // Use localStorage to persist the favorite state across page refreshes
  
  const toggleFavorite = () => {
    setIsFavorite(prevState => {
      const newFavoriteState = !prevState;
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const updatedFavorites = newFavoriteState
        ? [...savedFavorites, email]
        : savedFavorites.filter(item => item !== email);

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

     

      return newFavoriteState;
    });
  };
  
  return (
    <div className="user-card">
      <img src={avatar} alt={`${name}'s avatar`} className="user-card-avatar" />
      <div className="user-card-details">
        <h2 className="user-card-name">{name}</h2>
        <p className="user-card-email">{email}</p>
        <p className="user-card-bio">{bio}</p>
        <div className="user-card-favorite" onClick={toggleFavorite}>
          <FaHeart
            size={24}
            className={`favorite-icon ${isFavorite ? 'favorited' : ''}`}
            color={isFavorite ? '  #007bff' : '#000000'} // Color changes based on state
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
