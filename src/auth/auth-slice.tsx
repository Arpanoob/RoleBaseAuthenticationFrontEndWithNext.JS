import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  getUser,
  userLogin,
  addUser,
  getApprovals,
  updateSalary,
  logoutUser,
} from "../action/authActions"; // Update with the correct path
import { store } from "../app/store.ts/p";
const initialState = {
  loading: false,
  userInfo: {},
  error: null,
  success: false,
  userList: [] as any[],
  approvals: [] as any[],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ userInfo: any; userToken: any }>
    ) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.success = true;
    },
    loginFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    logout: (state) => {
      state.userInfo = {};
      state.userList = [];
      state.approvals = [];
      state.success = false;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser actions
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle userLogin actions
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
      })
      .addCase(userLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getUser actions
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userList = payload;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle addUser actions
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.success = true;
        state.userList.push(payload);
      })
      .addCase(addUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getApprovals actions
      .addCase(getApprovals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApprovals.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.approvals = payload;
      })
      .addCase(getApprovals.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle updateSalary actions
      .addCase(updateSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSalary.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.success = true;
        // Update userList or other state accordingly
      })
      .addCase(updateSalary.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle logoutUser actions
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setCredentials,
} = authSlice.actions;

export default authSlice.reducer;
