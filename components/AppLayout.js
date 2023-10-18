import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Input, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import Router, { useRouter } from 'next/router';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';
import { logout } from '../reducers/user';


const { Header, Content } = Layout;
const Global = createGlobalStyle`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .ant-col:first-child {
    margin-left: 0 !important;
  }
  .ant-col:last-child {
    margin-right: 0 !important;
  }
  .ant-form-item-explain-error {
    font-size: 11px;
  }
`;

function AppLayout({ children }) {
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logout());
  }, []);


  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Global />
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>

        {me && me.id ? 
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[router.pathname]}
            items={[
              { label: <Link href="/">노드버드</Link>, key: '/' },
              { label: <Link href="/profile">프로필</Link>, key: '/profile' },
              { label: <div onClick={() => onLogOut()}>로그아웃</div>, key: '/logout' },

            ]}
          />
        : 
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[router.pathname]}
            items={[
              { label: <Link href="/">노드버드</Link>, key: '/' },
              { label: <Link href="/login">로그인</Link>, key: '/login' },
              { label: <Link href="/signup">회원가입</Link>, key: '/signup' },
            ]}
          />
        }
       
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ minHeight: '400px', padding: '24px', backgroundColor: '#FFF' }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
