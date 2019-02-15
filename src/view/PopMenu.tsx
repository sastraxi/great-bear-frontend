import React from 'react';
import styled from 'styled-components';

interface Props {
  top: string | number,
  align?: 'left' | 'right',
  children: JSX.Element[],
};

const Container = styled.div`
  position: relative;
`;

const View = styled.div`
  position: absolute;
  right: 0;
  top: ${(props: Props) => props.top};
  text-align: ${(props: Props) => props.align};
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
