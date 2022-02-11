import type {NextApiRequest, NextApiResponse} from 'next'
import {AxiosResponse} from "axios";
import {axiosTMDBClient} from "../../../dataProvider/TheMovieDB/client";
import {MoviesResponse} from "../../../types/tmdb.movies.types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MoviesResponse>
) {
    const {query} = req.query;
    return await axiosTMDBClient.get('search/movie', {params: {query: query.toString()}})
        .then((response: AxiosResponse) =>
            res.status(200).json({results: response.data ?? null})
        )
        .catch((error) =>
            res.status(200).json({errors: error.response ? error.response.data.status_message : error.toString()})
        );
}
