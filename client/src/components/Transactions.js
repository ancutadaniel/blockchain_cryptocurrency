import React from 'react';

const Transactions = ({ transaction }) => {
  const { input, outputMap } = transaction;
  let recipients = [];

  if (transaction) recipients = Object.keys(outputMap);

  return (
    <div className='Transaction'>
      <hr style={{ border: '1px solid white', width: '85vw' }} />
      <div>
        <p>
          From: {`${input.address.substring(0, 20)}...`} | Balance:{' '}
          {input.amount}
        </p>
        <p></p>
      </div>
      {recipients.map((recipient, i) => (
        <div key={i}>
          <p>
            To: {`${recipient.substring(0, 20)}...`} | Sent:{' '}
            {outputMap[recipient]}
          </p>
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
