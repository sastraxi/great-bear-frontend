import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Item } from '../util/types';
import currentVariant from './variant';

export interface RenderProps {
  loading: boolean,
  error?: ApolloError,
  items?: Item[],
  subscribe?(): void,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const { itemsQuery, unpackItems } = currentVariant;

export default ({
  children: renderChild,
}: Props) => (
  <Query query={itemsQuery}>
    {
      ({ loading, data, error }) => {
        if (loading) return renderChild({ loading });
        if (error) return renderChild({ loading: false, error });

        const items = unpackItems(data);

        return renderChild({
          loading: false,
          items: items || undefined,
        });
      }
    }
  </Query>
);
