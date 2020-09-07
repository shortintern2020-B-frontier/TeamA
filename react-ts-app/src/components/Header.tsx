import React from "react"
import { Link } from "react-router-dom"

import AssessmentIcon from '@material-ui/icons/Assessment';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LensIcon from '@material-ui/icons/Lens';


const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>検索</li>
          <li><Link to="/ranking"><AssessmentIcon />ランキング</Link></li>
          <li><Link to="/post"><CameraAltIcon />カメラ（投稿）</Link></li>
          <li><Link to="/mystatus"><LensIcon />メダル</Link></li>
          <li><Link to="/mypage"><PersonIcon />ユーザー（マイページ）</Link></li>
          <li><Link to="timeline"><HomeIcon />ホーム（タイムライン）</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;