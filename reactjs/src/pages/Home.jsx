import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { MdNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';
import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import LoginButton from '../components/buttons/LoginButton';
import SkeletonCard from '../components/SkeletonCard';
import TrackCard from '../components/TrackCard';
import { UserContext } from '../contexts/UserContext';

const API_BASE_URL = import.meta.env.API_BASE_URL;

export default function Home() {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const [disableSearch, setDisableSearch] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [values, setValues] = useState({
    id: '',
    q: '',
    type: 'track',
    market: 'US',
    limit: 12,
    offset: 0,
  });

  useEffect(() => {
    if (!values.id && userLoggedIn) {
      setValues({
        ...values,
        id: JSON.parse(localStorage.getItem('tokenID')),
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

  const handleSubmit = async (e, nextPage, previousPage) => {
    e.preventDefault();

    setIsSearching(true);

    let newOffset = values.offset;
    if (nextPage) {
      newOffset += 12;
      window.scrollTo(0, 0);
    }

    if (previousPage) {
      newOffset -= 12;
      window.scrollTo(0, 0);
    }

    if (!nextPage && !previousPage) {
      newOffset = 0;
    }

    const queryParams = new URLSearchParams({
      ...values,
      offset: newOffset,
    });

    let responseData = {};
    try {
      responseData = await fetch(`${API_BASE_URL}/spotify/v1/search?${queryParams}`).then(
        (response) => response.json(),
      );
    } catch (error) {
      console.error(error.message || 'Unexpected Error');
    }

    if (responseData.message === 'Unauthorized') {
      localStorage.removeItem('tokenID');
      setUserLoggedIn(false);
    } else {
      parseResults(responseData);
    }

    setValues({ ...values, offset: newOffset });
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
        const followers = new Intl.NumberFormat().format(item.followers?.total);

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
    <>
      <MainStyled>
        {userLoggedIn ? (
          <>
            <H1Styled>What Do You Want To Hear?</H1Styled>
            <FormStyled
              onSubmit={(e) => {
                handleSubmit(e, false, false);
              }}
            >
              <InputStyled
                type="text"
                id="query"
                placeholder={`Enter the ${values.type}'s name`}
                name="q"
                value={values.q}
                required
                aria-label="Search"
                onChange={(e) => {
                  handleInput(e);
                }}
              />
              <SelectStyled
                name="type"
                id="type"
                value={values.type}
                aria-label="Select Media Type"
                onChange={(e) => handleInput(e)}
              >
                <option value="track" defaultValue={true}>
                  Tracks
                </option>
                <option value="artist">Artists</option>
                <option value="album">Albums</option>
              </SelectStyled>

              <ButtonStyled type="submit" disabled={disableSearch}>
                Search
              </ButtonStyled>
            </FormStyled>
            <SectionStyled>
              {results && results.length === 0 ? (
                <H2Styled>Sorry! No Results Found.</H2Styled>
              ) : null}
              <DivStyled>{isSearching ? skeletons : results}</DivStyled>
            </SectionStyled>
            {results && results.length > 0 ? (
              <PageNavDivStyled>
                {values.offset > 0 ? (
                  <PageButtonStyled onClick={(e) => handleSubmit(e, false, true)} type="button">
                    <MdOutlineNavigateBefore size={24} aria-label="Previous Page" />
                    Previous
                  </PageButtonStyled>
                ) : null}
                <PageButtonStyled onClick={(e) => handleSubmit(e, true, false)} type="button">
                  Next
                  <MdNavigateNext size={24} aria-label="Next Page" />
                </PageButtonStyled>
              </PageNavDivStyled>
            ) : null}
          </>
        ) : (
          <>
            <H1Styled>To Begin Your Search For Great Music...</H1Styled>
            <LoginButton />
          </>
        )}
      </MainStyled>
      <BackgroundStyled
        src={'https://images.pexels.com/photos/210766/pexels-photo-210766.jpeg'}
        alt="A man playing a guitar."
      />
    </>
  );
}

const MainStyled = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const BackgroundStyled = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center center;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  z-index: -1;
`;

const H1Styled = styled.h1`
  margin: 0;
  text-align: center;
  color: #ffffff;
`;

const H2Styled = styled.h2`
  padding: 1rem;
  color: #ffffff;
  text-align: center;
  background-color: #168d40;
  border-radius: 0.5rem;
`;

const FormStyled = styled.form`
  width: 100%;
  max-width: 768px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
  justify-content: center;
  padding: 1rem;
  background-color: #121212;
  border-radius: 0.5rem;
  @media (min-width: 640px) {
    padding: 0.375rem;
    flex-direction: row;
    border-radius: 500px;
    align-items: center;
    justify-content: space-between;
  }
`;

const SelectStyled = styled.select`
  padding: 0.5rem 1rem;
  background-color: #1f1f1f;
  color: #ffffff;
  border: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: outline 0.25s ease;
  outline: 2px solid transparent;
  &:focus,
  &focus-visible {
    outline: 2px solid #1db954;
  }
  @media (min-width: 640px) {
    border-radius: 500px;
  }
`;

const InputStyled = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  background-color: #1f1f1f;
  color: #ffffff;
  border: none;
  text-align: center;
  border-radius: 0.25rem;
  transition: outline 0.25s ease;
  outline: 2px solid transparent;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: bold;

  &:focus,
  &focus-visible {
    outline: 2px solid #1db954;
  }
  @media (min-width: 640px) {
    border-radius: 500px;
    text-align: left;
  }
`;

const ButtonStyled = styled.button`
  background-color: #1db954;
  color: #000000;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.25s ease;
  &:hover {
    background-color: #168d40;
  }
  @media (min-width: 640px) {
    border-radius: 500px;
  }
  &:disabled {
    cursor: not-allowed;
    color: #ffffff;
    background-color: #1f1f1f;
  }
`;

const PageButtonStyled = styled.button`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  background-color: #1f1f1f;
  color: #ffffff;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #121212;
  }
  @media (min-width: 1024px) {
    flex: none;
  }
`;

const PageNavDivStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SectionStyled = styled.section`
  width: 100%;
`;

const DivStyled = styled.div`
  margin: 1rem 0 0 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
