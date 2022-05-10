import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { apiKey, apiUrl } from "src/utils/config";
import { guestRequest } from "src/services";
import endpoints from "src/services/endpoints";

type InitialStateType = {
    isLoading: boolean;
    error: any;
    data: any;
    accessToken: string | null;
};

const initialState: InitialStateType = {
    isLoading: false,
    error: null,
    data: null,
    accessToken: null,
};

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (
        { email, password }: { email: string; password: string },
        thunkAPI,
    ) => {
        try {
            const result: any = {};
            const loginRes = await guestRequest.post(endpoints.AUTH.LOGIN, {
                email,
                password,
            });
            result.accessToken = loginRes.payload.token;
            const verifyRes = await axios.post(
                `${apiUrl}${endpoints.AUTH.VERIFY}`,
                {},
                {
                    headers: {
                        "Access-Token": result.accessToken,
                        "Api-Key": apiKey,
                    },
                },
            );

            result.userData = verifyRes.data.payload;

            localStorage.setItem("access_token", result.accessToken);
            localStorage.setItem("user", JSON.stringify(result.userData));

            return result;
        } catch (error: any) {
            const errorMessage = error.response.data.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    },
);

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    return true;
});

const userSlice: any = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        // Login User
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.userData;
                state.accessToken = action.payload.accessToken;

                toast.success("Login Successfully");
            })
            .addCase(loginUser.rejected, (state, action) => {
                const error = action.payload as string;
                state.isLoading = false;
                state.error = error;

                toast.error(error);
            });

        // Logout User
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.data = null;
            state.accessToken = null;

            // toast.success("Logged out successfully");
        });
    },
    reducers: {},
});

export const userSelector = (state: any) => state.user;

export default userSlice.reducer;
