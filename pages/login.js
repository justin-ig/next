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

  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (me && me.id) {
      //Router.replace('/');
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

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadMyInfo());
  return {
    props: {},
  };
});

export default Login;
