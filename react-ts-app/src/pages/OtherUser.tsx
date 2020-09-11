// Ohmura

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import MDSpinner from 'react-md-spinner';
import Button from '@material-ui/core/Button';
import { asyncLocalStorage } from "../utils"
import { getOtherPage, getMyRelation, follow, unfollow } from "./../api"
import useLoginRedirect from '../hooks/useLoginRedirect'
import ErrorMessage from './../components/ErrorMessage'
import PhotoDisplay from '../components/PhotoDisplay'
import UserInfo from '../components/UserInfo'

interface Post {
  post_id: number;
  image_url: string;
}

interface State {
  post_id: Post[];
  follwers: number;
  followees: number;
  total_badge: number;
  total_point: number;
  name: string;
}

interface User {
  user_id: number;
  name: string;
}

interface Relation {
  follower: User[];
  followee: User[];
}


const useStyles = makeStyles({
  notFollowed: {
    backgroundColor: "#f4a361",
    color: "white"
  },
  followed: {
    backgroundColor: "white",
    color: "#f4a361",
    border: "solid #f4a361"
  }
})

const OtherUser: React.FC = () => {
  const [userInfo, setUserInfo] = useState<State>()
  const [myRelation, setMyRelation] = useState<Relation>();
  const [errorMessage, setErrorMessage] = useState(null);
  const [flag, setFlag] = useState(false);
  const [token, setToken] = useState("");
  const [isFollowee, setIsFollowee] = useState(false);

  const classes = useStyles()

  const path = useLocation().pathname;
  const user_id = path.match(/\/([0-9]+)\/mypage/u)![1];
  useLoginRedirect()

  useEffect(() => {
    const f = async () => {
      const jwtToken: any = await asyncLocalStorage.getItem("access_token").catch(err => console.log(err))
      setToken(jwtToken)
      let tempRelation: Relation = {
        follower: [],
        followee: []
      };
      let tempUserInfo: State = {
        post_id: [],
        follwers: 0,
        followees: 0,
        total_badge: 0,
        total_point: 0,
        name: "",
      }
      await getMyRelation(jwtToken)
        .then(res => {
          setMyRelation(res)
          tempRelation = res;
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
      await getOtherPage(jwtToken, user_id)
        .then(res => {
          setUserInfo(res)
          tempUserInfo = res;
        })
        .catch(err => setErrorMessage(err.message))
      setIsFollowee(tempRelation ? tempRelation.followee.some(item => item.name === tempUserInfo?.name) : false);
    }
    f();

  }, [flag]);

  const handleFollow = async () => {
    await follow(token, user_id);
    window.location.reload();
  }

  const handleUnfollow = async () => {
    await unfollow(token, user_id);
    window.location.reload();
  }

  console.log(isFollowee)

  return (
    <Container component="main" maxWidth="xs">
      <ErrorMessage message={errorMessage} />
      {userInfo ?
        (
          <div>
            <h3>{userInfo.name}</h3>
            <Button fullWidth
              className={isFollowee ? classes.followed : classes.notFollowed}
              onClick={() => {
                setFlag(!flag);
                isFollowee ? handleUnfollow() : handleFollow();
              }}
            >
              フォロー{isFollowee ? "中" : ""}
            </Button>
            <UserInfo
              followee={userInfo.followees}
              followers={userInfo.follwers}
              totalBadge={userInfo.total_badge}
              totalPoint={userInfo.total_point}
              userId={user_id}
            />
            <PhotoDisplay post_id={userInfo.post_id} />
          </div>
        )
        : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>
      }
    </Container>
  )
}

export default OtherUser;