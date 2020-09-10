import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import MDSpinner from 'react-md-spinner';

import { asyncLocalStorage } from "../utils"
import { getOtherPage } from "./../api"
import useLoginRedirect from '../hooks/useLoginRedirect'
import ErrorMessage from './../components/ErrorMessage'
import PhotoDisplay from '../components/PhotoDisplay'
import UserInfo from '../components/UserInfo'

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
  useLoginRedirect()

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
      {userInfo ? (
        <UserInfo followee={userInfo.followees} followers={userInfo.follwers} totalBadge={userInfo.total_badge} totalPoint={userInfo.total_point} userId={user_id} />
      ) : null}
      {userInfo ?
        <PhotoDisplay post_id={userInfo.post_id} />
        : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>
      }
    </Container>
  )
}

export default OtherUser;