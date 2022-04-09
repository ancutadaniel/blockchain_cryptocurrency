import React, { useState, useEffect } from 'react';
import Transactions from './Transactions';
import { Button } from 'react-bootstrap';

const Block = ({ block }) => {
  const [displayTransaction, setDisplayTransaction] = useState(false);
  const [displayData, setDisplayData] = useState([{}]);

  const { timestamp, hash, data, lastHash } = block;

  const hashDisplay = `${hash.substring(0, 15)}...`;
  const lastHashDisplay = `${lastHash.substring(0, 15)}...`;

  const toggleTransaction = () => {
    const stringifyData = JSON.stringify(data);

    if (displayTransaction) setDisplayData(stringifyData);

    if (!displayTransaction)
      setDisplayData(`${stringifyData.substring(0, 35)}...`);

    setDisplayTransaction((prevState) => {
      return !prevState;
    });
  };

  const renderData = (transaction, i) => {
    return displayTransaction ? (
      <p key={i}>{displayData}</p>
    ) : (
      <Transactions key={i} transaction={transaction} />
    );
  };

  useEffect(() => toggleTransaction(), []);

  return (
    <div>
      <div className='Block'>
        <div>Hash: {hashDisplay}</div>
        <div>Last hash :{lastHashDisplay}</div>
        <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
        {data.map((transaction, i) => renderData(transaction, i))}
        <Button variant='primary' onClick={toggleTransaction}>
          {displayTransaction ? 'Show More' : 'Show Less'}
        </Button>
      </div>
    </div>
  );
};

export default Block;
