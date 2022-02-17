import type {GetStaticProps,NextPage} from 'next'
import Head from 'next/head'
import debounce from 'lodash.debounce';
import styles from '../styles/Home.module.css'
import {Container, Button, Input, Grid, Text, Link, Row, Loading, FormElement} from '@nextui-org/react';
import {Search} from "react-iconly";
import {
    fetchMovies, MovieListEndpoints

} from "../dataProvider/TheMovieDB/movieList";
import {MovieTile} from "../components/MovieTile/MovieTile";
import React, {useMemo, useState} from "react";
import {getMovieSearchResults, paginateMovies} from "../dataProvider/InternalApi";
import {MovieListResponse} from "../types/tmdb.movieList.types";
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
    const [movies, setMovies] = useState<MovieListResponse>(props.popular);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const updateSearchResults = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if (query.length > 0) {
            setLoading(true);
            setActiveTab('search');
            setMovies(await getMovieSearchResults(query));
            setLoading(false);
            setPage(1);
        } else {
            setActiveTab('popular');
            setMovies(props.popular);
        }
    }

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setMovies(props[tab]);
        setPage(1);
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

    const handlePageChange = async (page: number): Promise<void> => {
        setMovies(await paginateMovies(activeTab, page));
        setPage(page);
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
                                onClick={() => handleTabChange(tab)}
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

            {loading &&
            <Container>
                <Row justify="center">
                    <Loading color="secondary" type="points-opacity" size="xl" />
                </Row>
            </Container>}

            {movies.errors &&
            <Container display="flex" direction="column" justify="flex-start" alignItems="center" style={{height: '100px'}}>
                <Row justify="center">
                    <strong>TheMovieDb API error</strong>: {movies.errors}
                </Row>
            </Container>}

            {movies.results &&
            <>
                <Grid.Container gap={2} justify="center">
                    {movies.results.results.map((singleMovie) =>
                        <MovieTile key={singleMovie.id} movie={singleMovie}/>
                    )}
                </Grid.Container>

                <PaginationSection currentPage={page} totalPages={movies.results.total_pages} onPageChange={handlePageChange}/>
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
