import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const createData = (name, filePath, description, price, quantity, discountPrice, discountPercentage) => ({
  name,
  filePath,
  description,
  price,
  quantity,
  discountPrice,
  discountPercentage,
});

const rows = [
  createData('Product 1', '/images/product1.jpg', 'Description 1', 25.0, 10, 20.0, 15.0),
  createData('Product 2', '/images/product2.jpg', 'Description 2', 30.0, 15, 25.0, 10.0),
  createData('Product 3', '/images/product3.jpg', 'Description 3', 20.0, 8, 18.0, 12.0),
  // Add more rows as needed
];

const ProductListing = () => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>File Path</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Discount Price</TableCell>
          <TableCell>Discount Percentage</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.filePath}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>{row.discountPrice}</TableCell>
            <TableCell>{row.discountPercentage}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ProductListing;
