import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MDSpinner from 'react-md-spinner';
import Container from '@material-ui/core/Container';

import { getMyUserInfo } from "./../api"
import { asyncLocalStorage } from '../utils'
import useLoginRedirect from '../hooks/useLoginRedirect'
import LogoutButton from '../components/LogoutButton'
import ErrorMessage from './../components/ErrorMessage'
import PhotoDisplay from '../components/PhotoDisplay'
import UserInfo from '../components/UserInfo'

// const Image = require('react-image-resizer/Image')
// import Image from 'react-image-resizer';


interface Post {
  post_id: number;
  image_url: string;
}

interface State {
  post_id: Post[];
  followers: number;
  followees: number;
  total_badge: number;
  total_point: number;
  name: string;
}

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<State>()
  const [errorMessage, setErrorMessage] = useState(null);
  useLoginRedirect()
  const history = useHistory();

  useEffect(() => {
    const f = async () => {
      const jwtToken = await asyncLocalStorage.getItem('access_token')
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
    <Container maxWidth="xs">
      <div className="back_mypage">
        <h3 id="h3_back" className="animate__animated animate__jello">My Photos</h3>
      </div>
      <ErrorMessage message={errorMessage} />
      <h3>{userInfo ? userInfo.name : ""}</h3>

      {userInfo ? (
        <UserInfo followee={userInfo.followees} followers={userInfo.followers} totalBadge={userInfo.total_badge} totalPoint={userInfo.total_point} />
      )
        :
        <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
      {userInfo ?
        <PhotoDisplay post_id={userInfo.post_id} />
        : null
      }
      <hr />
      <p style={{ textAlign: 'center' }}>
        <LogoutButton onClick={onClick} />
      </p>
    </Container>
  )
}

export default Home;

