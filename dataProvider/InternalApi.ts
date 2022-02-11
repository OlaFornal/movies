import axios, {AxiosResponse} from "axios";
import {MoviesResponse} from "../types/tmdb.movies.types";

const axiosClient = axios.create({
    timeout: 1000
});


export const getMovieSearchResults = async (query: string) : Promise<MoviesResponse> => {
    return await axiosClient.get('/api/search/movies', { params: { query: query }})
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch(error => {
            return {
                errors: error.response ? error.response.error.status_message : error.toString()
            };
        });
}
