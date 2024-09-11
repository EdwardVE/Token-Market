import React, { useState } from 'react';
import ElectionsCard from '../components/ElectionsCard'; // Import the ElectionsCard component

const candidatesList = [
  { id: 1, name: 'Candidate 1', votes: 0 },
  { id: 2, name: 'Candidate 2', votes: 0 },
  { id: 3, name: 'Candidate 3', votes: 0 },
];

const Elections = () => {
  const [candidates, setCandidates] = useState(candidatesList);

  const handleVote = (id) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, votes: candidate.votes + 1 } : candidate
      )
    );
  };

  return (
    <div>
      <h1>Elections</h1>
      <div className="candidate-list">
        {candidates.map(candidate => (
          <ElectionsCard key={candidate.id} candidate={candidate} onVote={handleVote} />
        ))}
      </div>
    </div>
  );
};

export default Elections;
