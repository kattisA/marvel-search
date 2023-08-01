import React from 'react';
import { Card, Image } from 'semantic-ui-react';

function CharacterCard({ imgSrc, name, description, urls }) {
    return (
        <Card className="centered">
            <Image src={imgSrc} alt={"Thumbnail for " + {name}} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>{description}</Card.Description>
                {urls && (
                    <a href={urls.find(url => url.type === 'comiclink')?.url} target="_blank" rel="noreferrer">Comic Link</a>
                )}
            </Card.Content>
        </Card>
    );
}

export default CharacterCard;
