import React, {useState} from 'react';
import {Button} from "semantic-ui-react";

function SearchBar({ searchValue, setSearchValue, handleSearch }) {
    const [searchMessage, setSearchMessage] = useState(false);

    const onSearchChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        setSearchMessage(value !== '');
    };

    const onSearchButton = () => {
        setSearchMessage(searchValue !== '');
        handleSearch();
    }

    return (
        <div className="ui two column centered grid">
            <div className="column">
                <div className="ui input">
                    <input
                        type="text"
                        aria-label="search bar"
                        value={searchValue}
                        onChange={onSearchChange}
                        placeholder="Type to search..."
                    />
                    <Button className="ui button" onClick={onSearchButton}>
                        Search
                    </Button>
                </div>
                <div className="searchMessageBox">
                    {searchMessage && <p className="searchMessage">Search results for {searchValue}</p>}
                </div>
            </div>
        </div>


    );
}

export default SearchBar;