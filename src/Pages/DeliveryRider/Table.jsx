import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Create a styled Paper component
const StyledPaper = styled(Paper)({
  width: '100%',
});

// Create a styled MuiTable component
const StyledMuiTable = styled(MuiTable)({
    width: '100%',// Set the minimum width of the table
});

// Create a styled TableCell component
const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  // Add any other styles you need
});

const Table = ({ data, columns }) => {
  return (
    <TableContainer component={StyledPaper} style={{ height: '100vh', overflowX: 'auto' }}>
      <StyledMuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <StyledTableCell colSpan={columns.length} align="center">
                No data available
              </StyledTableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <StyledTableCell key={column.id}>{row[column.id]}</StyledTableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledMuiTable>
    </TableContainer>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default Table;



/*
// Table.js
import React from 'react';
import PropTypes from 'prop-types';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Table = ({ data, columns }) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default Table;
*/
