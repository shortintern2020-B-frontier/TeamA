import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LogoutButton from '../components/LogoutButton'
import { getMyUserInfo } from "./../api"
import ErrorMessage from './../components/ErrorMessage'
import { asyncLocalStorage } from '../utils'

// const Image = require('react-image-resizer/Image')
// import Image from 'react-image-resizer';


interface Post {
  post_id: number
  image_url: string
}

interface State {
  post_id: Post[]
  followers: number
  followees: number
  total_badge: number
  total_point: number
}

const useStyles = makeStyles({
  image: {
    width: "160px",
    height: "160px",
    objectFit: "cover"
  }
})

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<State>()
  const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles()
  const history = useHistory();

  useEffect(() => {
    const f = async () => {
      const jwtToken = await asyncLocalStorage.getItem('access_token')
      console.log(jwtToken);
      await getMyUserInfo(jwtToken)
        .then(res => {
          setUserInfo(res)
        })
        .catch(err => {
          setErrorMessage(err.message)
        })
    }
    f()
  }, [])

  const onClick = () => {
    asyncLocalStorage.removeItem('access_token')
    history.push('/')
  }

  return (
    <>
      <ErrorMessage message={errorMessage} />
      <h3>My Photo Page</h3>
      {userInfo ? (
        <div>
          <p>フォロー数：{userInfo.followees}</p>
          <p>フォロワー数：{userInfo.followers}</p>
          <p>トータルバッチ：{userInfo.total_badge}</p>
          <p>トータルポイント：{userInfo.total_point}</p>
        </div>
      )
        :
        <p>読み込み中</p>}
      <GridList cellHeight={160} cols={2}>
        {userInfo ?
          userInfo.post_id.map((item) => {
            return (
              <GridListTile key={item.post_id} cols={1}>
                <img className={classes.image} src={item.image_url} alt="dish"></img>
              </GridListTile>
            );
          })
          : <p>読み込み中</p>
        }
      </GridList>
      <LogoutButton onClick={onClick} />
    </>
  )
}

export default Home;

