import axios from "axios";

export const axiosTMDBClient = axios.create({
    baseURL: process.env.MOVIE_DB_API_URL,
    timeout: 5000,
    params: {
        api_key: process.env.MOVIE_DB_API_KEY
    },
});
