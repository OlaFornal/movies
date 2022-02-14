import type {NextPage} from 'next'
import Head from 'next/head'
import {
    Container,
    Text,
    Link,
} from '@nextui-org/react';
import {getMovieDetails} from "../../../dataProvider/TheMovieDB/movieDetails";
import {GetServerSideProps} from "next/types";
import {MovieDetailsResponse} from "../../../types/tmdb.movieDetails.types";
import Image from 'next/image'

interface MovieDetailProps {
    movieDetails: MovieDetailsResponse;
}

const MovieDetails: NextPage<MovieDetailProps> = ({movieDetails}) => {
    const coverImage = movieDetails.result && movieDetails.result.poster_path ? (process.env.NEXT_PUBLIC_MOVIE_DB_ASSETS_URL + movieDetails.result.poster_path) : '/images/no-image.svg';

    return (
        <div>
            <Head>
                <title>Movies browser</title>
            </Head>

            <Container xl as="main" display="flex" direction="column" justify="flex-start" alignItems="center"
                       style={{height: '100px'}}>
                <Link href="/">
                    <Text h1 size={60}
                          css={{textGradient: '45deg, $purple500 -20%, $pink500 100%'}}
                          weight="bold"
                    >
                        Movie browser
                    </Text>
                </Link>
            </Container>
            {movieDetails.result && <Container>
                <Image src={coverImage} width={'500px'} height={'750px'} alt={''} />
                <Text h1>{movieDetails.result.title}</Text>
                <Text>{movieDetails.result.tagline}</Text>
                <Text>{movieDetails.result.overview}</Text>
            </Container>}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: string = context.params && context.params.id ? context.params.id.toString() : '1';
    const movieDetails = await getMovieDetails(parseInt(id));
    return {
        props: {
            movieDetails: movieDetails
        }
    }
}

export default MovieDetails
