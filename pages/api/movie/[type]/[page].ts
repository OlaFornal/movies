import type {NextApiRequest, NextApiResponse} from 'next'
import {MovieListResponse} from "../../../../types/tmdb.movieList.types";
import {fetchMovies, MovieListEndpoints} from "../../../../dataProvider/TheMovieDB/movieList";

const parseQuery = (query:  {[p: string]: string | string[]}) => {
    const endpointKeys = Object.keys(MovieListEndpoints);
    let type, page, searchQuery;

    // if invalid type is provided get first from MovieListEndpoints
    if(query.type && typeof query.type === 'string' && endpointKeys.includes(query.type)) {
        type = query.type;
    } else {
        type = endpointKeys[0];
    }
    // if page invalid - set to first one
    if(query.page && typeof query.page === 'string') {
        page = Math.max(parseInt(query.page), 1);
    } else {
        page = 1
    }

    searchQuery = (query.query &&  typeof query.query === 'string') ? query.query : null;

    return {type: type, page: page, searchQuery: searchQuery}
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MovieListResponse>
) {
    const {type, page, searchQuery} = parseQuery(req.query);

    const subQueryParams = searchQuery? {query: searchQuery, page: page} : {page: page};

    res.status(200).json(
        await fetchMovies(MovieListEndpoints[type as keyof typeof MovieListEndpoints], subQueryParams)
    )
}
