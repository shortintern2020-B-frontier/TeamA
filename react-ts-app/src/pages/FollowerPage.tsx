import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from '@material-ui/core/Container';
import MDSpinner from 'react-md-spinner';
import { getMyRelation } from "../api"
import { asyncLocalStorage } from "../utils"
import useLoginRedirect from '../hooks/useLoginRedirect'
import ErrorMessage from './../components/ErrorMessage'
import UserList from "./../components/UserList"

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
            <ErrorMessage message={errorMessage} />{
                location && myRelation ?
                    <UserList users={location.pathname === "/follower" ? myRelation?.follower : myRelation.followee} /> :
                    <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>
            }

        </Container >
    )
}

export default FollowerPage;