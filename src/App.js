import React from 'react';
import './App.css';
import {useState} from "react";
import {Button, Card, Image} from "semantic-ui-react";


function App() {

  const [characters, setCharacters] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const timestamp = '1675961395';
  const apiKey = '824b4f2bb67a85e638a19888121bd05a';
  const hashKey = 'd32f224fb3ad8c01de9db005300f1ef6';

  const fetchCharacter = async (searchValue) => {
    try {
      const url = `https://gateway.marvel.com:443/v1/public/characters?name=${searchValue}&ts=${timestamp}&apikey=${apiKey}&hash=${hashKey}`;

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.data && responseJson.data.results && responseJson.data.results.length > 0) {
        setCharacters(responseJson.data.results);
        setShowAlert(false);
      } else {
        setCharacters([]);
        setShowAlert(true);
      }
    } catch (error) {
      setErrorMessage('An error has occurred while searching for the character');
      setCharacters([]);
    }

  }

  const handleSearch = () => {
    setErrorMessage('');
    fetchCharacter(searchValue);
    setShowAlert(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="ui input" >
          <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Type to search..."
          />
          <Button onClick={handleSearch} primary>
            Search
          </Button>
        </div>
        {showAlert && <div className="message">No results found for the search query.</div>}
        {errorMessage && <div className="message">{errorMessage}</div>}
          {characters?.map((character, index) => (
              <Card key={character.id}>
                <Image src={character.thumbnail.path + "." + character.thumbnail.extension}/>
                <Card.Content>
                  <Card.Header>{character.name}</Card.Header>
                  <Card.Description>
                    {character.description}
                  </Card.Description>
                </Card.Content>
                {/*<Card.Content extra>

                </Card.Content>*/}
              </Card>
          ))

          }

      </header>
    </div>
  );
}

export default App;
