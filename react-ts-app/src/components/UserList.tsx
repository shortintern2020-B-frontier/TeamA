import React from 'react'
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from "@material-ui/core/TableBody";
import TableCell from '@material-ui/core/TableCell';

interface User {
    user_id: number;
    name: string;
}



const CreateList: React.FC<User> = (props) => {
    const { user_id, name } = props;
    const history = useHistory();

    const onClick = () => {
        const path = user_id + '/mypage'
        history.push(path);
    };

    return (
        <TableRow key={user_id}>
            <TableCell onClick={onClick}>
                {name}
            </TableCell>
        </TableRow>
    )
}

interface Props {
    users: User[]
}

const UserList: React.FC<Props> = (props) => {

    const List = props.users.map(data => {
        return (
            <CreateList key={data.user_id} user_id={data.user_id} name={data.name} />
        )
    })

    return (
        <Table>
            {/* <TableHead>
        <TableRow>
          <TableCell>名前</TableCell>
          <TableCell>バッジ数</TableCell>
          <TableCell>ポイント</TableCell>
        </TableRow>
      </TableHead> */}
            <TableBody>
                {List}
            </TableBody>
        </Table>
    )
}

export default UserList