import { useEffect, useState } from 'react';
import { fetchCandidates, registerCandidate } from '../services/algorandServices'; 
import { PeraWalletConnect } from '@perawallet/connect'; 
import ElectionsCard from './ElectionsCard';
import FormRegisterCandidate from './FormRegisterCandidate';

const peraWallet = new PeraWalletConnect();

const RegisterCandidate = () => {
  const [candidateName, setCandidateName] = useState('');
  const [accountAddress, setAccountAddress] = useState(null);
  const [candidates, setCandidates] = useState([]);


  //!
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  //!
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!firstName.trim()) {
      formErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      formErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email address is invalid';
    }

    if (!phone.trim()) {
      formErrors.phone = 'Phone number is required';
    } else if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      formErrors.phone = 'Phone number must be 10 digits';
    }

    return formErrors;
  };

  const handleRegister = async () => {
    // if (!candidateName || !accountAddress || !peraWallet) {
    //   alert('Please fill in all fields and connect your wallet.');
    //   return;
    // }
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!firstName || !lastName || !email || !phone || !accountAddress || !peraWallet) {
      alert('Please fill in all fields and connect your wallet.');
      return;
    }
    try {
      // Asegúrate de que la billetera esté conectada
      if (!peraWallet.isConnected) {
        await connectWallet();
      }
      const candidateData = ['XU3ZVMTCP2J4SWXTV5U5RE4DKDABY3M2RH7BGXN7U26NLTIRAKUYIWIETQ',[firstName,
        lastName,
        email,
        phone]]

      
      console.log(candidateData);

      // const result = await registerCandidate(accountAddress, candidateName, peraWallet);
      // if (result) {
      //   alert(`Candidate ${candidateName} registered successfully!`);
      //   setCandidateName('');
      //   loadCandidates();
      // }
      const result = await registerCandidate( accountAddress , candidateData, peraWallet);
      if (result) {
        alert(`Candidate ${firstName} ${lastName} registered successfully!`);
        // Reset fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setErrors({});
        //!!!!! loadCandidates();
      }

    } catch (error) {
      console.error('Error registering candidate:', error);
      alert('Failed to register candidate.');
    }
  };

  const connectWallet = async () => {
    try {
      const newAccounts = await peraWallet.connect(); // Connect to Pera Wallet
      console.log('Connected to Pera Wallet:', newAccounts);

      setAccountAddress(newAccounts[0]);

      peraWallet.connector.on('disconnect', () => {
        console.log('Wallet disconnected');
        localStorage.removeItem('walletconnect');
        localStorage.removeItem('PeraWallet.Wallet');
      });
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  }; 
  const loadCandidates = async () => { 
    if (accountAddress) {
      try {
        const candidatesList = await fetchCandidates(accountAddress);
        console.log('Fetched candidates:', candidatesList);
        setCandidates(candidatesList);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    }
  };
  const handleVote = async (id) => {
    console.log('Voting for candidate:', id);
    // setCandidates((prevCandidates) =>
    //   prevCandidates.map((candidate) =>
    //     candidate.id === id ? { ...candidate, votes: candidate.votes + 1 } : candidate
    //   )
    // );
    // await voteForCandidate(accountAddress, candidateId);
  };
  useEffect(() => {
    if (accountAddress) {
      loadCandidates();
    }
  }, [accountAddress]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Register Candidate</h1>
      <button onClick={connectWallet}>Connect Pera Wallet</button>
      {accountAddress && (
        <>
          <p>Connected as: {accountAddress}</p>
          {/* <div style={{display: 'flex'}}>
            <input
              type="text"
              placeholder="Candidate Name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
            <button onClick={handleRegister}>Register Candidate</button>
          </div> */}


          <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
            <button onClick={handleRegister}>Register Candidate</button>
          </div>
          {/* <FormRegisterCandidate/> */}

          {/* <h2>Registered Candidates</h2> */}
          {/* <ul>
            {candidates.map(candidate => (
              <li key={candidate.id}>
                {candidate.name} (ID: {candidate.id}, Total: {candidate.total})
              </li>
            ))}
          </ul> */}

          {/* <div className="candidate-list">
            {candidates.map(candidate => (
              <ElectionsCard key={candidate.id} candidate={candidate} onVote={handleVote} />
            ))}
          </div> */}

        </>
      )}
    </div>
  );
};

export default RegisterCandidate;
