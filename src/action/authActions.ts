import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL =
  "https://roledaseauthenticatrionwithnestjs-lx61.onrender.com";
const instance = axios.create({ withCredentials: true, baseURL: backendURL });

interface RegisterUserPayload {
  firstName: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { firstName, email, password }: RegisterUserPayload,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      await instance.post("/user", { firstName, email, password }, config);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        window.location.href = "/login";

        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: Omit<RegisterUserPayload, "firstName">,
    { rejectWithValue }
  ) => {
    try {
      const { data, status } = await instance.post("/auth/login", {
        email,
        password,
      });
      console.log(document.cookie);
      if (status) window.location.href = "/";

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        window.location.href = "/login";

        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getApprovals = createAsyncThunk(
  "users/getApprovals",
  async ({ user }: any, { rejectWithValue }) => {
    try {
      const res = await instance.get(
        `/user/approvals/${user.role}?page=1&limit=50`
      );
      return res.data.data.users;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        window.location.href = "/login";

        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async ({ role }: { role: string }, { rejectWithValue }) => {
    try {
      const res = await instance.get("/user?page=1&limit=50");
      return res.data.data.users;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        window.location.href = "/login";

        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// export const getUser = createAsyncThunk(
//   "users/getUser",
//   async (
//     { page, limit }: { page: number; limit: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await instance.get(`/user?page=${page}&limit=${limit}`);
//       return res.data.dats.users;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data.message || error.message);
//     }
//   }
// );

// export const getApprovals = createAsyncThunk(
//   "users/getApprovals",
//   async (
//     { user, page, limit }: { user: any; page: number; limit: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await instance.get(
//         `/user/approvals/${user.role}?page=${page}&limit=${limit}`
//       );
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data.message || error.message);
//     }
//   }
// );
export const addUser = createAsyncThunk(
  "users/addUser",
  async (newUserData: any, { rejectWithValue }) => {
    try {
      const res = await instance.post("/user", newUserData);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        window.location.href = "/login";

        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateSalary = createAsyncThunk(
  "users/updateSalary",
  async (
    { id, salary, role }: { id: string; salary: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const userId = id;
      console.log(salary, id, "poiu");
      await instance.post("/user/update-salary", { userId, salary, role });
      return { id, salary, role };
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        window.location.href = "/login";

        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/auth/logout`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        window.location.href = "/login";

        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
