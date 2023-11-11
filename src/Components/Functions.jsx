import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import HistoryTwoToneIcon from '@mui/icons-material/HistoryTwoTone';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import PaymentsIcon from '@mui/icons-material/Payments';
import Orders from './Orders';
import History from './History';
import Payments from './Payments';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#b9f7c6',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  height: '20vh',
  width: '30vh',
}));

export default function Profile() {
  const [showOrders, setShowOrders] = React.useState(false);
  const [showHistory, setShowHistory] = React.useState(false);
  const [showPayments, setShowPayments] = React.useState(false);

  const viewOrders = () => {
    setShowOrders(true);
    setShowHistory(false);
    setShowPayments(false);
  };

  const viewHistory = () => {
    setShowOrders(false);
    setShowHistory(true);
    setShowPayments(false);
  };

  const viewPayments = () => {
    setShowOrders(false);
    setShowHistory(false);
    setShowPayments(true);
  };

  const goBack = () => {
    setShowOrders(false);
    setShowHistory(false);
    setShowPayments(false);
  };

  return (
    <div>
      {showOrders && (
        <div>
          <Orders/>
          <Button variant="text" startIcon={<KeyboardBackspaceTwoToneIcon />} sx={{ color: '#b9f7c6' }} onClick={goBack}>
            Back
          </Button>
      
        </div>
      )}

      {showHistory && (
        <div>
          <History/>
        
          <Button variant="text" startIcon={<KeyboardBackspaceTwoToneIcon />} sx={{ color: '#b9f7c6' }} onClick={goBack}>
            Back
          </Button>
        </div>
      )}

      {showPayments && (
        <div>
        <Payments/>
        <Button variant="text" startIcon={<KeyboardBackspaceTwoToneIcon />} sx={{ color: '#b9f7c6' }} onClick={goBack}>
            Back
          </Button>
        </div>
      )}

      {!showOrders && !showHistory && !showPayments && (
        <Stack direction="row" spacing={6}>
          <Item>
            <Button variant="text" startIcon={<ListTwoToneIcon />} sx={{ color: '#003d2b' }} onClick={viewOrders}>
              View Orders
            </Button>
          </Item>
          <Item>
            <Button variant="text" startIcon={<HistoryTwoToneIcon />} sx={{ color: '#003d2b' }} onClick={viewHistory}>
              Order History
            </Button>
          </Item>
          <Item>
            <Button variant="text" startIcon={<PaymentsIcon />} sx={{ color: '#003d2b' }} onClick={viewPayments}>
              Payments
            </Button>
          </Item>
        </Stack>
      )}
    </div>
  );
}