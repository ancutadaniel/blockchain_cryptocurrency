import React, { useState, useEffect } from 'react';
import Block from '../components/Block';
import { Link } from 'react-router-dom';

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);

  const loadBlocksData = async () => {
    const data = await fetch('http://localhost:3000/api/blocks');
    const response = await data.json();

    setBlocks(response);
  };

  useEffect(() => {
    loadBlocksData();
  }, []);

  return (
    <div>
      <Link to='/'>Home</Link>
      <h3>Blocks</h3>
      {blocks.map((block, i) => {
        return <Block key={i} block={block} />;
      })}
    </div>
  );
};

export default Blocks;
