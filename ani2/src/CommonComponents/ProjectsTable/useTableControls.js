
import React, { useState } from "react";
import axios from 'axios';

export default function useTableControls( projects ) {

const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects["projects"].length) : 0;

    const visibleRows = React.useMemo(
        () =>
            projects["projects"].slice().sort((a, b) => {
                if (b["ID"] < a["ID"]) {
                    return -1;
                }
                if (b["ID"] > a["ID"]) {
                    return 1;
                }
                return 0;
            }).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage, projects],
    );

    return {page, visibleRows, emptyRows, rowsPerPage, handleChangePage, handleChangeRowsPerPage};
}