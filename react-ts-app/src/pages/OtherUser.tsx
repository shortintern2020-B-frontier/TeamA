import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MDSpinner from 'react-md-spinner';

import { asyncLocalStorage } from "../utils"
import { getOtherPage } from "./../api"
import ErrorMessage from './../components/ErrorMessage'
import PhotoDisplay from '../components/PhotoDisplay'
import Container from '@material-ui/core/Container';

const mockUserInfo = {
  post: [
    { post_id: 1, image_url: "https://images.unsplash.com/photo-1599335937498-90b82b84d603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" },
    { post_id: 2, image_url: "https://images.unsplash.com/photo-1599430207421-f0191e3ae2e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" }
  ],
  follower: 2,
  followees: 3,
  total_badge: 12,
  total_point: 34
}

interface Post {
  post_id: number
  image_url: string
}

interface State {
  post_id: Post[]
  follwers: number
  followees: number
  total_badge: number
  total_point: number
}

const useStyles = makeStyles({
  image: {
    width: "250px",
    height: "250px",
    objectFit: "cover"
  }
})

const OtherUser: React.FC = () => {
  const [userInfo, setUserInfo] = useState<State>()
  const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles()

  const path = useLocation().pathname;
  const user_id = path.split("/")[1];

  useEffect(() => {
    const f = async () => {
      const jwtToken: any = await asyncLocalStorage.getItem("access_token").catch(err => console.log(err))
      await getOtherPage(jwtToken, user_id)
        .then(r => setUserInfo(r))
        .catch(err => setErrorMessage(err.message))
    }
    f()
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <ErrorMessage message={errorMessage} />
      {/* <p>フォロー数：{userInfo.follwees}</p>
      <p>フォロワー数：{userInfo.follewers}</p> */}
      {userInfo ? (
        <div>
          <p>フォロー数：{userInfo.followees}</p>
          <p>フォロワー数：{userInfo.follwers}</p>
          <p>トータルバッチ：{userInfo.total_badge}</p>
          <p>トータルポイント：{userInfo.total_point}</p>
        </div>
      ) : <MDSpinner size={56} />}
      {userInfo ?
        <PhotoDisplay post_id={userInfo.post_id} />
        : null
      }
    </Container>
  )
}

export default OtherUser;