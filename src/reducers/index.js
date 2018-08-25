import { combineReducers } from 'redux'
import { tableReducer } from './table'

export const rootReducer = combineReducers({
	table: tableReducer
});