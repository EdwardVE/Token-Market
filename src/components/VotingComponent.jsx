//! Acá inicia sesión con pera para hacer la votación

import { PeraWalletConnect } from "@perawallet/connect";
import { useState } from "react";

const peraWallet = new PeraWalletConnect();

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Algorand Voting</h1>
      {accountAddress ? (
        <p>Connected as: {accountAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect Pera Wallet</button>
      )}
    </div>
  );
};

export default VotingComponent;
