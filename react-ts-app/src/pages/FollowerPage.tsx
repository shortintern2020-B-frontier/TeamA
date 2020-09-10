import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from '@material-ui/core/Container';
import MDSpinner from 'react-md-spinner';
import { getMyRelation } from "../api"
import { asyncLocalStorage } from "../utils"
import useLoginRedirect from '../hooks/useLoginRedirect'
import ErrorMessage from './../components/ErrorMessage'
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from "@material-ui/core/TableBody";
import TableCell from '@material-ui/core/TableCell';

interface User {
    user_id: number;
    name: string;
}

interface Relation {
    follower: User[];
    followee: User[];
}

const FollowerPage: React.FC = () => {
    const [myRelation, setMyRelation] = useState<Relation>();
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    console.log(location.pathname)
    useLoginRedirect()
    useEffect(() => {
        const f = async () => {
            const jwtToken: any = await asyncLocalStorage.getItem("access_token").catch(err => console.log(err))
            await getMyRelation(jwtToken)
                .then(res => {
                    setMyRelation(res)
                    // console.log(res)
                })
                .catch((err) => {
                    setErrorMessage(err.message);
                });
        };
        f()
    }, [])

    console.log(myRelation)


    return (
        <Container maxWidth='xs'>
            <ErrorMessage message={errorMessage} />
            <div></div>
        </Container >
    )
}

export default FollowerPage;