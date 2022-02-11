import axios, {AxiosResponse} from "axios";
import {MovieDbResponse} from "./MovieDbProvider";

const axiosClient = axios.create({
    timeout: 1000
});


export const getMovieSearchResults = async (query: string) : Promise<MovieDbResponse> => {
    return await axiosClient.get('/api/search/movies', { params: { query: encodeURIComponent(query) }})
        .then((response: AxiosResponse) => {
            return response.data;
        }).catch(error => {
            return {
                error: error.response ? error.response.error.status_message : error.toString()
            };
        });
}
