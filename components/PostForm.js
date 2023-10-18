import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import postSlice, { addPost, uploadImage } from '../reducers/post';
import useInput from '../hooks/useInput';
import { backUrl } from '../config/config';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch(addPost(formData));
  }, [text, imagePaths]);

  const imageInput = useRef();
  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch(uploadImage(imageFormData));
  });


  return (
    <Form style={{ margin: '10px 0 50px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="등록 해주세요~~"
      />
      <div style={{paddingTop:'20px'}}>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} style={{ display: 'none' }} />
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">등록</Button>
      </div>
    </Form>
  );
};

export default PostForm;
