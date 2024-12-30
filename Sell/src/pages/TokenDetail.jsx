import React from 'react';
import { useParams } from 'react-router-dom';

const tokens = [
  { id: '1', name: 'Token A', description: 'Description for Token A', price: 10 },
  { id: '2', name: 'Token B', description: 'Description for Token B', price: 20 },
  { id: '3', name: 'Token C', description: 'Description for Token C', price: 30 },
];

const TokenDetail = () => {
  const { id } = useParams();
  const token = tokens.find(token => token.id === id);

  if (!token) {
    return <div>Token not found</div>;
  }

  return (
    <div>
      <h1>{token.name}</h1>
      <p>{token.description}</p>
      <p>Price: ${token.price}</p>
    </div>
  );
};

export default TokenDetail;
