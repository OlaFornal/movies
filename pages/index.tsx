import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import debounce from 'lodash.debounce';
import styles from '../styles/Home.module.css'
import {Container, Card, Button, Input, Grid, Text, Link, Row, Loading, FormElement} from '@nextui-org/react';
import {Search} from "react-iconly";
import {
    fetchMovies, MovieListEndpoints

} from "../dataProvider/TheMovieDB/movieList";
import {MovieTile} from "../components/MovieTile/MovieTile";
import React, {useMemo, useState} from "react";
import {getMovieSearchResults, paginateMovies} from "../dataProvider/InternalApi";
import {ErrorResponse, MovieListResponse, MovieListSuccessResponse} from "../types/tmdb.movieList.types";
import {PaginationSection} from "../components/Pagination/PaginationSection";

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
    const [movies, setMovies] = useState<MovieListSuccessResponse | undefined>(props.popular.results);
    const [errors, setErrors] = useState<ErrorResponse | undefined>(props.popular.errors);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');

    const updateResultState = (response: MovieListResponse) => {
        if (response.errors) {
            setErrors(response.errors);
        } else {
            setMovies(response.results);
        }
    }

    const updateSearchResults = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setQuery(query.toString())
        if (query.length > 0) {
            setLoading(true);
            setActiveTab('search');
            await getMovieSearchResults(query).then((resonse) => updateResultState(resonse));
            setLoading(false);
            setPage(1);
        } else {
            setActiveTab('popular');
            setMovies(props.popular.results);
        }
    }

    const handleSearchClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setActiveTab('popular');
        setMovies(props.popular.results);
    }
    const handleSearchFocus = async (event: React.FocusEvent<FormElement>) => {
        if (event.target.value) {
            setActiveTab('search');
            await getMovieSearchResults(event.target.value).then((resonse) => updateResultState(resonse));
        }
    }

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setMovies(props[tab].results);
        setPage(1);
    }

    const handlePageChange = async (selectedPage: number): Promise<void> => {
        selectedPage = Math.max(selectedPage, 1);
        setPage(selectedPage);
        await paginateMovies(activeTab, selectedPage, query).then((resonse) => updateResultState(resonse));
    }

    const debouncedUserInput = useMemo(() => {
        return debounce(updateSearchResults, 500)
    }, [movies]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Movies browser</title>
            </Head>

            <Container className={'header'} xl as="main" display="flex" direction="column" justify="flex-start" alignItems="center"
                       style={{height: '100px'}}>
                <Link href="/">
                    <Text h1 className={styles.title} size={60}
                          css={{textGradient: '45deg, $purple500 -20%, $pink500 100%'}}
                          weight="bold"
                    >
                        Movie browser
                    </Text>
                </Link>
            </Container>

            <Grid.Container gap={1} justify="center" className={'mainMenu'} >
                {Object.keys(HomeTabs).map((tab) => {
                    if (tab === 'search') {
                        return <Grid key={tab} xs={12} className={'mainMenuItem'}>
                            <Input
                                id={'mainSearch'}
                                onInput={debouncedUserInput}
                                onFocus={handleSearchFocus}
                                onClearClick={handleSearchClear}
                                status={tab === activeTab ? 'secondary' : 'default'}
                                clearable
                                bordered={tab !== activeTab}
                                width="100%"
                                color="secondary"
                                contentRight={<Search primaryColor={"currentColor"}/>}
                                placeholder="Search for movie title..."
                                aria-label={"Search"}
                            />
                        </Grid>
                    } else {
                        return <Grid key={tab} xs={12} sm={6} md={3} className={'mainMenuItem'}>
                            <Button
                                onClick={() => handleTabChange(tab)}
                                ghost={tab !== activeTab}
                                color="secondary"
                                auto
                                css={{w: '100%'}}
                            >
                                {(HomeTabs as HomeTabInterface)[tab]}
                            </Button>
                        </Grid>
                    }
                })}
            </Grid.Container>

            {loading &&
            <Container>
                <Row justify="center">
                    <Loading color="secondary" type="points-opacity" size="xl"/>
                </Row>
            </Container>}

            {errors &&
            <Grid.Container gap={1}>
                <Grid xs={12}>
                    <Card color={'error'}>
                        <Text css={{fontWeight: '$bold', color: '$white'}}>
                            TheMovieDb API error [{errors.status_code}]: {errors.status_message}
                        </Text>
                    </Card>
                </Grid>
            </Grid.Container>}

            {movies &&
            <>
                <Grid.Container gap={2} justify="center">
                    {movies.results.map((singleMovie) =>
                        <MovieTile key={singleMovie.id} movie={singleMovie}/>
                    )}
                </Grid.Container>
                {movies.total_pages > 1 &&
                <PaginationSection currentPage={page} totalPages={movies.total_pages}
                                   onPageChange={handlePageChange}/>
                }
            </>}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            topRated: await fetchMovies(MovieListEndpoints.topRated),
            popular: await fetchMovies(MovieListEndpoints.popular),
            upcoming: await fetchMovies(MovieListEndpoints.upcoming),
            trending: await fetchMovies(MovieListEndpoints.trending),
        }
    }
};

export default Home
