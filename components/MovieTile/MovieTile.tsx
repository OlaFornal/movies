import React from "react";
import {Container, Card, Col, Grid, Row, Text, Link, Progress} from "@nextui-org/react";
import {MovieListInterface} from "../../types/tmdb.movieList.types";
import styles from './MovieTile.module.scss';
import slugify from "slugify";

interface MovieProps {
    movie: MovieListInterface
}

export const MovieTile: React.FC<MovieProps> = ({movie}) => {
    const coverImage = movie.poster_path ? (process.env.NEXT_PUBLIC_MOVIE_DB_ASSETS_URL + movie.poster_path) : '/images/no-image.png';
    const slug = slugify(movie.title, {lower: true, strict: true});

    return (
        <Grid xs={6} sm={4} md={3} lg={3} xl={2}>
            <Link href={`movie/${movie.id}/${slug}`}>
                <Card css={{w: '100%', aspectRatio: '15 / 25'}} className={styles.hoverable} hoverable clickable>
                    <Card.Body css={{ p: 0 }}>
                        <Card.Image
                            src={coverImage}
                            height={'90%'}
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
                                <Col span={2} css={{ ta: 'center' }}>
                                    <Text css={{w: '100%'}} color="#000">{movie.vote_average}</Text>
                                    <Progress size="xs" animated={false} value={movie.vote_average * 10} color="secondary" />
                                </Col>
                            </Row>
                            <Row className={styles.showOnHover}>
                                <Col span={12}>
                                    <Text color="#000" size={12}>{movie.overview ? movie.overview.substring(0, 80) : ''}...</Text>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Footer>
                </Card>
            </Link>
        </Grid>
    );
}
