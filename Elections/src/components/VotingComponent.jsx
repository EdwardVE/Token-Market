//! Acá inicia sesión con pera para hacer la votación

import { PeraWalletConnect } from "@perawallet/connect";
import { useState } from "react";
import ElectionsCard from "./ElectionsCard";
import { voteForCandidate } from "../services/algorandServices";

const peraWallet = new PeraWalletConnect();
const candidates = [
  [
    'XU3ZVMTCP2J4SWXTV5U5RE4DKDABY3M2RH7BGXN7U26NLTIRAKUYIWIETQ',
    ['Juan', 'Pérez Sánchez', 'juan.perez@example.com', '+334567890']
  ],
  [
    '7BZTVU4MP3Q7T4O9F4ZR2A5ND6C8YPL4A6J2W8T6F2P1X0K3Y7H1GQXN8M',
    ['María', 'Gómez', 'maria.gomez@example.com', '+387654321']
  ],
  [
    '4MVK7K8ZP5G6W5RM2P6A2S9D0E3F1L9X4B2C0V1R6E9K7T5J8H4I3L7N9S',
    ['Carlos', 'Rodríguez', 'carlos.rodriguez@example.com', '+322334455']
  ],
  [
    '9J6F2N5T3D7P1M8O4A5X6Q2Z9R8W0K7H3V4L6S8B1Y9C0I5J7G2E4F3M6L',
    ['Ana', 'Martínez', 'ana.martinez@example.com', '323344556']
  ],
  [
    '3H4J2K8L7M9N0Q5O1P2R6T7X8V4Z3Y6C7B9A0D5E4F1G8I2J3K9L0M4P6R',
    ['Luis', 'Fernández', 'luis.fernandez@example.com', '335566778']
  ]
];

const VotingComponent = () => {
  const [accountAddress, setAccountAddress] = useState(null);

  const connectWallet = async () => {
    try {
      const newAccounts = await peraWallet.connect();
      setAccountAddress(newAccounts[0]);
    } catch (error) {
      console.error("Couldn't connect to Pera Wallet", error);
    }
  };
  const handleVote = async (id) => {

    await voteForCandidate(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Elections</h1>
      {accountAddress ? (
        <p>Connected as: {accountAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect Pera Wallet</button>
      )}
            <div className="candidate-list">
        {candidates.map(candidate => (
          <ElectionsCard key={candidate.id} candidate={candidate} onVote={handleVote} />
        ))}
      </div>
    </div>
  );
};

export default VotingComponent;
