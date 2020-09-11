// Ohmura

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from '@material-ui/core/Container';
import MDSpinner from 'react-md-spinner';
import { getOtherRelation } from "../api"
import { asyncLocalStorage } from "../utils"
import useLoginRedirect from '../hooks/useLoginRedirect'
import ErrorMessage from './../components/ErrorMessage'
import UserList from "./../components/UserList"

interface User {
  user_id: number;
  name: string;
}

interface Relation {
  follower: User[];
  followee: User[];
}

const FollowerPage: React.FC = () => {
  const [relation, setRelation] = useState<Relation>();
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const user_id = location.pathname.match(/\/([0-9]+)\/followe[er]/u)![1];

  useLoginRedirect()
  useEffect(() => {
    const f = async () => {
      const jwtToken: any = await asyncLocalStorage.getItem("access_token").catch(err => console.log(err))
      await getOtherRelation(jwtToken, user_id)
        .then(res => {
          setRelation(res)
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    };
    f()
  }, [])

  console.log(relation)


  return (
    <Container maxWidth='xs'>
      <ErrorMessage message={errorMessage} />
      <h3>{location.pathname.match(/\/\d+\/follower/u) ? "フォロされている" : "フォローしている"}ユーザー</h3>
      {
        location && relation ?
          <UserList users={location.pathname.match(/\/\d+\/follower/u) ? relation?.follower : relation.followee} /> :
          <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>
      }

    </Container >
  )
}

export default FollowerPage;