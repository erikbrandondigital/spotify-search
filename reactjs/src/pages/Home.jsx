import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '../components/buttons/Button';
import LoginButton from '../components/buttons/LoginButton';
import { UserContext } from '../contexts/UserContext';

const API_BASE_URL = import.meta.env.API_BASE_URL;

export default function Home() {
    const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
    const [values, setValues] = useState({
        id: '',
        q: '',
        type: 'track',
        market: 'US',
        limit: 10,
        offset: 0
    });

    useEffect(() => {
        if (userLoggedIn) {
            setValues({
                ...values,
                id: JSON.parse(localStorage.getItem('tokenID'))
            });
        }
    }, [userLoggedIn, values, setValues]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(values);

        let responseData = {};
        try {
            responseData = await fetch(
                `${API_BASE_URL}/spotify/v1/search?${queryParams}`
            ).then((response) => response.json());
        } catch (error) {
            console.log(error.message || 'Unexpected Error');
        }

        if (responseData.message === 'Unauthorized') {
            localStorage.removeItem('tokenID');
            setUserLoggedIn(false);
        }

        console.log(responseData);
    };

    return (
        <MainStyled>
            {userLoggedIn ? (
                <>
                    <h1>What Would You Like To Listen To?</h1>
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <select
                            name='type'
                            id='type'
                            value={values.type}
                            onChange={(e) => handleInput(e)}
                        >
                            <option value='track' defaultValue={true}>
                                Track
                            </option>
                            <option value='artist'>Artist</option>
                            <option value='album'>Album</option>
                        </select>
                        <label htmlFor='query'>
                            <input
                                type='text'
                                id='query'
                                name='q'
                                value={values.q}
                                onChange={(e) => {
                                    handleInput(e);
                                }}
                            ></input>
                        </label>
                        <Button type='submit' text='Search' />
                    </form>
                </>
            ) : (
                <>
                    <h1>To Begin Your Search For Great Music...</h1>
                    <LoginButton />
                </>
            )}
        </MainStyled>
    );
}

const MainStyled = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
