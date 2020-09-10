import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import GridListTile from '@material-ui/core/GridListTile';

interface Post {
  post_id: number;
  image_url: string;
  meal_url?: string;
  user_id?: number;
  create_at?: string
}

interface Props {
  post_id: Post[]
}

const useStyles = makeStyles({
  grid: {
    testAlign: 'center'
  },
  image: {
    width: "170px",
    height: "170px",
    objectFit: "cover"
  }
})

const PhotoDisplay: React.FC<Props> = (props) => {
  const classes = useStyles()

  const photos = props.post_id.map(item => {
    return (
      <Grid item key={item.post_id} xs={6}>
        <Link href={item.meal_url}>
          <img className={classes.image} src={item.image_url} alt="meal"></img>
        </Link>
      </Grid>
    );
  })

  return (
    <Grid className={classes.grid} container spacing={1}>
      {photos}
    </Grid>
  )
}

export default PhotoDisplay