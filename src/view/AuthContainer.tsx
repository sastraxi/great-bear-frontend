import React from 'react';
import styled from 'styled-components';

export default styled.div`

  max-width: 400px;
  margin: 20px auto;

  & > form input {
    font-size: 130%;
  }

  & > form input[type=email],
  & > form input[type=password],
  & > form input[type=text]
  {
    display: block;

    margin: 20px 40px;
    padding: 10px;
    width: calc(100% - 80px - 20px);
  }

  & > form input[type=submit],
  & > form button
  {
    display: block;
    margin: 20px 80px;
    width: calc(100% - 160px);
    padding: 10px 0;
  }

`;