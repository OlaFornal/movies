import type {NextApiRequest, NextApiResponse} from 'next'
import {MovieListResponse} from "../../../../types/tmdb.movieList.types";
import {fetchMovies, MovieListEndpoints} from "../../../../dataProvider/TheMovieDB/movieList";

const parseQuery = (query:  {[p: string]: string | string[]}) => {
    const endpointKeys = Object.keys(MovieListEndpoints);
    let type, page;

    // if invalid type is provided get first from MovieListEndpoints
    if(query.type && typeof query.type === 'string' && endpointKeys.includes(query.type)) {
        type = query.type;
    } else {
        type = endpointKeys[0];
    }
    // if page invalid - set to first one
    if(query.page && typeof query.page === 'string') {
        page = parseInt(query.page);
    } else {
        page = 1
    }

    return {type: type, page: page}
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MovieListResponse>
) {
    const {type, page} = parseQuery(req.query);

    res.status(200).json(
        await fetchMovies(MovieListEndpoints[type as keyof typeof MovieListEndpoints], {page: page})
    )
}
