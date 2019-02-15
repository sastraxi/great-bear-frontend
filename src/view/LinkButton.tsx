import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props {
  to: string,
  children: JSX.Element[] | JSX.Element | string,
  onClick?(event: React.MouseEvent): any,
};

const LinkButton = (props: Props & RouteComponentProps) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    ...restProps
  } = props;
  return (
    <button
      {...restProps}
      onClick={(event: React.MouseEvent) => {
        onClick && onClick(event);
        history.push(to);
      }}
    />
  )
};

export default withRouter(LinkButton);
