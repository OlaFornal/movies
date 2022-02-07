import type {GetStaticProps, GetStaticPropsResult, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
    Container,
    Button,
    Input,
    Grid,
    Card,
    Col,
    Spacer,
    Text,
    Link, Row
} from '@nextui-org/react';
import {Search} from "react-iconly";
import {getTopRatedMovies, MovieDbResponse, MovieInterface} from "../dataProvider/MovieDbProvider";
import {MovieTile} from "../components/MovieTile";

interface HomeProps {
    movies: MovieInterface[];
    error: string|null;
}

const Home: NextPage<HomeProps> = ({movies, error}) => {
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
            movies: topRatedResponse.data,
            error: topRatedResponse.error,
        }
    }

};

export default Home
