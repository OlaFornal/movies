import type {NextApiRequest, NextApiResponse} from 'next'
import {MoviesResponse} from "../../../types/tmdb.movies.types";
import {fetchMovies} from "../../../dataProvider/TheMovieDB/movies";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MoviesResponse>
) {
    const {query} = req.query;
    return fetchMovies('search/movie', {params: {query: query.toString()}})
        .then((response: MoviesResponse) => res.status(200).json(response))
        .catch((error) => res.status(200).json(error.response));
}
