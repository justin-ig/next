import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import dynamic from 'next/dynamic'

const AppLayout = dynamic(() => import('../components/AppLayout'), {
  ssr: false,
})

const PostForm = dynamic(() => import('../components/PostForm'), {
  ssr: false,
})

const PostCard = dynamic(() => import('../components/PostCard'), {
  ssr: false,
})

import { loadMyInfo } from '../reducers/user';
import { loadPosts } from '../reducers/post';
import wrapper from '../store/configureStore';

function Home(props) {
  //console.log('props', props);
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  const lastId = mainPosts[mainPosts.length - 1]?.id;
  useEffect(() => {
    function onScroll() {
      if (window && window.pageYOffset + document && document.documentElement.clientHeight > document && document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch(loadPosts(lastId));
        }
      }
    }
    window && window.addEventListener('scroll', onScroll);
    return () => {
      if (window)  window.removeEventListener('scroll', onScroll);
      else return false;
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadPosts());
  await store.dispatch(loadMyInfo());
  //console.log('state', store.getState());
});

export function reportWebVitals(metric) {
  console.log(metric);
}

export default Home;
