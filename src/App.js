import React from 'react';
import './App.css';
import {useState} from "react";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import SearchBar from "./components/SearchBar/SearchBar";
import {Card, Grid, Image} from "semantic-ui-react";
import blackWidow from "./img/black_widow.jpg";
import captainAmerica from "./img/captain_america.jpg";
import hulk from "./img/hulk.jpg";
import ironman from "./img/ironman.jpg";
import mystique from "./img/mystique.jpg";
import scarlet from "./img/scarlet.jpg";



function App() {

  const [characters, setCharacters] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const timestamp = '1675961395';
  const apiKey = '824b4f2bb67a85e638a19888121bd05a';
  const hashKey = 'd32f224fb3ad8c01de9db005300f1ef6';

  const heroesList = [
    {
      id: 1,
      name: "Scarlet Witch",
      image: scarlet,
      description: "Scarlet Witch harnessed probability manipulation for personal gain, then mastered reality-altering magic through training."
    },
    {
      id: 2,
      name: "Black Widow",
      image: blackWidow,
      description: "Natasha Romanoff, the Black Widow, started as an evil agent but now fights for good with stealth and precision."
    },
    {
      id: 3,
      name: "Mystique",
      image: mystique,
      description: "Mystique is a mutant shapeshifter with blue skin, red hair, and yellow eyes, able to mimic anyone with precision."
    },
    {
      id: 4,
      name: "Ironman",
      image: ironman,
      description: "Wounded and captured, Tony Stark builds a life-saving suit of armor, transforming into Iron Man to protect the world."
    },
    {
      id: 5,
      name: "Captain America",
      image: captainAmerica,
      description: "Steve Rogers becomes Captain America after taking a super soldier serum, defending freedom for over 60 years."
    },
    {
      id: 6,
      name: "Hulk",
      image: hulk,
      description: "Dr. Bruce Banner transforms into the Hulk after a gamma bomb explosion, gaining strength with anger."
    },

  ]


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
        <div className="ui container">
          <h1 className="ui dividing header centered">Marvel Search</h1>
          {/*Section for computer and tablet*/}
          <div className="ui grid computer only tablet only">
            <div className="eight wide column">
              <div className="featured-heroes">
                <h2 className="ui header ">Featured Heroes</h2>
                <Grid stackable columns={3}>
                  {heroesList.map((character, index) => (
                      <Grid.Column key={character.id}>
                        <Card className="centered">
                          <Image src={character.image} alt={"Thumbnail for " + character.name} />
                          <Card.Content>
                            <Card.Header>{character.name}</Card.Header>
                            <Card.Description>{character.description}</Card.Description>
                          </Card.Content>
                        </Card>
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
          {/*Section for mobile*/}
          <div className="ui stackable grid mobile only"> {/* Add "stackable" class to make columns stack on mobile view */}
            <div className="sixteen wide column"> {/* Make the search box take the full width on mobile view */}
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
            <div className="sixteen wide column">
              <div className="featured-heroes">
                <h2 className="ui header ">Featured Heroes</h2>
                <Grid stackable columns={3}>
                  {heroesList.map((character, index) => (
                      <Grid.Column key={character.id}>
                        <Card className="centered">
                          <Image src={character.image} alt={"Thumbnail for " + character.name} />
                          <Card.Content>
                            <Card.Header>{character.name}</Card.Header>
                            <Card.Description>{character.description}</Card.Description>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}

export default App;
