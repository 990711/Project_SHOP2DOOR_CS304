import * as React from 'react';
import { useNavigate } from 'react-router-dom';



//import ShopOwner_ProductService from './src/Services/ShopOwner/ShopOwner_ProductService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ProductListing = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    ShopOwner_ProductService.getProducts().then((res) => {
       setProducts(res.data);
     });
  }, []);
  
  const deleteProduct = (id) => {
    ShopOwner_ProductService.deleteProduct(id).then((res) => {
       setProducts(products.filter((product) => product.id !== id));
     });
  };
 
  /*
  const CreateProduct = () => {
     navigate('/main-layout/create-product');
  };
  */

  return(
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
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.filePath}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.discountPrice}</TableCell>
            <TableCell>{product.discountPercentage}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );


  
}

export default ProductListing;
