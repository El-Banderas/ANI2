
import React, { useState, useMemo } from "react";

export default function useTableControls( projsFiltered, tecnId ) {
const orderBy = "ID"
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      projsFiltered.slice().sort((a, b) => {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [orderBy, page, rowsPerPage, projsFiltered, tecnId],
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projsFiltered.length) : 0;


    return {page, visibleRows, emptyRows, rowsPerPage, handleChangePage, handleChangeRowsPerPage};
}