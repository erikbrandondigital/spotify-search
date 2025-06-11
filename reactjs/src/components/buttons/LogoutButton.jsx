import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const LogoutButton = (props) => {
  const handleLogout = async () => {
    const API_BASE_URL = import.meta.env.API_BASE_URL;
    localStorage.removeItem('tokenID');

    await fetch(`${API_BASE_URL}/spotify/v1/logout?id=${props.id}`)
      .then((response) => {
        response.json();
      })
      .catch((error) => {
        console.error(error.message) || 'Unexpected Error';
      });

    window.location.href = API_BASE_URL;
  };

  return (
    <ButtonStyled
      onClick={() => {
        handleLogout();
      }}
    >
      Log Out
    </ButtonStyled>
  );
};

export default LogoutButton;

LogoutButton.propTypes = { id: PropTypes.string.isRequired };

const ButtonStyled = styled.button`
  background-color: #1db954;
  color: #000000;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Plus Jakarta Sans', sans-serif;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.25s ease;
  &:hover {
    background-color: #168d40;
  }
`;
