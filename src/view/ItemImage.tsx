import React, { RefObject } from 'react';
import styled from 'styled-components';
import { IoIosCamera } from 'react-icons/io';

interface SizedProps {
  size: string | number,
}

interface Props extends SizedProps {
  src?: string,
};

const Image = styled.img`
  width: ${(props: Props) => props.size};
  height: ${(props: Props) => props.size};
`;

const NoImage = styled.div`
  width: ${(props: SizedProps) => props.size};
  height: ${(props: SizedProps) => props.size};
  background: rgb(50, 50, 50);
  position: relative;

  & > * {
    color: white;
    font-size: 40px;
    opacity: 0.3;

    /* to the middle! */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ItemImage = ({ src, ...restProps }: Props) => (
  src
    ? <Image src={src} {...restProps} />
    : <NoImage {...restProps}>
        <IoIosCamera />
      </NoImage>
);

export default ItemImage;
