import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";
import { RootState } from "../store";
import { createStandaloneToast } from "@chakra-ui/react";
import { IUserLogin } from "../../interfaces";
import CookiseServices from "../../services/CookiseServices";

const { toast } = createStandaloneToast();

interface LoginsState {
  loading: boolean;
  data: [] ;
  error: string ;
  // data: [] | null;
  // error: string | null;
}

const initialState: LoginsState = {
  loading: false,
  data: [],
  error: "",
};

type MyActionPayload = {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: IUserLogin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    //get request
    try {
      const { data } = await axiosInstance.post(`/auth/local`, user);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
        const date = new Date();
        const IN_DAYS = 3 ;
        const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS
        date.setTime(date.getTime() + EXPIRES_IN_DAYS)
        const options = {path :"/" , expires : date}
        CookiseServices.set('jwt',action.payload.jwt,options)
        toast({
          title: "Logged in successfully",
          status: "success",
          isClosable: true,
        });


        setTimeout(() => {
          location.replace('/')
        }, 2000);
     
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = (
          action.payload as MyActionPayload
        ).response.data.error.message;
        toast({
          title: (
            action.payload as MyActionPayload
          ).response.data.error.message,
          status: "error",
          isClosable: true,
          description: "Make sure you have the correct email or password",
        });
      });
  },
});

export const loginSelector = ({ login }: RootState) => login;

export default loginSlice.reducer;
