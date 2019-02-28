import React from 'react';
import styled from 'styled-components';
import UserMenu from './UserMenu';
import ShoppingCartIcon from './ShoppingCartIcon';
import Logo from '../view/Logo';
import CurrentCart from '../bind/CurrentCart';

const SPACE_BETWEEN = '15px';

const Container = styled.div`
  display: flex;
  align-items: center;

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
    <Logo to="/" />
    <CurrentCart>
      { props => <ShoppingCartIcon {...props} /> }
    </CurrentCart>      
    <UserMenu />
  </Container>
);

export default Header;
