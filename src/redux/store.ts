import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {reducer as reducerForm} from 'redux-form'
import thunk, {ThunkAction} from "redux-thunk";
import {LoginReducer} from './reducers/LoginReducer/LoginReducer'
import { CourseReducer } from './reducers/CourseReducer'


const reducers = combineReducers({
    form : reducerForm,
    login : LoginReducer,
    course  : CourseReducer,
})

export type stateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type InferValueTypes<T> = T extends { [k : string] : infer U} ? U : never
export type AppThunk<A extends AnyAction, R = void> = ThunkAction<R, stateType, unknown, A>

export let store = createStore(reducers, applyMiddleware(thunk))