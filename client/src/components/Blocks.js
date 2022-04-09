import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Block from '../components/Block';
import { Button } from 'react-bootstrap';

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [pageId, setPageId] = useState(1);
  const [blocksLength, setBlocksLength] = useState(0);

  const fetchData = async () => {
    const blocksDataLength = await fetch(
      `http://localhost:3000/api/blocks/length`
    );
    const resBlocks = await blocksDataLength.json();
    setBlocksLength(resBlocks);
  };

  const fetchPaginatedBlocks = async (pageId) => {
    setPageId(pageId);
    const data = await fetch(`http://localhost:3000/api/blocks/${pageId}`);
    const response = await data.json();
    setBlocks(response);
  };

  useEffect(() => {
    fetchData();
    fetchPaginatedBlocks(pageId);
  }, []);

  return (
    <div>
      <Link to='/'>Home</Link>
      <h3>Blocks</h3>
      <div>
        {[...Array(Math.ceil(blocksLength / 5)).keys()].map((key) => {
          const paginationId = key + 1;

          return (
            <span key={key}>
              <Button
                variant='primary'
                size='small'
                onClick={() => fetchPaginatedBlocks(paginationId)}
              >
                {paginationId}
              </Button>{' '}
            </span>
          );
        })}
      </div>
      {blocks?.map((block, i) => {
        return <Block key={i} block={block} />;
      })}
    </div>
  );
};

export default Blocks;
