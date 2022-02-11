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
import {getTopRatedMovies, MovieDbResponse, MovieInterface, searchMovies} from "../dataProvider/MovieDbProvider";
import {MovieTile} from "../components/MovieTile";
import React, {useCallback, useState} from "react";
import {getMovieSearchResults} from "../dataProvider/InternalApi";
import axios from "axios";

interface HomeProps {
    initialMovies: MovieInterface[]|null;
    initialError: string|null;
}

// const fetcher1: Fetcher<string, MovieDbResponse> = (query) => getUserById(query);

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home: NextPage<HomeProps> = ({initialMovies, initialError}) => {

    const[query, setQuery] = useState('');
    const[movies, setMovies] = useState(initialMovies);
    const[error, setError] = useState(initialError);



    const onUserSearchInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if(query.length > 0) {
            const searchResult = await getMovieSearchResults(query);
            setMovies(searchResult.data ?? null);
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
                        icon={<Search set="curved" primaryColor="currentColor" />}
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
                    <MovieTile key={singleMovie.id} movie={singleMovie} />
                )}
            </Grid.Container>}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const topRatedResponse: MovieDbResponse = await getTopRatedMovies();
    return {
        props: {
            initialMovies: topRatedResponse.data ?? null,
            initialError: topRatedResponse.error ?? null,
        }
    }

};

export default Home
