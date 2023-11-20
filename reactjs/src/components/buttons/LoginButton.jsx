import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginButton = () => {
    const API_BASE_URL = import.meta.env.API_BASE_URL;

    return (
        <LinkStyled to={`${API_BASE_URL}/spotify/v1/login`} reloadDocument>
            Connect To Spotify
        </LinkStyled>
    );
};

export default LoginButton;

const LinkStyled = styled(Link)`
    background-color: #1db954;
    color: #000000;
    border: none;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.25s ease;
    &:hover {
        background-color: #168d40;
    }
`;
