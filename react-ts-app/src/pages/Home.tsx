import React from "react";
import { useHistory } from "react-router-dom";

import Panda from '../css/image/panda.png'
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import './../css/home.css'

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <Container maxWidth='xs' style={{ textAlign: 'center' }}>
      <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>
      <div className="back_home">
        <h2 className="animate__animated animate__fadeIn">Cookle</h2>
        <p id="home_back_p" className="animate__animated animate__fadeIn">あなたの自炊をサポートします</p>
        <div className="home1">
          <h4><span>こんな悩みがあるそうです...</span></h4>
          <h5 className="fas fa-sad-cry">「一人暮らしで自炊が続かない😣💦」</h5>
          <h5 className="fas fa-sad-tear">「コロナで自炊の機会が増えたけど、モチベーションを保てない🤗」</h5>
          <h5 className="fas fa-sad-tear">「インスタに料理垢作ったけど3日坊主になった...😭」</h5>
        </div>
        <div className="home2">
          <h4><i className="far fa-lightbulb"></i><span>その悩み、Cookleで解決しよう！</span></h4>
          <p><img src={Panda} alt="image" /></p>
          <Link style={{ color: 'red' }} onClick={() => history.push('/login')} className="btn"><span>サービスを使ってみる</span></Link>
        </div>
      </div>
    </Container>
  )
}

export default Home;