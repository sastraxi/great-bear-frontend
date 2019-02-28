import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LocationDescriptor } from 'history';

interface Props {
  to?: LocationDescriptor
  centered?: boolean
}

const LogoWrap = styled.p<Props>`
  margin: 0;
  font-weight: bold;
  font-size: 150%;
  letter-spacing: 5px;
  text-align: ${props => props.centered ? 'center' : 'left'}

  color: black;
`;

export default (props: Props) => {
  const { to, ...restProps } = props;
  const innerLogo = (<LogoWrap {...restProps}>GREAT ⭑ BEAR</LogoWrap>);
  if (to) {
    return (
      <Link to={to}>
        { innerLogo }
      </Link>
    );
  }
  return innerLogo;
};

