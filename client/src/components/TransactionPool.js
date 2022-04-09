import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transactions from './Transactions';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const POOL_INTERVAL_MS = 10000;

const TransactionPool = () => {
  const [transactionPool, setTransactionPool] = useState({});
  let navigate = useNavigate();
  const fetchTransactionPool = async () => {
    const data = await fetch(`http://localhost:3000/api/transaction-pool-map`);
    const response = await data.json();

    setTransactionPool(response);
  };

  useEffect(() => {
    fetchTransactionPool();
    let interval = setInterval(() => fetchTransactionPool(), POOL_INTERVAL_MS);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleMineTransaction = async () => {
    const data = await fetch(`http://localhost:3000/api/mine-transactions`);

    if (data.status === 200) navigate(`/blocks`);
    else alert(`The mine-transactions block request did not complete`);
  };

  return (
    <div className='TransactionPool'>
      <Link to='/'>Home</Link>
      <h3>Transaction Pool</h3>
      <div>
        {Object.values(transactionPool)?.map((transaction) => (
          <div key={transaction.id}>
            <Transactions transaction={transaction} />
          </div>
        ))}
      </div>
      <Button variant='primary' onClick={handleMineTransaction}>
        Mine the Transaction
      </Button>
    </div>
  );
};

export default TransactionPool;
