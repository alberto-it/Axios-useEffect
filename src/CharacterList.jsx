import React from 'react';

const CharacterList = ({ characters, onCharacterClick }) => {
  return (
    <div>
      {characters.map((character) => (
        <div>
          <h3>{character.name}</h3>
          <img
            src={character.thumbnail.path + '.' + character.thumbnail.extension}
            alt={character.name}
            style={{ width: '350px' }}
            onClick={() => onCharacterClick(character)}
          /><p>___________________________________________</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;