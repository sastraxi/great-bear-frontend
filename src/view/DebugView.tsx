import React from 'react';
import styled from 'styled-components';

interface Props {
  value: any,
}

const View = styled.pre`
  overflow: auto;
  max-height: 400px;
  background: rgba(210, 190, 140, 0.2);
  border: 1px solid rgba(210, 190, 140, 0.8);
  padding: 10px;
`;

export default ({ value }: Props) => (
  <View>{ JSON.stringify(value, null, 2) }</View>
);

