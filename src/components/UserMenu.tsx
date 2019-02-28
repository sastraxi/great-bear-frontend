import React, { useContext, useState } from 'react';
import PopMenu from '../view/PopMenu';
import authContext from './auth/context';
import LogoutButton from './auth/LogoutButton';
import LinkButton from './LinkButton';

/**
 * A simple drop-down menu. Modelled after
 * https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
 */
const UserMenu = () => {
  const { user } = useContext(authContext);
  const [showMenu, setMenuShown] = useState<boolean>(false);

  const toggleMenu = () =>
    setMenuShown(!showMenu);

  const renderMenu = () => (
    <PopMenu top="0px">
      <LinkButton to="/orders">My orders</LinkButton>
      <LogoutButton>Logout</LogoutButton>
    </PopMenu>
  );

  return (
    <div>
      <button onClick={toggleMenu}>
        { user!.email }
      </button>
      <div>
        { showMenu && renderMenu() }
      </div>          
    </div>
  );
};

export default UserMenu;
