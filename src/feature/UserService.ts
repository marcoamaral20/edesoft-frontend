import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { UserState } from './Types'

const API_URL = 'https://fakestoreapi.com/users'

export const getAllUsersAsync = createAsyncThunk("users/getUsers", async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.log(error)
    }
})