import React from 'react';
import { Card, Image } from 'semantic-ui-react';

function CharacterCard({ character }) {
    return (
        <Card className="centered">
            <Image src={character.thumbnail.path + '.' + character.thumbnail.extension} alt={"Thumbnail for " + character.name} />
            <Card.Content>
                <Card.Header>{character.name}</Card.Header>
                <Card.Description>{character.description}</Card.Description>
                {character.urls && (
                    <a href={character.urls.find(url => url.type === 'comiclink')?.url} target="_blank" rel="noreferrer">Comic Link</a>
                )}
            </Card.Content>
        </Card>
    );
}

export default CharacterCard;
