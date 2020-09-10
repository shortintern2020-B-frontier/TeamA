import React from 'react';
import { useHistory } from "react-router-dom";

import Link from '@material-ui/core/Link';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

interface Props {
  user_id: number
  name: string
  total_badge: number
  total_point: number
}

const BadgeRanker: React.FC<Props> = (props) => {
  const { user_id, name, total_badge, total_point } = props;
  const history = useHistory();

  const onClick = () => {
    const path = user_id + '/mypage'
    history.push(path);
  };

  return (
    <TableRow key={user_id}>
      <TableCell>
        <Link style={{ color: '#f4a460' }} href="" onClick={onClick}>{name}</Link>
      </TableCell>
      <TableCell>{total_badge}</TableCell>
      <TableCell>{total_point}</TableCell>
    </TableRow>
  )
}

export default BadgeRanker;