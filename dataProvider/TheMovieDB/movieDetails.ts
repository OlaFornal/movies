import {AxiosResponse} from "axios";
import {axiosTMDBClient} from "./client";
import {MovieDetailsResponse} from "../../types/tmdb.movieDetails.types";

export const getMovieDetails = async (id: number): Promise<MovieDetailsResponse> => {
    return await axiosTMDBClient.get(`movie/${id}`)
        .then((response: AxiosResponse) => {
            return {result: response.data};
        }).catch(error => {
            return {
                errors: {
                    status_message: error.response ? error.response.data.status_message : error.toString(),
                    status_code: error.response ? error.response.data.status_code : error.statusCode,
                }
            };
        });
}

