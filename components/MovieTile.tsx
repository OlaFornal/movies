import React from "react";
import {Button, Card, Col, Grid, Row, Text} from "@nextui-org/react";
import {MovieInterface} from "../dataPrivider/MovieDbProvider";

interface MovieProps {
    movie: MovieInterface
}

export const MovieTile: React.FC<MovieProps> = ({movie}) => {
    const coverImage = process.env.MOVIE_DB_ASSETS_URL + movie.backdrop_path;

    return (
        <Grid xs={12} sm={6} lg={4} xl={3}>
            <Card cover css={{w: '100%'}} hoverable clickable>
                <Card.Header css={{position: 'absolute', zIndex: 1, top: 5}}>
                    <Col>
                        <Text
                            size={12}
                            weight="bold"
                            transform="uppercase"
                            color="#ffffffAA"
                        >
                            New
                        </Text>
                        <Text h3 color="black">
                            {movie.title}
                        </Text>
                    </Col>
                </Card.Header>
                <Card.Body>
                    <Card.Image
                        src={coverImage}
                        height={400}
                        width="100%"
                        alt="Card example background"
                    />
                </Card.Body>
                <Card.Footer
                    blur
                    css={{
                        position: 'absolute',
                        bgBlur: '#ffffff',
                        borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                        bottom: 0,
                        zIndex: 1
                    }}
                >
                    <Row>
                        <Col>
                            <Text color="#000" size={12}>Available soon.</Text>
                            <Text color="#000" size={12}>Get notified.</Text>
                        </Col>
                        <Col>
                            <Row justify="flex-end">
                                <Button flat auto rounded color="secondary">
                                    <Text css={{color: 'inherit'}} size={12} weight="bold" transform="uppercase">
                                        Notify Me
                                    </Text>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    );
}
