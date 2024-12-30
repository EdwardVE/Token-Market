// import React, { useEffect, useState } from 'react';
import TokenCard from '../components/TokenCard';
// import api from '../services/api';
const tokens = [
    { id: '1', name: 'Token A', description: 'Description for Token A', price: 10 },
    { id: '2', name: 'Token B', description: 'Description for Token B', price: 20 },
    { id: '3', name: 'Token C', description: 'Description for Token C', price: 30 },
  ];

const Home = () => {
//   const [tokens, setTokens] = useState([]);

//   useEffect(() => {
//     const fetchTokens = async () => {
//       try {
//         const response = await api.get('/tokens');
//         setTokens(response.data);
//       } catch (error) {
//         console.error('Error fetching tokens', error);
//       }
//     };
//     fetchTokens();
//   }, []);

  return (
    <div>
      <h1>Marketplace</h1>
      <div className="token-list">
        {tokens.map(token => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
    </div>
  );
};

export default Home;
