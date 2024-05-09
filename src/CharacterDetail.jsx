import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const CharacterDetail = ({ selectedCharacter, isLoading, error }) => {
  const [characterDetails, setCharacterDetails] = useState(null);

  useEffect(() => {
    if (selectedCharacter) {
      const fetchData = async () => {
        setCharacterDetails(null); 
        const url = `https://gateway.marvel.com:443/v1/public/characters/${selectedCharacter.id}?ts=1&apikey=db3dfe058530ceec4499dfbb6435e687&hash=f86bd8309673411e99b776bbb4cfd6dc`;
        try {
          const response = await axios.get(url);
          setCharacterDetails(response.data.data.results[0]);
        } catch (error) {
          console.error(error); 
        }
      };

      fetchData();
    }
  }, [selectedCharacter]); 

  if (!characterDetails) {
    return <p>No character selected.</p>;
  }

  const comics = characterDetails.comics.items.map((comic) => comic.name);

  return (
    <div className="details">
      <div style={{ flex: 1 }}>
        <h2>{characterDetails.name}</h2>
        <p>{characterDetails.description}</p>
        <p>Comics: </p>
        {comics.map((comic) => <p key={comic}>{comic}</p>)} 
      </div>
    </div>
  );

};

export default CharacterDetail;
