import React from 'react';
import { useLocation, useHistory } from "react-router-dom";

interface Props {
  user_id: number
  name: string
  total_badge: number
  total_point: number
}

const BadgeRanker: React.FC<Props> = (props) => {
  const { user_id, name, total_badge, total_point } = props;
  const path = useLocation().pathname;
  const history = useHistory();

  const onClick = () => {
    const path = user_id + '/mypage'
    console.log(path)
    history.push(path);
  };

  return (
    <ul key={user_id}>
      <li>名前：{name}</li>
      <li>バッジ数：{total_badge}</li>
      <li>ポイント：{total_point}</li>
      <button onClick={onClick}>User Page</button>
    </ul>
  )
}

export default BadgeRanker;