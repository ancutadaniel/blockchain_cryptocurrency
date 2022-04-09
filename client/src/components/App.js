import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Blocks from './Blocks';
import logo from '../assets/logo.png';

const App = () => {
  const [walletInfo, setWalletInfo] = useState({});

  const loadWalletData = async () => {
    const data = await fetch('http://localhost:3000/api/wallet-info');
    const response = await data.json();

    setWalletInfo({ address: response.address, balance: response.balance });
  };

  useEffect(() => {
    loadWalletData();
  }, []);

  return (
    <div className='App'>
      <img className='logo' src={logo} />
      <br />
      <div>Welcome to the blockchain</div>
      <br />
      <Link to='/blocks'>Blocks</Link>
      <Link to='/conduct-transaction'>Conduct a Transaction</Link>
      <Link to='/transaction-pool'>Transaction pool</Link>
      <div className='WalletInfo'>
        <div>
          Address: <p>{walletInfo.address}</p>
        </div>
        <div>
          Balance: <p>ETH {walletInfo.balance}</p>
        </div>
      </div>
      <hr style={{ color: 'white' }}></hr>
    </div>
  );
};

export default App;
