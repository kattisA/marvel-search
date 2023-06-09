import React from 'react';
import {Button} from "semantic-ui-react";

function SearchBar({ searchValue, setSearchValue, handleSearch }) {
    return (
        <div className="ui two column centered grid">
            <div className="ui input">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Type to search..."
                />
                <Button className="ui button" onClick={handleSearch}>
                    Search
                </Button>
            </div>
        </div>

    );
}

export default SearchBar;