import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import MDSpinner from 'react-md-spinner';

import { getTimeline, getMealName } from "../api"
import { asyncLocalStorage } from "../utils"
import useLoginRedirect from '../hooks/useLoginRedirect'
import PhotoDisplay from '../components/PhotoDisplay'
import ErrorMessage from './../components/ErrorMessage'
import LogoutButton from '../components/LogoutButton'


interface Post {
  post_id: number;
  user_id: number;
  image_url: string;
  create_at: string;
}


const Timeline: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [mealName, setMealName] = useState([{ meal_name: "" }]);
  const [errorMessage, setErrorMessage] = useState("");
  useLoginRedirect()
  const history = useHistory();
  useEffect(() => {
    const f = async () => {
      const jwtToken: any = await asyncLocalStorage.getItem("access_token").catch(err => console.log(err))
      await getTimeline(jwtToken)
        .then(res => {
          setPosts(res.results);
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
      await getMealName()
        .then(res => {
          setMealName(res.results)
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    };
    f()
  }, [])

  // const handleMealSearch = async () => {
  //   await mealSearch({ meal_name: searchKey })
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       setErrorMessage(err.message);
  //     });
  // }

  const onClick = () => {
    asyncLocalStorage.removeItem('access_token')
    history.push('/')
  }

  return (
    <Container maxWidth='xs'>
      <div className="back_timeline">
        <h3 id="h3_timeline">Timeline</h3>
      </div>
      <ErrorMessage message={errorMessage} />
      {
        posts ?
          <PhotoDisplay post_id={posts} />
          : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>
      }
      <hr />
      <p style={{ textAlign: 'center' }}>
        <LogoutButton onClick={onClick} />
      </p>
    </Container >
  )
}

export default Timeline;