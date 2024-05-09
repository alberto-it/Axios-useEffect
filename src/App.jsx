import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [detailIsLoading, setDetailIsLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const [characterDetails, setCharacterDetails] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=Iron&ts=1&apikey=db3dfe058530ceec4499dfbb6435e687&hash=f86bd8309673411e99b776bbb4cfd6dc');
      setData(response.data.data.results);
    } catch (error) {
      console.error(error); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleCharacterClick = (character) => {
    console.log("Clicked character:", character);
    setSelectedCharacter(character);
    setDetailIsLoading(true);
    setDetailError(null); 
  };

  const fetchCharacterDetails = async (characterId) => {
    setDetailIsLoading(true);
    setDetailError(null);
    try {
      const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=1&apikey=db3dfe058530ceec4499dfbb6435e687&hash=f86bd8309673411e99b776bbb4cfd6dc`;
      const response = await axios.get(url);
      setCharacterDetails(response.data.data.results[0]); 
    } catch (error) {
      console.error(error); 
      setDetailError(error);
    } finally {
      setDetailIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCharacter) {
      fetchCharacterDetails(selectedCharacter.id);
    }
  }, [selectedCharacter]); 

  const detailStyle = {
    flex: 1,
  };
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}> 
      <CharacterList characters={data} onCharacterClick={handleCharacterClick} />
      {selectedCharacter && characterDetails && (
        <CharacterDetail
          selectedCharacter={selectedCharacter}
          isLoading={detailIsLoading}
          error={detailError}
        />
      )}
    </div>
  );
  
}

export default App;
