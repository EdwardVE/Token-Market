import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';

const ElectionsCard = ({ candidate, onVote }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
        <CardMedia
        style={{ maxHeight: 140, objectFit: 'contain' }}
        component="img"
        alt={candidate.name}
        height="140"
        image="https://media.istockphoto.com/id/1399395748/es/foto/alegre-mujer-de-negocios-con-gafas-posando-con-las-manos-bajo-la-cara-mostrando-su-sonrisa-en.jpg?s=612x612&w=0&k=20&c=0y9KGEHKrwRUhZX2b7OH-SPUJ9t_HPf9Dle5khT77bg="
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {candidate.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Votes: {candidate.votes}
        </Typography>
      </CardContent>
      <CardActions style={{display: 'flex', justifyContent: 'center'}}>
        <Button variant='outlined' size="medium" onClick={() => onVote(candidate.id)}>
          Vote
        </Button>
      </CardActions>
    </Card>
  );
};

export default ElectionsCard;
