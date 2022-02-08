import axios, {AxiosResponse} from "axios";

export interface MovieDbResponse {
    data?: MovieInterface[],
    error?: string,
}

export interface MovieInterface {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number;
    original_language: string,
    original_title: string,
    overview: string;
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string;
    video: boolean,
    vote_average: number,
    vote_count: number,
}

const axiosClient = axios.create({
    baseURL: process.env.MOVIE_DB_API_URL,
    timeout: 1000,
    params: {
        api_key: process.env.MOVIE_DB_API_KEY
    },
});

export const getTopRatedMovies = async (): Promise<MovieDbResponse> => {
    return await axiosClient.get('movie/top_rated')
        .then((response: AxiosResponse) => {
            return {
                data: response.data.results,
            };
        }).catch(error => {
            return {
                error: error.response ? error.response.data.status_message : error.toString()
            };
        });
}

export const searchMovies = async (query: string) : Promise<MovieDbResponse> => {
    return await axiosClient.get('search/movie', { params: { query: encodeURIComponent(query) }})
        .then((response: AxiosResponse) => {
            return {
                data: response.data.results,
            };
        }).catch(error => {
            return {
                error: error.response ? error.response.data.status_message : error.toString()
            };
        });
}
