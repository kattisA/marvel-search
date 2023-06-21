import React, { useState, useEffect } from 'react';
import {Grid} from "semantic-ui-react";

function PredefinedSearches({ searchValue, setSearchValue, handleSearch }) {
    const predefinedSearches = [
        "Abomination (Emil Blonsky)",
        "Black Widow",
        "Hulk",
        "Iron Man",
        "Scarlet Witch"
    ];

    const handlePredefinedSearch = (searchValue) => {
        setSearchValue(searchValue);
    };

    useEffect(() => {
        handleSearch();
    }, [searchValue, handleSearch]);

    return (
        <div className="predefinedSearches">
            <h3>Predefined Searches:</h3>
            <Grid columns={3} stackable>
                {predefinedSearches.map((searchValue) => (
                    <Grid.Column key={searchValue}>
                        <div className="buttonContainer">
                            <button
                                className="ui button"
                                onClick={() => handlePredefinedSearch(searchValue)}
                            >
                                {searchValue}
                            </button>
                        </div>
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
}

export default PredefinedSearches;
