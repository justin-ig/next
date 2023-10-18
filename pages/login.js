import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { signup, loadMyInfo } from '../reducers/user';
import wrapper from '../store/configureStore';

import LoginForm from '../components/LoginForm';

const ErrorMessage = styled.div`
  color: red;
`;

const Login = () => {

  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);


  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  return (
    <AppLayout>
      <Head>
        <title>로그인 | NodeBird</title>
      </Head>
      <LoginForm/>
    </AppLayout>
  );
};


export default Login;
