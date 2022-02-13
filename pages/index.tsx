import type {GetStaticProps,NextPage} from 'next'
import Head from 'next/head'
import debounce from 'lodash.debounce';
import styles from '../styles/Home.module.css'
import {
    Container,
    Button,
    Input,
    Grid,
    Text,
    Link, Row
} from '@nextui-org/react';
import {Search} from "react-iconly";
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies, getTrendingMovies, getUpcomingMovies
} from "../dataProvider/TheMovieDB/movies";
import {MovieTile} from "../components/MovieTile";
import React, {useMemo, useState} from "react";
import {getMovieSearchResults} from "../dataProvider/InternalApi";
import {MoviesResponse} from "../types/tmdb.movies.types";

interface HomeTabInterface {
    [index: string]: string;
}
enum HomeTabs {
    popular = 'Most popular',
    trending = 'Trending',
    topRated = 'Top rated',
    nowPlaying = 'Now playing',
    upcoming = 'Upcoming',
    search = 'Search'
}
interface HomePropInterface {
    [index: string]: MoviesResponse;
}

const Home: NextPage<HomePropInterface> = (props) => {
    const [activeTab, setActiveTab] = useState<string>('popular')
    const [movies, setMovies] = useState<MoviesResponse>(props.popular);

    const updateSearchResults = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if (query.length > 0) {
            setActiveTab('search');
            setMovies(await getMovieSearchResults(query));
        } else {
            setActiveTab('popular');
            setMovies(props.popular);
        }
    }

    const debouncedUserInput = useMemo(() => {
        return debounce(updateSearchResults, 500)
    }, [setMovies]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Movies browser</title>
            </Head>

            <Container xl as="main" display="flex" direction="column" justify="center" alignItems="center" style={{height: '20vh'}}>
                <Link href="/">
                    <Text h1 className={styles.title} size={60} css={{
                            textGradient: '45deg, $purple500 -20%, $pink500 100%'
                        }}
                        weight="bold"
                    >
                        Movie browser
                    </Text>
                </Link>
            </Container>

            <Grid.Container gap={2} justify="center">
                { Object.keys(HomeTabs).map((tab) => {
                    if(tab === 'search') {
                        return <Grid key={tab} xs={6} md={2} >
                            <Input
                                id={'mainSearch'}
                                onInput={debouncedUserInput}
                                status={tab === activeTab ? 'secondary' : 'default' }
                                clearable
                                bordered={tab !== activeTab}
                                width="100%"
                                color="secondary"
                                contentRight={<Search primaryColor={"currentColor"} />}
                                placeholder="Search for movie title..."
                            />
                        </Grid>
                    } else {
                        return <Grid key={tab} xs={6} md={2} >
                            <Button
                                onClick={() => {setActiveTab(tab); setMovies(props[tab])}}
                                ghost={tab !== activeTab}
                                color="secondary" css={{w: '100%'}}
                            >
                                { (HomeTabs as HomeTabInterface)[tab] }
                            </Button>
                        </Grid>
                    }
                })}
            </Grid.Container>

            {movies.errors &&
            <Container>
                <Row justify="center">
                    <strong>TheMovieDb API error</strong>: {movies.errors}
                </Row>
            </Container>}

            {movies.results &&
            <Grid.Container gap={2} justify="center">
                {movies.results.results.map((singleMovie) =>
                    <MovieTile key={singleMovie.id} movie={singleMovie}/>
                )}
            </Grid.Container>}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            topRated:  await getTopRatedMovies(),
            popular: await getPopularMovies(),
            nowPlaying: await getNowPlayingMovies(),
            upcoming: await getUpcomingMovies(),
            trending: await getTrendingMovies(),
        }
    }
};

export default Home
