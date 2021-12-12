import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Tooltip } from '@material-ui/core';
import '../styles/comicsCard.css'

const IMAGE_VARIANT = {
    fantastic: 'portrait_fantastic', 
  };

export default function ComicsCard(props:any) {
  
  return (
    
    <Card className="comicsCard">
      <Tooltip title={props.title} >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.title}
          height="100"
          image={`${props?.thumb?.path}/${IMAGE_VARIANT.fantastic}.${props?.thumb?.extension}`}   
        />
        <CardContent>
          <Typography component="h5">
            {props.title.substring(0, 20)}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Tooltip>
      <CardActions>
      </CardActions>
    </Card>
   
  );
}