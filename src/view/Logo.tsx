import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LocationDescriptor } from 'history';

interface Props {
  to?: LocationDescriptor
}

const LogoWrap = styled.span`
  font-weight: bold;
  font-size: 150%;
  letter-spacing: 5px;
`;

export default (props: Props) => {
  const innerLogo = (<LogoWrap>GREAT ⭑ BEAR</LogoWrap>);
  if (props.to) {
    return (
      <Link to={props.to}>
        { innerLogo }
      </Link>
    );
  }
  return innerLogo;
};

