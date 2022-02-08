// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {MovieDbResponse, MovieInterface, searchMovies} from "../../../dataProvider/MovieDbProvider";

interface MovieSearchResponseData {
    error?: string | undefined,
    movies?: MovieInterface[],
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MovieSearchResponseData>
) {
    if (req.method === 'GET') {
        const { q } = req.query
        const movieSearchResponse : MovieDbResponse = await searchMovies(q.toString());
        if(movieSearchResponse.data) {
            res.status(200).json({ movies: movieSearchResponse.data })
        } else {
            res.status(200).json({ error: movieSearchResponse.error})
        }
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).json({ error: 'Method not allowed, use GET here'});
    }

}
