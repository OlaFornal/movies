import {AxiosResponse} from "axios";
import {axiosTMDBClient} from "./client";
import {MovieListResponse} from "../../types/tmdb.movieList.types";

interface QueryParams {
    page?: number, // query param for pagination
    query?: string // query param for search
}

export enum MovieListEndpoints {
    topRated = 'movie/top_rated',
    popular = 'movie/popular',
    upcoming = 'movie/upcoming',
    trending = 'trending/movie/week',
    search = 'search/movie'
}

export const fetchMovies = async (endpoint: string, queryParams: QueryParams = {}): Promise<MovieListResponse> => {
    return await axiosTMDBClient.get(endpoint, {params: queryParams})
        .then((response: AxiosResponse) => {
            return {
                results: {
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
