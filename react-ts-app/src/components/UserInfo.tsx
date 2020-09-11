// Kudo

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from "@material-ui/core/styles";
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
  main: {
    margin: "20px 20px",
    textAlign: 'center'
  },
  badge: {
    margin: "10px 10px"
  },
  link: {
    color: "inherit"
  }
});

interface Props {
  followee: number;
  followers: number;
  totalBadge: number;
  totalPoint: number;
  userId?: string;
}

const UserInfo: React.FC<Props> = (props) => {
  const { followee, followers, totalBadge, totalPoint, userId } = props
  const classes = useStyles()
  return (
    <div className={classes.main}>
      <Link className={classes.link} href={userId ? `/${userId}/followee` : "/followee"}>
        <Badge className={classes.badge} badgeContent={followee} showZero color="secondary">フォロー</Badge>
      </Link>
      <Link className={classes.link} href={userId ? `/${userId}/follower` : "/follower"}>
        <Badge className={classes.badge} badgeContent={followers} showZero color="secondary">フォロワー</Badge>
      </Link>
      <Link className={classes.link} href={userId ? `/${userId}/status` : "/mystatus"}>
        <Badge className={classes.badge} badgeContent={totalBadge} showZero max={100000} color="secondary">バッジ</Badge>
      </Link>
      <Link className={classes.link} href={userId ? `/${userId}/status#point` : "/mystatus"}>
        <Badge className={classes.badge} badgeContent={totalPoint} showZero max={100000} color="secondary">ポイント</Badge>
      </Link>
    </div>
  )
}

export default UserInfo