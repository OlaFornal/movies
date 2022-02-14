import {AxiosResponse} from "axios";
import {axiosTMDBClient} from "./client";
import {MediaType, MovieListResponse, TimeWindow} from "../../types/tmdb.movieList.types";

export const fetchMovies = async (endpoint: string, config?: object ): Promise<MovieListResponse> => {
    return await axiosTMDBClient.get(endpoint, config)
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

export const getTopRatedMovies = async () => fetchMovies('movie/top_rated');
export const getPopularMovies = async () => fetchMovies('movie/popular');
export const getNowPlayingMovies = async () => fetchMovies('movie/now_playing');
export const getUpcomingMovies = async () => fetchMovies('movie/upcoming');
export const getTrendingMovies = async (type = MediaType.movie, time = TimeWindow.week) =>
    fetchMovies(`trending/${type}/${time}`);
