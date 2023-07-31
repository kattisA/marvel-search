import React, {useEffect} from 'react';
import './App.css';
import {useState} from "react";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import SearchBar from "./components/SearchBar/SearchBar";
import {Grid} from "semantic-ui-react";


function App() {

  const [characters, setCharacters] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [featuredCharacters, setFeaturedCharacters] = useState([]);
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

  useEffect(() => {
    const fetchFeaturedCharacters = async () => {
      try {
        const featuredHeroes = ['Black Widow', 'Scarlet Witch', 'Mystique', 'Hulk', 'Iron Man', 'Captain America'];
        const featuredCharacterUrls = featuredHeroes.map(hero =>
            `https://gateway.marvel.com:443/v1/public/characters?name=${hero}&ts=${timestamp}&apikey=${apiKey}&hash=${hashKey}`
        );

        const responses = await Promise.all(featuredCharacterUrls.map(url => fetch(url)));
        const charactersJson = await Promise.all(responses.map(response => response.json()));

        const featuredCharactersData = charactersJson.map(json => json.data.results[0]);
        setFeaturedCharacters(featuredCharactersData);
      } catch (error) {
        console.error('An error occurred while fetching featured characters:', error);
      }
    };

    fetchFeaturedCharacters();
  }, []);

  const handleSearch = () => {
    setErrorMessage('');
    fetchCharacter(searchValue);
    setShowAlert(false);
  };

  return (
      <div className="App">
        <div className="ui container">
          <h1 className="ui dividing header centered">Marvel Search</h1>
          <div className="ui grid">
            <div className="eight wide column">
              <div className="featured-heroes">
                <h2 className="ui header ">Featured Heroes</h2>
                <Grid stackable columns={3}>
                  {featuredCharacters.map((character, index) => (
                      <Grid.Column key={character.id}>
                        <CharacterCard character={character} />
                      </Grid.Column>
                  ))}
                </Grid>
              </div>
            </div>
            <div className="eight wide column">
              <div className="ui container searchBox">
                <h2 className="ui header ">Search</h2>
                <SearchBar
                    handleSearch={handleSearch}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                {showAlert && (
                    <div className="ui info message">No results found for the search query.</div>
                )}
                {errorMessage && <div className="ui info message">{errorMessage}</div>}
                {characters?.map((character, index) => (
                    <CharacterCard character={character} key={character.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}

export default App;
