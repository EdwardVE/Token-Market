import { useEffect, useState } from 'react';
import ElectionsCard from '../components/ElectionsCard';
import { PeraWalletConnect } from '@perawallet/connect';
import VotingComponent from '../components/VotingComponent';
import { voteForCandidate } from '../services/algorandServices'; 
import RegisterCandidate from '../components/RegisterCandidate';

const candidatesList = [
  { id: 1, name: 'Juan Pérez Sanchez', votes: 0, role: 'Presidente' },
  { id: 2, name: 'María Gómez', votes: 0, role: 'Vicepresidente' },
  { id: 3, name: 'Carlos Rodríguez', votes: 0, role: 'Secretario' },
];

const Elections = () => {
  const [candidates, setCandidates] = useState(candidatesList);

  const handleVote = async (id) => {
    // setCandidates((prevCandidates) =>
    //   prevCandidates.map((candidate) =>
    //     candidate.id === id ? { ...candidate, votes: candidate.votes + 1 } : candidate
    //   )
    // );
    // await voteForCandidate(accountAddress, candidateId);
  };

  return (
    <div>
      <h1>Elections</h1>
      <RegisterCandidate />
      {/* <VotingComponent /> */}
      
      {/* <div className="candidate-list">
        {candidates.map(candidate => (
          <ElectionsCard key={candidate.id} candidate={candidate} onVote={handleVote} />
        ))}
      </div> */}
    </div>
  );
};

export default Elections;
