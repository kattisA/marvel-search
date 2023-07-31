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
      description: "Scarlet Witch believed she used the ability to affect probabilities for a positive benefit to herself, though at times to imprecise outcomes. Later, she mastered the ability and began to understand it as a literal altering of reality.\n" +
          "\n" +
          "In addition, Wanda trained under other magicians and spellcasters to become proficient in magic-use, which manifests from incantations and spells."
    },
    {
      id: 2,
      name: "Black Widow",
      image: blackWidow,
      description: "Despite her origins as an agent of evil, Natasha Romanoff has become a force for good in the world of covert intelligence and super heroics. Like her namesake arachnid, Romanoff is stealthy, precise, and absolutely lethal. She is the Black Widow."
    },
    {
      id: 3,
      name: "Mystique",
      image: mystique,
      description: "A member of a subspecies of humanity known as mutants who are born with superhuman abilities, Mystique is a shapeshifter who can mimic the appearance and voice of any person with exquisite precision. Her natural appearance includes blue skin, red hair and yellow eyes."
    },
    {
      id: 4,
      name: "Ironman",
      image: ironman,
      description: "Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man."
    },
    {
      id: 5,
      name: "Captain America",
      image: captainAmerica,
      description: "Vowing to serve his country any way he could, young Steve Rogers took the super soldier serum to become America's one-man army. Fighting for the red, white and blue for over 60 years, Captain America is the living, breathing symbol of freedom and liberty."
    },
    {
      id: 6,
      name: "Hulk",
      image: hulk,
      description: "Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk. An all too often misunderstood hero, the angrier the Hulk gets, the stronger the Hulk gets."
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
          <div className="ui grid">
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
        </div>
      </div>

  );
}

export default App;
