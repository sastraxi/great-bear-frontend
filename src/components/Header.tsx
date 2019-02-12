import React from 'react';
import styled from 'styled-components';
import UserMenu from './UserMenu';
import ShoppingCartIcon from './ShoppingCartIcon';

const SPACE_BETWEEN = '15px';

const Logo = styled.span`
  font-weight: bold;
  font-size: 150%;
  letter-spacing: 5px;
`;

const Container = styled.div`
  display: flex;
  align-items: baseline;

  & > * {
    margin-left: ${SPACE_BETWEEN};
    &:first-child {
      flex-grow: 1;
      margin-left: 0;
    }
  }
`;

const Header = ({ }) => (
  <Container>
    <Logo>GREAT ⭑ BEAR</Logo>
    <ShoppingCartIcon />
    <UserMenu />
  </Container>
);

export default Header;
