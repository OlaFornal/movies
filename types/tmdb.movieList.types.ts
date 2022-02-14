// Based on example TMDB response https://developers.themoviedb.org/3/movies/get-popular-movies
export interface MovieListInterface {
    adult: boolean,
    backdrop_path: string | null,
    genre_ids: number[],
    id: number;
    original_language: string,
    original_title: string,
    overview: string | null,
    popularity: number,
    poster_path: string | null,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}

export interface MovieListSuccessResponse {
    page: number,
    results: MovieListInterface[],
    total_results: number,
    total_pages: number,
}

export interface ErrorResponse {
    status_message: string,
    status_code: number,
}

export interface MovieListResponse {
    results?: MovieListSuccessResponse,
    errors?: ErrorResponse,
}

export enum MediaType {
    all = 'all',
    movie = 'movie',
    tv = 'tv',
    person = 'person',
}

export enum TimeWindow {
    'day' = 'day',
    'week' = 'week',
}
