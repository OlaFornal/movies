import type {NextApiRequest, NextApiResponse} from 'next'
import {MovieListResponse} from "../../../types/tmdb.movieList.types";
import {fetchMovies, MovieListEndpoints} from "../../../dataProvider/TheMovieDB/movieList";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MovieListResponse>
) {
    const {query} = req.query;
    return fetchMovies(MovieListEndpoints.search, {query: query.toString()})
        .then((response: MovieListResponse) => res.status(200).json(response))
        .catch((error) => res.status(200).json(error.response));
}
