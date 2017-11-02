import React from 'react';
import styled, {keyframes} from 'styled-components';

const H1 = styled.h1`
  color: red;
  background-color: blue;
`
const Button = styled.button`
  // 根据props是否用primary来设置颜色和背景颜色
    background: ${props => props.primary ? 'palevioletred' : 'white'};
    color: ${props => props.primary ? 'white' : 'palevioletred'};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;

const Link = ({ className, children }) => (
    <a className={className}>
        {children}
    </a>
)
const StyledLink = styled(Link)`
    color: palevioletred;
    font-weight: bold;
`;

const TomatoButton = Button.extend`
    color: tomato;
    border-color: tomato;
`;

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;
const Rotate = styled.div`
    display: inline-block;
    animation: ${rotate360} 2s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
`;

export default () => {
  return (
    <div>
      <H1>C1 h1...</H1>
      <Button>Normal</Button>
      <Button primary={true}>Primary</Button>
      <TomatoButton>TomatoButton</TomatoButton>
      <Rotate>rotate.....</Rotate>

      <Link>Unstyled, boring Link</Link>
        <br />
        <StyledLink>Styled, exciting Link</StyledLink>
    </div>
  );
}