import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';

const ElectionsCard = ({ candidate, onVote }) => {
  console.log('candidate:', candidate);
  return (
    <Card sx={{ width: 200, margin: '1rem' }}>
        <CardMedia
        style={{ maxHeight: 140, objectFit: 'contain' }}
        component="img"
        alt={candidate.name}
        height="140"
        image="https://media.istockphoto.com/id/1399395748/es/foto/alegre-mujer-de-negocios-con-gafas-posando-con-las-manos-bajo-la-cara-mostrando-su-sonrisa-en.jpg?s=612x612&w=0&k=20&c=0y9KGEHKrwRUhZX2b7OH-SPUJ9t_HPf9Dle5khT77bg="
        />
      <CardContent>
        <Typography sx={{ height: 70 }} gutterBottom variant="h6" component="div">
          {candidate.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Id: {candidate.id}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Votes: {candidate.total}
        </Typography>
      </CardContent>
      <CardActions style={{display: 'flex', justifyContent: 'center'}}>
        <Button variant='outlined' sx={{ fontSize: '1.2rem', padding: '1rem 3.5rem' }} onClick={() => onVote(candidate.id)}>
          Vote
        </Button>
      </CardActions>
    </Card>
  );
};

export default ElectionsCard;
