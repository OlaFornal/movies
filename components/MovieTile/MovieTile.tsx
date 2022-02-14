import React from "react";
import {Container, Button, Card, Col, Grid, Row, Text, Spacer, Link} from "@nextui-org/react";
import {MovieListInterface} from "../../types/tmdb.movieList.types";
import {ArrowRightSquare, Star} from "react-iconly";
import styles from './MovieTile.module.scss';
import slugify from "slugify";

interface MovieProps {
    movie: MovieListInterface
}

export const MovieTile: React.FC<MovieProps> = ({movie}) => {
    const coverImage = movie.poster_path ? (process.env.NEXT_PUBLIC_MOVIE_DB_ASSETS_URL + movie.poster_path) : '/images/no-image.svg';
    const slug = slugify(movie.title, {lower: true, strict: true});

    return (
        <Grid xs={6} sm={4} md={3} lg={3} xl={2}>
            <Link href={`movie/${movie.id}/${slug}`}>
                <Card cover css={{w: '100%', aspectRatio: '3 / 4'}} className={styles.hoverable} hoverable clickable>
                    {/*<Card.Header css={{position: 'absolute', zIndex: 1, top: 5}} className={styles.showOnHover}>*/}
                    {/*    <Col>*/}
                    {/*        <Text*/}
                    {/*            size={12}*/}
                    {/*            weight="bold"*/}
                    {/*            transform="uppercase"*/}
                    {/*            color="#ffffffAA"*/}
                    {/*        >*/}
                    {/*            New*/}
                    {/*        </Text>*/}
                    {/*        <Text h3 color="black">*/}
                    {/*            {movie.title}*/}
                    {/*        </Text>*/}
                    {/*    </Col>*/}
                    {/*</Card.Header>*/}
                    <Card.Body>
                        <Card.Image
                            src={coverImage}
                            height={'100%'}
                            width={'100%'}
                            alt=""
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
                        <Container gap={0}>
                            <Row align={'center'}>
                                <Col span={10}>
                                    <Text color="#000" size={16}>{movie.title}</Text>
                                </Col>
                                <Col span={2}>
                                    <Row align={'center'}>
                                        <Star size={'small'} set="broken" primaryColor="yellow"/>
                                        <Text css={{ml: '5px'}} color="#000">{movie.vote_average}</Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.showOnHover}>
                                <Col span={12}>
                                    <Text color="#000" size={12}>{movie.overview ? movie.overview.substring(0, 80) : ''}...</Text>
                                </Col>
                            </Row>
                            {/*<Row className={styles.showOnHover}>*/}
                            {/*    <Col span={12}>*/}
                            {/*        <Button flat auto color="secondary"*/}
                            {/*                icon={<ArrowRightSquare set="light" primaryColor="white" />}*/}
                            {/*        />*/}
                            {/*    </Col>*/}
                            {/*</Row>*/}
                        </Container>
                    </Card.Footer>
                </Card>
            </Link>
        </Grid>
    );
}
