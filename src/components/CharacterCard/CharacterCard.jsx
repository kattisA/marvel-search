import React from 'react';
import { Card, Image } from 'semantic-ui-react';

function CharacterCard({ character }) {
    return (
        <Card className="centered">
            <Image src={character.thumbnail.path + '.' + character.thumbnail.extension} />
            <Card.Content>
                <Card.Header>{character.name}</Card.Header>
                <Card.Description>{character.description}</Card.Description>
            </Card.Content>
        </Card>
    );
}

export default CharacterCard;
