import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import type { UserState } from './Types'
import axios from 'axios'
import { getAllUsersAsync } from './UserService'

const API_URL = 'https://fakestoreapi.com/users'

interface UserList { 
    data: UserState[]
}

const initialState: UserList = {
  data: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      state.data.push(action.payload)
    },

    getUsers: (state, action: PayloadAction<UserState>) => {
      state.data = [action.payload]
    },

    updateUser: (state, action: PayloadAction<UserState>) => {
      const {
        payload: { id, name, email},
      } = action

      state.data = state.data.map((user) => 
        user.id === id ? { ...user, name, email} : user
      )
    },

    deleteUser: (state, action: PayloadAction<UserState>) => {
      state.data = state.data.filter((user) => user.id === action.payload.id)
    }
  },
})

export const getUserAsync = () => async (dispatch: (arg0: any) => void) => {
    try {
      const response = await axios.get(`${API_URL}`);
      dispatch(getUsers(response.data));
    } catch (err) {
      console.log(err)
    }
  };

  export const addUserAsync = (data: UserList) => async (dispatch: (arg0: any) => void) => {
    try {
      const response = await axios.post(API_URL, data);
      dispatch(addUser(response.data));
    } catch (err) {
      console.log(err)
    }
  };

  export const deleteUserAsync = (data: UserList) => async (dispatch: (arg0: any) => void) => {
    try {
      const response = await axios.post(API_URL, data);
      dispatch(deleteUser(response.data));
    } catch (err) {
      console.log(err)
    }
  };

  export const updateUserAsync = (data: UserList) => async (dispatch: (arg0: any) => void) => {
    try {
      const response = await axios.post(API_URL, data);
      dispatch(updateUser(response.data));
    } catch (err) {
      console.log(err)
    }
  };

export const { addUser, getUsers, updateUser, deleteUser } = userSlice.actions
export const showUser = (state: RootState) => state.user.data
export default userSlice.reducer