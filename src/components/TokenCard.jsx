import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';

const TokenCard = ({ token }) => {
  return (
    // <div className="token-card">
    //   <h3>{token.name}</h3>
    //   <img className="img-token" src="https://localdigitalkit.com/wp-content/uploads/2023/04/token.jpg" alt="example img token" />
    //   <p>{token.description}</p>
    //   <p>Price: ${token.price}</p>
    //   <Link to={`/token/${token.id}`}>View Details</Link>
    // </div>
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
    <CardMedia
      component="img"
      alt={token.name}
      height="140"
      image="https://localdigitalkit.com/wp-content/uploads/2023/04/token.jpg"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {token.name}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {token.description}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        Price: ${token.price}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" component={Link} to={`/token/${token.id}`}>
        View Details
      </Button>
      <Button size="small"><ShoppingCartIcon /> Buy Now</Button>
    </CardActions>
  </Card>
  );
};

export default TokenCard;
