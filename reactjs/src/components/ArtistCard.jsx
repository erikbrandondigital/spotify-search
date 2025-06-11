import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ArtistCard = (props) => {
  return (
    <LinkStyled to={props.url} target="_blank" aria-label={`Play ${props.name} on Spotify`}>
      <ArticleStyled>
        {props.image ? (
          <ImageStyled src={props.image} alt={`${props.name} Album Artwork`} />
        ) : (
          <PlaceHolderImageStyled src="/spotify-logo.svg" alt="Spotify Logo" />
        )}
        <H2Styled>
          <SpanStyled>{props.name}</SpanStyled>
        </H2Styled>
        <ParagraphStyled>
          <SpanStyled>{props.followers} Followers</SpanStyled>
        </ParagraphStyled>
      </ArticleStyled>
    </LinkStyled>
  );
};

export default ArtistCard;

ArtistCard.propTypes = {
  url: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  followers: PropTypes.string,
};

const LinkStyled = styled(Link)`
  padding: 1rem;
  background-color: #121212;
  border-radius: 0.5rem;
  text-decoration: none;
`;

const ArticleStyled = styled.article``;

const ImageStyled = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  margin: 0 0 1rem 0;
`;

const PlaceHolderImageStyled = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  margin: 0 0 1rem 0;
  filter: grayscale();
`;

const H2Styled = styled.h2`
  color: #ffffff;
  margin: 0 0 0.25rem 0;
`;

const ParagraphStyled = styled.p`
  color: #ffffff;
  margin: 0;
`;

const SpanStyled = styled.span``;
