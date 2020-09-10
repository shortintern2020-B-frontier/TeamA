import React from "react";
import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import './../css/home.css'

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <Container maxWidth='xs' style={{ textAlign: 'center' }}>
      <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>
      <div className="back_mypage">
        <h3 id="h3_back">サービス名</h3>
      </div>
      <p>あなたの自炊をサポートします</p>
      <Link onClick={() => history.push('/login')}>サービスを使ってみる</Link>
    </Container>
  )
}

export default Home;