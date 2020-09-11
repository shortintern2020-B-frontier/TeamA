// Ohmura

import React from "react";
import { useLocation } from "react-router-dom";
// import LensIcon from '@material-ui/icons/Lens';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

interface BadgeType {
  meal_name: string;
  badge_level: number;
}

const BadgeComponent: React.FC<BadgeType | undefined> = (props) => {
  return (
    <Card style={{ height: 250, width: 200 }}>
      <CardContent>
        <CardMedia
          title={props.meal_name}
          component="img"
          src="https://illust8.com/wp-content/uploads/2018/07/medal_ribbon_gold_illust_528.png"
        />
        <Typography>料理名：{props.meal_name}</Typography>
        <Typography>バッチレベル：{props.badge_level}</Typography>
      </CardContent>
    </Card>
  )
}





interface Props {
  earnedBadges: BadgeType[] | undefined;
}

const EarnBadge: React.FC<Props> = (props) => {
  const createBadges = () => props.earnedBadges ? props.earnedBadges.map(
    (item, index) => <BadgeComponent meal_name={item.meal_name} badge_level={item.badge_level} key={index} />
  ) : null;
  return <div>{createBadges()}</div>
}

export default EarnBadge;