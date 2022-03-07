import React from "react";
import { Col, Grid, Text, Spacer, Collapse, styled } from "@nextui-org/react";
import { MovieReviewsInterface } from "../../types/tmdb.movieReviews.types";

interface MovieReviewProps {
    review: MovieReviewsInterface
}

export const ReviewItem: React.FC<MovieReviewProps> = ({ review }) => {
    return (
        <>
            <Grid xs={12} sm={2} md={2} lg={2} xl={2}>
                <Col>
                    <Spacer y={1} />
                    <Text>{review.author}</Text>
                    <Text>{review.created_at.substring(0, 10)}</Text>
                </Col>
            </Grid>
            <Grid xs={12} sm={10} md={10} lg={10} xl={10}>
                <Collapse title="" subtitle={review.content.substring(0, 250)}>
                    <Text key={review.id} dangerouslySetInnerHTML={{__html: review.content}} />
                </Collapse>
            </Grid>
        </>
    );
}
