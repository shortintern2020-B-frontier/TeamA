import React from "react";
// import LensIcon from '@material-ui/icons/Lens';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

interface BadgeType {
  mealName: string;
  badgeLevel: number;
}

const BadgeComponent: React.FC<BadgeType> = (props) => {
  return (
    <Card>
      <CardContent>
        <CardMedia
          title={props.mealName}
          component="img"
          src="https://illust8.com/wp-content/uploads/2018/07/medal_ribbon_gold_illust_528.png"
        />
        <Typography>料理名：{props.mealName}</Typography>
        <Typography>バッチレベル：{props.badgeLevel}</Typography>
      </CardContent>
    </Card>
  )
}





interface Props {
  earnedBadges: BadgeType[];
}

const EarnBadge: React.FC<Props> = (props) => {
  return (<BadgeComponent mealName={props.earnedBadges[0].mealName} badgeLevel={props.earnedBadges[0].badgeLevel} />)
}

export default EarnBadge;
