import {AxiosResponse} from "axios";
import {axiosTMDBClient} from "./client";
import {MovieReviewsResponse} from "../../types/tmdb.movieReviews.types";

export const getMovieReviews = async (id: number): Promise<MovieReviewsResponse> => {
    return await axiosTMDBClient.get(`movie/${id}/reviews`)
        .then((response: AxiosResponse) => {
            return {
                results: {
                    id: response.data.id,
                    page: response.data.page,
                    results: response.data.results,
                    total_results: response.data.total_results,
                    total_pages: response.data.total_pages,
                },
            };
        }).catch(error => {
            return {
                errors: {
                    status_message: error.response ? error.response.data.status_message : error.toString(),
                    status_code: error.response ? error.response.data.status_code : error.statusCode,
                }
            };
        });
}
