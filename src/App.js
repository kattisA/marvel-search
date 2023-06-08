import React from 'react';
import './App.css';
import {useState} from "react";
import {Button, Container} from "semantic-ui-react";

function App() {

  const [characters, setCharacters] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchCharacter = async (searchValue) => {
    const url= `https://gateway.marvel.com:443/v1/public/characters?name=${searchValue}&ts=1675961395&apikey=824b4f2bb67a85e638a19888121bd05a&hash=d32f224fb3ad8c01de9db005300f1ef6`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.data.results) {
      setCharacters(responseJson.data.results);
    }

    console.log(characters)
  }

  const handleSearch = () => {
    fetchCharacter(searchValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div >
          <input
              className="form-control"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Type to search..."
          />
          <Button onClick={handleSearch} primary>
            Search
          </Button>
        </div>
          {characters?.map((character, index) => (
              <Container key={character.id}>
                  <div>
                      <div className="ui card">
                          <div className="content">
                              <p className="header">{character.name}</p>
                              <div className="meta">
                                  <span className="date">Joined in 2013</span>
                              </div>
                              <div className="description">
                                  {character.description}
                              </div>
                          </div>
                          <div className="extra content">
                              {/*<a>
                       <i className="user icon"></i>
                       22 Friends
                   </a>*/}
                          </div>
                      </div>
                  </div>
              </Container>
          ))

          }

      </header>
    </div>
  );
}

export default App;
