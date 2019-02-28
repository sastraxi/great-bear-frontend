import React from 'react';
import styled from 'styled-components';

interface Props {
  top: string | number,
  children: JSX.Element[],
};

const Container = styled.div`
  position: relative;
`;

const View = styled.div`
  position: absolute;
  right: 0;
  top: ${(props: Props) => props.top};

  display: flex;
  flex-direction: column;

  & > * {
    display: block;
  }
`;

const PopMenu = (props: Props) => (
  <Container>
    <View {...props} />
  </Container>
);

PopMenu.defaultProps = {
  align: 'right',
};

export default PopMenu;
