import React from "react";
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

    return (
        <Grid.Container gap={2}>
            <Grid xs={12} justify="center">
                <Pagination page={props.currentPage} initialPage={1} siblings={3} total={props.totalPages} onChange={handleChange} color='secondary' bordered size={'xl'} />
            </Grid>
        </Grid.Container>
    );
}
