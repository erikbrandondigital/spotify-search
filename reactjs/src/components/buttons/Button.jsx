import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = (props) => {
    return (
        <ButtonStyled onClick={props.onClick} type={props.type}>
            {props.text}
        </ButtonStyled>
    );
};

export default Button;

Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

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
