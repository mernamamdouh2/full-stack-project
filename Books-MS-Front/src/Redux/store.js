import { applyMiddleware, createStore } from 'redux'

import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './Reducers/rootReducer';
import { thunk } from 'redux-thunk';

const initialState = {}
const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
