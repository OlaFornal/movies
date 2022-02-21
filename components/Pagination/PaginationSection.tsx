import React, {useState} from "react";
import {Pagination, Grid} from "@nextui-org/react";

interface PaginationProps {
    currentPage: number,
    totalPages: number
    onPageChange: (page: number) => Promise<void>
}

export const PaginationSection: React.FC<PaginationProps> = (props) => {

    const handleChange = (page: number) => {
        props.onPageChange(page).then();
    }

    // API throws error on page > than 500, but total page in movie list is bigger
    const getAdjustedTotalPages = () => Math.min(props.totalPages, 500);

    return (
        <Grid.Container gap={2}>
            <Grid xs={12} justify="center">
                <Pagination page={props.currentPage} initialPage={1} siblings={3} total={getAdjustedTotalPages()} onChange={handleChange} color='secondary' bordered size={'xl'} />
            </Grid>
        </Grid.Container>
    );
}
