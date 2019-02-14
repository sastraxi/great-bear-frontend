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
  if (props.to) {
    return (
      <Link to={props.to}>
        <LogoWrap>GREAT ⭑ BEAR</LogoWrap>
      </Link>
    );
  }
  return (
    <LogoWrap>GREAT ⭑ BEAR</LogoWrap>
  );
};

