import React, { useState } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ConductTransaction = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  let navigate = useNavigate();

  const handleRecipient = (e) => {
    setRecipient(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(+e.target.value);
  };

  const conductTransaction = async () => {
    const data = await fetch(`http://localhost:3000/api/transact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient, amount }),
    });
    const response = await data.json();
    alert(response.message || response.type);
    navigate(`/transaction-pool`);
  };

  return (
    <div className='ConductTransaction'>
      <Link to='/'>Home</Link>
      <div>
        <FormGroup>
          <FormControl
            input='text'
            placeholder='recipient'
            value={recipient}
            onChange={handleRecipient}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormControl
            input='number'
            placeholder='amount'
            value={amount}
            onChange={handleAmount}
          />
        </FormGroup>
      </div>
      <Button onClick={conductTransaction}>Submit</Button>
    </div>
  );
};

export default ConductTransaction;
