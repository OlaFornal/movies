import {AxiosError, AxiosResponse} from "axios";
import {axiosTMDBClient} from "./client";
import {ErrorResponse, MovieListResponse} from "../../types/tmdb.movieList.types";

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
            const parsedError = parseAxiosError(error);
            return {
                errors: parsedError
            };
        });
}

const parseAxiosError = (error: AxiosError) : ErrorResponse => {
    const code = error.response?.data?.status_code ?? error.response?.status ?? 0;
    const message = error.response?.data?.status_message ?? error.response?.data?.errors?.join() ?? error.toString();
    return {status_code: code, status_message: message};
}
