import { RouteComponentProps } from 'react-router'

declare module 'react-router' {
  type ReturnedType<T> = T extends RouteComponentProps<any>
    ? Pick<T, Exclude<keyof T, keyof RouteComponentProps<any>>>
    : T

  export function withRouter<P>(
    component: React.ComponentType<P>,
  ): React.ComponentClass<ReturnedType<P>>
}
