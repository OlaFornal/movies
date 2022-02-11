import type { NextApiRequest, NextApiResponse } from 'next'
import {MovieDbResponse, searchMovies} from "../../../dataProvider/MovieDbProvider";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MovieDbResponse>
) {
    if (req.method === 'GET') {
        const { query } = req.query

        const movieSearchResponse : MovieDbResponse = await searchMovies(query.toString());
        console.log(movieSearchResponse)
        if(movieSearchResponse.data) {
            res.status(200).json({ data: movieSearchResponse.data ?? null })
        } else {
            res.status(200).json({ error: movieSearchResponse.error})
        }
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).json({ error: 'Method not allowed, use GET here'});
    }

}
