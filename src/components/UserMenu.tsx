import React, { Component, createRef } from 'react';
import PopMenu from '../view/PopMenu';
import LogoutButton from './auth/LogoutButton';
import LinkButton from './LinkButton';

type UserMenuState = {
  showMenu: boolean,
};

/**
 * A simple drop-down menu. Modelled after
 * https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
 */
class UserMenu extends Component<{}, UserMenuState> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  menuRef = createRef<HTMLDivElement>();

  showMenu(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event: MouseEvent) {    
    if (!this.menuRef.current ||
        !this.menuRef.current!.contains(event.target as Element))
    {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
    }
  }

  renderMenu() {
    return (
      <PopMenu top="0px">
        <LinkButton to="/orders">My orders</LinkButton>
        <LogoutButton>Logout</LogoutButton>
      </PopMenu>
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          user@email.com
        </button>
        <div ref={this.menuRef}>
          { this.state.showMenu && this.renderMenu() }
        </div>          
      </div>
    );
  }
}

export default UserMenu;
