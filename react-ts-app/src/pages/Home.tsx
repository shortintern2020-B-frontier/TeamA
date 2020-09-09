import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import './../css/home.css'
import { asyncLocalStorage } from './../utils'

const Home: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const f = async () => {
      const token = await asyncLocalStorage.getItem('access_token')
      if (token !== '0') {
        history.push('/timeline')
      }
    }
    f()
  }, [])

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>
      <h3 className="h3">Home画面</h3>
      <p>作成中</p>
      <button onClick={() => history.push('/login')}>Loginする</button>
    </>
  )
}

export default Home;