import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  font-size: 150%;
  font-weight: normal;
`;

interface Props {
  children: JSX.Element[] | JSX.Element | string,
}

export default ({ children }: Props) => (
  <Heading>
    { children }
  </Heading>
);

