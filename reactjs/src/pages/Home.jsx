import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import LoginButton from '../components/buttons/LoginButton';
import { UserContext } from '../contexts/UserContext';
import TrackCard from '../components/TrackCard';
import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import SkeletonCard from '../components/SkeletonCard';

const API_BASE_URL = import.meta.env.API_BASE_URL;

export default function Home() {
    const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
    const [disableSearch, setDisableSearch] = useState(true);
    const [isSearching, setIsSearching] = useState(true);
    const [results, setResults] = useState(null);
    const [values, setValues] = useState({
        id: '',
        q: '',
        type: 'track',
        market: 'US',
        limit: 12,
        offset: 0
    });

    useEffect(() => {
        if (!values.id && userLoggedIn) {
            setValues({
                ...values,
                id: JSON.parse(localStorage.getItem('tokenID'))
            });
        }

        if (values.q.length > 0) {
            setDisableSearch(false);
        } else {
            setDisableSearch(true);
            setResults(null);
        }
    }, [userLoggedIn, values, setValues]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSearching(true);

        const queryParams = new URLSearchParams(values);

        let responseData = {};
        try {
            responseData = await fetch(
                `${API_BASE_URL}/spotify/v1/search?${queryParams}`
            ).then((response) => response.json());
        } catch (error) {
            console.error(error.message || 'Unexpected Error');
        }

        if (responseData.message === 'Unauthorized') {
            localStorage.removeItem('tokenID');
            setUserLoggedIn(false);
        } else {
            parseResults(responseData);
        }

        setIsSearching(false);
    };

    const parseResults = (responseData) => {
        let data = [];

        if (responseData.tracks) {
            data = responseData.tracks.items.map((item) => {
                const url = item.external_urls?.spotify;
                const imageURL = item.album.images[1]?.url;
                const trackName = item?.name;
                const artistName = item.artists[0]?.name;

                return (
                    <TrackCard
                        key={item.id}
                        url={url}
                        image={imageURL}
                        name={trackName}
                        artist={artistName}
                    />
                );
            });
        }

        if (responseData.albums) {
            data = responseData.albums.items.map((item) => {
                const url = item.external_urls?.spotify;
                const imageURL = item.images[1]?.url;
                const albumName = item?.name;
                const artistName = item.artists[0]?.name;
                const releaseYear = new Date(item?.release_date).getFullYear();

                return (
                    <AlbumCard
                        key={item.id}
                        url={url}
                        image={imageURL}
                        name={albumName}
                        artist={artistName}
                        year={releaseYear}
                    />
                );
            });
        }

        if (responseData.artists) {
            data = responseData.artists.items.map((item) => {
                const url = item.external_urls?.spotify;
                const imageURL = item.images[1]?.url;
                const artistName = item?.name;
                const followers = new Intl.NumberFormat().format(
                    item.followers?.total
                );

                return (
                    <ArtistCard
                        key={item.id}
                        url={url}
                        image={imageURL}
                        name={artistName}
                        followers={followers}
                    />
                );
            });
        }

        setResults(data);
    };

    const skeletons = Array(values.limit)
        .fill(1)
        .map((card, index) => {
            return <SkeletonCard key={index} />;
        });

    return (
        <MainStyled>
            {userLoggedIn ? (
                <>
                    <H1Styled>What Would You Like To Listen To?</H1Styled>
                    <FormStyled
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <SelectStyled
                            name='type'
                            id='type'
                            value={values.type}
                            onChange={(e) => handleInput(e)}
                        >
                            <option value='track' defaultValue={true}>
                                Tracks
                            </option>
                            <option value='artist'>Artists</option>
                            <option value='album'>Albums</option>
                        </SelectStyled>
                        <label htmlFor='query'>
                            <InputStyled
                                type='text'
                                id='query'
                                placeholder={`Enter the ${values.type}'s name`}
                                name='q'
                                value={values.q}
                                required
                                onChange={(e) => {
                                    handleInput(e);
                                }}
                            />
                        </label>
                        <ButtonStyled type='submit' disabled={disableSearch}>
                            Search
                        </ButtonStyled>
                    </FormStyled>
                    <SectionStyled>
                        {results && results.length === 0 ? (
                            <H2Styled>Sorry! No Results Found.</H2Styled>
                        ) : null}
                        <DivStyled>
                            {isSearching ? skeletons : results}
                        </DivStyled>
                    </SectionStyled>
                </>
            ) : (
                <>
                    <H1Styled>To Begin Your Search For Great Music...</H1Styled>
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
    padding: 2rem;
    background-color: #000000;
`;

const H1Styled = styled.h1`
    color: #ffffff;
`;

const H2Styled = styled.h2`
    color: #ffffff;
`;

const FormStyled = styled.form`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 0.375rem;
    background-color: #121212;
    border-radius: 500px;
`;

const SelectStyled = styled.select`
    padding: 0.375rem 2.25rem;
    background-color: #121212;
    color: #ffffff;
    border: none;
    font-weight: bold;
    border-radius: 1rem:
`;

const InputStyled = styled.input`
    padding: 0.375rem 2.25rem;
    background-color: #121212;
    color: #ffffff;
    border: none;
    border-radius: 1rem:
`;

const ButtonStyled = styled.button`
    background-color: #1db954;
    color: #ffffff;
    border: none;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background-color: #168d40;
    }
`;

const SectionStyled = styled.section``;

const DivStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
`;
