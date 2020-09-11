// Ohmura

import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

interface Post {
  post_id: number;
  image_url: string;
  meal_url?: string;
  user_id?: number;
  name?: string;
  create_at?: string;
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
    objectFit: "cover",
    borderRadius: 10
  }
})

const PhotoDisplay: React.FC<Props> = (props) => {
  const classes = useStyles()

  const photos = props.post_id.map(item => {
    return (
      <GridListTile key={item.post_id} >
        <Link href={item.meal_url}>
          <img className={classes.image} src={item.image_url} alt="meal"></img>
        </Link>

        {item.name && item.create_at ? <GridListTileBar title={item.name} subtitle={item.create_at} /> : ""}
      </GridListTile>
    );
  })

  return (
    <GridList className={classes.grid}>
      {photos}
    </GridList>
  )
}

export default PhotoDisplay