interface AuthorDetailsInterface {
    name: string,
    username: string,
    avatar_patch: string | null,
    rating: number | null 
}


export interface MovieReviewsInterface {
    author: string,
    author_details: AuthorDetailsInterface[],
    content: string,
    created_at: string,
    id: number,
    updated_at: string,
    url: string
}


export interface MovieReviewsSuccessResponse {
    id: number,
    page: number,
    results: MovieReviewsInterface[],
    total_results: number,
    total_pages: number,
}

export interface ErrorResponse {
    status_message: string,
    status_code: number,
}

export interface MovieReviewsResponse {
    results?: MovieReviewsSuccessResponse,
    errors?: ErrorResponse,
}
