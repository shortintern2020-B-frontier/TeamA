import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
  main: {
    margin: "20px 20px",
    textAlign: 'center'
  },
  badge: {
    margin: "10px 10px"
  }
})

interface Props {
  followee: number
  followers: number
  totalBadge: number
  totalPoint: number
}

const UserInfo: React.FC<Props> = (props) => {
  const { followee, followers, totalBadge, totalPoint } = props
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Badge className={classes.badge} badgeContent={followee} showZero color="secondary">フォロー</Badge>
      <Badge className={classes.badge} badgeContent={followers} showZero color="secondary">フォロワー</Badge>
      <Badge className={classes.badge} badgeContent={totalBadge} showZero max={100000} color="secondary">バッジ</Badge>
      <Badge className={classes.badge} badgeContent={totalPoint} showZero max={100000} color="secondary">ポイント</Badge>
    </div>
  )
}

export default UserInfo