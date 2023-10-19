import { combineReducers } from 'redux';
import axios from 'axios';

import userSlice from './user';
import postSlice from './post';

//axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.baseURL = 'https://node-ingeun.koyeb.app';
axios.defaults.withCredentials = true;
// axios.defaults.headers = {
//   'Cross-Origin-Opener-Policy' : 'unsafe-none'
// }

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

export default rootReducer;
