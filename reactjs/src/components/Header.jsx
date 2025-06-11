import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoutButton from './buttons/LogoutButton';

const Header = (props) => {
  return (
    <HeaderStyled>
      <LinkStyled to="/">
        <ImageStyled src="/spotify-logo.svg" alt="Spotify Logo" />
      </LinkStyled>
      {props.loggedIn ? <LogoutButton id={JSON.parse(localStorage.getItem('tokenID'))} /> : null}
    </HeaderStyled>
  );
};

export default Header;

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const LinkStyled = styled(Link)`
  display: contents;
`;

const HeaderStyled = styled.header`
  padding: 1rem 2rem;
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
