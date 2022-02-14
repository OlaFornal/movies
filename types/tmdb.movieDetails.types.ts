// Based on example TMDB response https://developers.themoviedb.org/3/movies/get-movie-details
import {MovieListInterface} from "./tmdb.movieList.types";

interface Genre {
    id: number,
    name: string
}

interface ProductionCompany {
    name: string,
    id: number,
    logo_path: string | null,
    origin_country: string
}

interface ProductionCountry {
    iso_3166_1: string,
    name: string,
}

interface SpokenLanguages {
    iso_639_1: string,
    name: string,
}

// @todo: move to some common tmdb types
export interface ErrorResponse {
    status_message: string,
    status_code: number,
}

export interface MovieDetailsResponse {
    result?: MovieDetailsInterface,
    errors?: ErrorResponse,
}

// @todo: unify movie list and movie details interface - make some common MovieInterface
export interface MovieDetailsInterface {
    adult: boolean,
    backdrop_path: string | null,
    belongs_to_collection: object | null,
    budget: number,
    genres: Genre[],
    homepage: string | null,
    id: number;
    imdb_id: string | null,
    original_language: string,
    original_title: string,
    overview: string | null,
    popularity: number,
    poster_path: string | null,
    production_companies: ProductionCompany[],
    production_countries: ProductionCountry[],
    release_date: string,
    revenue: number,
    runtime: number | null,
    spoken_languages: SpokenLanguages[],
    status: string,
    tagline: string | null,
    title: string;
    video: boolean,
    vote_average: number,
    vote_count: number,
}
