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
    Link, Row, FormElement
} from '@nextui-org/react';
import {Search} from "react-iconly";
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies, getTrendingMovies, getUpcomingMovies
} from "../dataProvider/TheMovieDB/movieList";
import {MovieTile} from "../components/MovieTile/MovieTile";
import React, {useMemo, useState} from "react";
import {getMovieSearchResults} from "../dataProvider/InternalApi";
import {MovieListResponse} from "../types/tmdb.movieList.types";

interface HomeTabInterface {
    [index: string]: string;
}
enum HomeTabs {
    search = 'Search',
    popular = 'Most popular',
    trending = 'Trending',
    topRated = 'Top rated',
    upcoming = 'Upcoming',
}
interface HomePropInterface {
    [index: string]: MovieListResponse;
}

const Home: NextPage<HomePropInterface> = (props) => {
    const [activeTab, setActiveTab] = useState<string>('popular')
    const [movies, setMovies] = useState<MovieListResponse>(props.popular);

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

    const handleSearchClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setActiveTab('popular');
        setMovies(props.popular);
    }
    const handleSearchFocus = async (event: React.FocusEvent<FormElement>) => {
        if(event.target.value) {
            setActiveTab('search');
            setMovies(await getMovieSearchResults(event.target.value));
        }
    }

    const debouncedUserInput = useMemo(() => {
        return debounce(updateSearchResults, 500)
    }, [movies]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Movies browser</title>
            </Head>

            <Container xl as="main" display="flex" direction="column" justify="flex-start" alignItems="center" style={{height: '100px'}}>
                <Link href="/">
                    <Text h1 className={styles.title} size={60}
                          css={{textGradient: '45deg, $purple500 -20%, $pink500 100%'}}
                        weight="bold"
                    >
                        Movie browser
                    </Text>
                </Link>
            </Container>

            <Grid.Container gap={1} justify="center">
                { Object.keys(HomeTabs).map((tab) => {
                    if(tab === 'search') {
                        return <Grid key={tab} xs={12} >
                            <Input
                                id={'mainSearch'}
                                onInput={debouncedUserInput}
                                onFocus={handleSearchFocus}
                                onClearClick={handleSearchClear}
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
                        return <Grid key={tab} xs={12} sm={6} md={3} >
                            <Button
                                onClick={() => {setActiveTab(tab); setMovies(props[tab])}}
                                ghost={tab !== activeTab}
                                color="secondary"
                                auto
                                css={{w: '100%'}}
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
            upcoming: await getUpcomingMovies(),
            trending: await getTrendingMovies(),
        }
    }
};

export default Home
