import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const View = styled.div`
  display: flex;
  padding: 5px 0;

  & + & {
    border-top: 1px dotted rgba(0, 0, 0, 0.15);
  }

  & > :last-child {
    flex-grow: 1;
  }
`;

const Label = styled.div`
  text-align: left;
  font-weight: bold;
`;

const Value = styled.div`
  text-align: right;
`;

const Spinner = styled(Value)``;

type Renderable = JSX.Element | moment.Moment | string | number;

interface Props {
  label: JSX.Element | string,
  value?: Renderable,
  loading?: boolean,
}

const display = (value?: Renderable): JSX.Element => {
  if (!value) return <Value />;
  if (moment.isMoment(value)) {
    return (
      <Value title={value.format()}>{ value.fromNow() }</Value>
    );
  }
  return (
    <Value>{ value }</Value>
  );
}

const Status = ({ label, value, loading}: Props) => {
  return (
    <View>
      <Label>{ label }</Label>
      {
        (loading && !value)
          ? <Spinner>...</Spinner>
          : display(value)
      }
    </View>
  )  
};

export default Status;
