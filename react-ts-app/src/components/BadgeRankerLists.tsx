// Kudo

import React from 'react'

import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from "@material-ui/core/TableBody";
import TableCell from '@material-ui/core/TableCell';

import BadgeRanker from './BadgeRankerList'

interface BadgeRank {
  user_id: number;
  name: string;
  badge: number;
  point: number;
}

interface Props {
  badgeList: BadgeRank[]
}

const BadgeRankerList: React.FC<Props> = (props) => {

  const List = props.badgeList.map(data => {
    return (
      <BadgeRanker key={data.user_id} user_id={data.user_id} name={data.name} total_point={data.point} total_badge={data.badge} />
    )
  })

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>名前</TableCell>
          <TableCell>バッジ数</TableCell>
          <TableCell>ポイント</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {List}
      </TableBody>
    </Table>
  )
}

export default BadgeRankerList