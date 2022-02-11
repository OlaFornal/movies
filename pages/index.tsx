import type {GetStaticProps, GetStaticPropsResult, NextPage} from 'next'
import Head from 'next/head'
import debounce from 'lodash.debounce';
import styles from '../styles/Home.module.css'
import {
    Container,
    Button,
    Input,
    Grid,
    Spacer,
    Text,
    Link, Row
} from '@nextui-org/react';
import {Search} from "react-iconly";
import {getTopRatedMovies} from "../dataProvider/TheMovieDB/movies";
import {MovieTile} from "../components/MovieTile";
import React, {useCallback, useState} from "react";
import {getMovieSearchResults} from "../dataProvider/InternalApi";
import {ErrorResponse, MoviesResponse, MoviesSuccessResponse} from "../types/tmdb.movies.types";

type HomeProps = {
    results: MoviesSuccessResponse | null,
    errors: ErrorResponse | null,
}

const Home: NextPage<HomeProps> = ({results, errors}) => {

    const [movies, setMovies] = useState(results ? results.results : null);
    const [error, setError] = useState(errors ? errors.status_message : null);

    const onUserSearchInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if (query.length > 0) {
            const searchResult = await getMovieSearchResults(query);
            setMovies(searchResult.results ? searchResult.results.results : null);
            setError(searchResult.errors ? searchResult.errors.status_message : null);
        }
    }

    const debouncedUserInput = useCallback(debounce(onUserSearchInput, 500), []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Movies browser</title>
                <meta
                    name="description"
                    content="Browse movies"
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Container
                xl
                as="main"
                display="flex"
                direction="column"
                justify="center"
                alignItems="center"
                style={{height: '20vh'}}
            >
                <Link href="https://nextjs.org">
                    <Text
                        h1
                        className={styles.title}
                        size={60}
                        css={{
                            textGradient: '45deg, $purple500 -20%, $pink500 100%'
                        }}
                        weight="bold"
                    >
                        Movie browser
                    </Text>
                </Link>
                <Spacer/>
                <Row justify="center" align="center">
                    <Input
                        id={'mainSearch'}
                        onInput={debouncedUserInput}
                        width="40vw"
                        clearable
                        contentRightStyling={false}
                        placeholder="Search for movie title..."
                    />
                    <Button
                        auto
                        color="gradient"
                        icon={<Search set="curved" primaryColor="currentColor"/>}
                    />
                </Row>
            </Container>
            {error && <Container>
                <Row justify="center">
                    <strong>TheMovieDb API error</strong>: {error}
                </Row>
            </Container>}
            {movies && <Grid.Container gap={2} justify="center">
                {movies.map((singleMovie) =>
                    <MovieTile key={singleMovie.id} movie={singleMovie}/>
                )}
            </Grid.Container>}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const topRatedResponse: MoviesResponse = await getTopRatedMovies();
    return {
        props: {
            results: topRatedResponse.results ?? null,
            errors: topRatedResponse.errors ?? null,
        }
    }
};

export default Home
