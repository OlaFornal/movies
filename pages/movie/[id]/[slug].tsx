import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Collapse, Grid, Text, Link, Spacer, Row, Col, Input } from '@nextui-org/react';
import { getMovieDetails } from "../../../dataProvider/TheMovieDB/movieDetails";
import { GetServerSideProps } from "next/types";
import { MovieDetailsResponse } from "../../../types/tmdb.movieDetails.types";
import Image from 'next/image'
import React from "react";
import { Search } from "react-iconly";
import { getMovieReviews } from '../../../dataProvider/TheMovieDB/movieReviews';
import { MovieReviewsResponse } from '../../../types/tmdb.movieReviews.types';
import styles from '../../../styles/Home.module.css';
import { ReviewItem } from '../../../components/ReviewItem/ReviewItem';
interface MovieDetailProps {
    movieDetails: MovieDetailsResponse,
    movieReviews: MovieReviewsResponse
}

const MovieDetails: NextPage<MovieDetailProps> = ({ movieDetails, movieReviews }) => {
    const coverImage = movieDetails.result && movieDetails.result.poster_path ? (process.env.NEXT_PUBLIC_MOVIE_DB_ASSETS_URL + movieDetails.result.poster_path) : '/images/no-image.svg';
    return (
        <div className={styles.container}>
            <Head>
                <title>Movies browser</title>
            </Head>

            <Container xl display="flex" direction="column" justify="center" alignItems="center"
                style={{ height: '100px' }}>
                <Row>
                    <Col>
                        <Link href="/">
                            <Text h2
                                css={{ textGradient: '45deg, $purple500 -20%, $pink500 100%' }}
                                weight="bold"
                            >
                                Movie browser
                            </Text>
                        </Link>
                    </Col>
                    <Col css={{ ta: 'right' }}>
                        <Input
                            id={'mainSearch'}
                            status={'default'}
                            clearable
                            bordered
                            color="secondary"
                            contentRight={<Search primaryColor={"currentColor"} />}
                            placeholder="Search for movie title..."
                            aria-label={"Search"}
                        />
                    </Col>
                </Row>
            </Container>
            <Container style={{ height: '100%' }}>

                {movieDetails.result && <Grid.Container gap={1} css={{ diplay: "flex", direction: "column", flexWrap: "wrap-reverse" }}>
                    <Grid xs={12} sm={9} md={9} lg={9} xl={9}>
                        <Col>
                            <Text css={{ textGradient: '45deg, $purple500 -10%, $pink500 100%' }} h1>{movieDetails.result.title}</Text>
                            <Spacer y={0.3} />
                            <Row>
                                {movieDetails.result.genres.map((genre) =>
                                    <>
                                        <Text margin={5} h4 key={genre.id}>{genre.name}</Text>
                                        <Spacer x={0.} />
                                    </>
                                )}
                            </Row>
                            <Spacer y={0.1} />
                            <Text h5> {movieDetails.result.overview}</Text>
                            <Spacer y={2} />
                            <Text h5>Runtime: {movieDetails.result.runtime} minutes</Text>
                            <Text h5>Vote: {movieDetails.result.vote_average}</Text>
                            <Text h5>Relase date: {movieDetails.result.release_date}</Text>
                        </Col>
                    </Grid>
                    <Grid xs={12} sm={3} md={3} lg={3} xl={3} justify='center'>
                        <Image src={coverImage} width={'350px'} height={'550px'} alt={''} />
                    </Grid>
                </Grid.Container>}

                {movieDetails.errors &&
                    <Grid.Container>
                        <Row justify="center">
                            <strong>TheMovieDb API error</strong>: {movieDetails.errors}
                        </Row>
                    </Grid.Container>}

                    
                {movieReviews.results && <Collapse.Group><Grid.Container gap={2}>
                    {movieReviews.results.results.map((item) =>
                        <ReviewItem key={item.id} review={item} />
                    )}
                </Grid.Container></Collapse.Group>}
                
                {movieReviews.errors &&
                    <Container>
                        <Row justify="center">
                            <strong>TheMovieDb API error</strong>: {movieReviews.errors}
                        </Row>
                    </Container>}
            </Container>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: string = context.params && context.params.id ? context.params.id.toString() : '1';
    const movieDetails = await getMovieDetails(parseInt(id));
    const reviews = await getMovieReviews(parseInt(id));
    return {
        props: {
            movieDetails: movieDetails,
            movieReviews: reviews
        }
    }
}

export default MovieDetails