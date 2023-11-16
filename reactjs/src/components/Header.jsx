import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoutButton from './buttons/LogoutButton';
import { PropTypes } from 'prop-types';

const Header = (props) => {
    return (
        <HeaderStyled>
            <Link to='/'>
                <ImageStyled src='/spotify-logo.svg' alt='Spotify Logo' />
            </Link>
            {props.loggedIn ? (
                <LogoutButton
                    id={JSON.parse(localStorage.getItem('tokenID'))}
                />
            ) : null}
        </HeaderStyled>
    );
};

export default Header;

Header.propTypes = {
    loggedIn: PropTypes.bool.isRequired
};

const HeaderStyled = styled.header`
    background-color: #000000;
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ImageStyled = styled.img`
    width: 64px;
    height: 64px;
    aspect-ratio: 1;
`;
