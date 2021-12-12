import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import '../styles/characterCard.css'

const IMAGE_VARIANT = {
    fantastic: 'portrait_fantastic', 
  };

export default function CharacterCard(props:any) {
  return ( 
    <Card className="root">
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.name}
          height="250"
          image={`${props?.thumb?.path}/${IMAGE_VARIANT.fantastic}.${props?.thumb?.extension}`}   
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props?.name}
          </Typography> 
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}