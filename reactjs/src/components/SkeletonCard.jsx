import styled from 'styled-components';

const SkeletonCard = () => {
    return (
        <ArticleStyled>
            <BlankImageStyled />
            <BlankHeaderStyled />
            <BlankTextStyled />
            <ShimmerDiv />
        </ArticleStyled>
    );
};

export default SkeletonCard;

const ArticleStyled = styled.article`
    padding: 1rem;
    background-color: #121212;
    border-radius: 0.5rem;
    text-decoration: none;
    position: relative;
    overflow: hidden;
`;

const ShimmerDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0) 20%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(0, 0, 0, 0) 80%
    );
    animation: shimmer 1s infinite linear;

    @keyframes shimmer {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(500%);
        }
    }
`;

const BlankImageStyled = styled.div`
    width: 100%;
    height: 300px;
    aspect-ratio: 1;
    border-radius: 0.375rem;
    margin: 0 0 1rem 0;
    background-color: #1f1f1f;
`;

const BlankHeaderStyled = styled.div`
    margin: 0 0 1rem 0;
    display: block;
    height: 2rem;
    background-color: #1f1f1f;
    border-radius: 0.375rem;
`;

const BlankTextStyled = styled.div`
    margin: 0 0 1rem 0;
    display: block;
    height: 1rem;
    background-color: #1f1f1f;
    border-radius: 0.1875rem;
`;
