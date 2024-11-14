import React, { useState, useEffect } from 'react';
import './App.css'; // For main styling
import axios from 'axios';
import Button from '../src/components/Button'; // Import the Button component
import Loading from '../src/components/Loading'; // Import the Loading component
import UserCard from '../src/components/UserCard'; // Import the UserCard component
import './components/Button.css'; // Import Button styles

function App() {
  const [userData, setUserData] = useState(null);
  const [activeUser, setActiveUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]); // State for favorites list

  useEffect(() => {
    // Retrieve favorites from local storage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleClick = () => {
    setLoading(true);
    axios.get('https://randomuser.me/api/')
      .then(response => {
        setUserData(response.data.results[0]); // Set the first user from the results
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      })
      .finally(() => {
        setLoading(false);
        setActiveUser(true);
      });
  };

  const toggleFavorites = () => {
    setShowFavorites(prev => !prev);
  };

  return (
    <div className="app-container">
      <h1>Random User Generator</h1>
      <Button isActive={activeUser} clicked={handleClick} />
      {loading ? (
        <Loading />
      ) : (
        activeUser && userData && (
          <UserCard
            name={`${userData.name.first} ${userData.name.last}`}
            email={userData.email}
            avatar={userData.picture.large}
            bio={userData.location.city}
          />
        )
      )}
      <button onClick={toggleFavorites} className="btn">
        {showFavorites ? 'Hide Favorites List' : 'Show Favorites List'}
      </button>
      {showFavorites && (
        <div className="favorites-list">
          {favorites.length > 0 ? (
            favorites.map((user, index) => (
            <div className='user' key={index}>
              <p>{user}</p>
            </div>
            ))
          ) : (
            <p>No favorites added yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
