// Ohmura

import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import MDSpinner from 'react-md-spinner';
import { getMealName, mealSearch } from "../api"
import useLoginRedirect from '../hooks/useLoginRedirect'
import PhotoDisplay from '../components/PhotoDisplay'
import ErrorMessage from './../components/ErrorMessage'
import Search from './../components/Search'

const useStyles = makeStyles({
    textForm: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "yellow"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "yellow"
        },
        backgroundColor: '#fff',
        height: 'auto',
        borderRadius: '5px',
    },
})

interface Post {
    post_id: number;
    user_id: number;
    image_url: string;
    meal_url: string;
}

interface Result {
    meal_name: string;
    post: Post[];
}

const Timeline: React.FC = () => {
    const [mealName, setMealName] = useState([{ meal_name: "" }]);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [result, setResult] = useState<Result>();
    const [searching, setSearching] = useState(false);
    const classes = useStyles();

    useLoginRedirect()
    useEffect(() => {
        const f = async () => {
            await getMealName()
                .then(res => {
                    setMealName(res.results)
                })
                .catch((err) => {
                    setErrorMessage(err.message);
                });
        };
        f()
    }, [])

    const handleMealSearch = async () => {
        setSearching(true);
        await mealSearch({ meal_name: searchKey })
            .then(res => {
                setResult(res)
            })
            .catch(err => {
                setErrorMessage(err.message);
            });

    }

    return (
        <Container maxWidth='xs'>
            <ErrorMessage message={errorMessage} />
            <div style={{ display: "flex", marginTop: 10 }}>
                <Search option={mealName} onChange={setSearchKey} />
                <button onClick={handleMealSearch}>検索</button>
            </div>
            {result ?
                (<div>
                    <p>検索結果：{result.meal_name}</p>
                    <PhotoDisplay post_id={result.post} />
                </div>
                )
                : (searching ?
                    <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p> :
                    null)
            }
        </Container >
    )
}

export default Timeline;