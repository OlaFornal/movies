import axios, {AxiosResponse} from "axios";
import {MovieListResponse} from "../types/tmdb.movieList.types";

const axiosClient = axios.create({
    timeout: 3000
});

export const paginateMovies = async (type: string, page: number, searchQuery: string) : Promise<MovieListResponse> => {
    const queryParams = searchQuery ? { query: searchQuery } : {};

    return await axiosClient.get(`/api/movie/${type}/${page}`, { params: queryParams})
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch(error => {
            return {
                errors: error.response ? error.response.error.status_message : error.toString()
            };
        });
}

export const getMovieSearchResults = async (query: string) : Promise<MovieListResponse> => {
    return await axiosClient.get('/api/search/movies', { params: { query: query }})
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch(error => {
            return {
                errors: error.response ? error.response.error.status_message : error.toString()
            };
        });
}
