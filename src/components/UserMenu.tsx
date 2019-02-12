import React, { Component, createRef } from 'react';
import PopMenu from '../view/PopMenu';

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
      <PopMenu top="0px" ref={this.menuRef}>
        <button>My orders</button>
        <button>Logout</button>
      </PopMenu>
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          user@email.com
        </button>
        { this.state.showMenu && this.renderMenu() }
      </div>
    );
  }
}

export default UserMenu;
