import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from "./components/Header"
import Home from "./pages/Home"
import Post from "./pages/Post"
import EarnBadge from "./pages/EarnBadge"
import MyPage from "./pages/MyPage"
import MyStatus from "./pages/MyStatus"
import OtherUser from "./pages/OtherUser"
import OtherUserStatus from "./pages/OtherUserStatus"
import Ranking from "./pages/Ranking"
import Timeline from "./pages/Timeline"
import UserRelation from "./pages/UserRelation"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import SearchPage from "./pages/SearchPage"
import FollowerPage from "./pages/FollowerPage"
import OtherUserFollower from "./pages/OtherUserFollower"

import './css/index.css'

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/mystatus" component={MyStatus} />
          <Route exact path="/ranking" component={Ranking} />
          <Route exact path="/timeline" component={Timeline} />
          <Route exact path="/ff" component={UserRelation} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/earn_badge" component={EarnBadge} />
          <Route exact path="/:user_id/mypage" component={OtherUser} />
          <Route exact path="/:user_id/status" component={OtherUserStatus} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/follower" component={FollowerPage} />
          <Route exact path="/followee" component={FollowerPage} />
          <Route exact path="/:user_id/follower" component={OtherUserFollower} />
          <Route exact path="/:user_id/followee" component={OtherUserFollower} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
