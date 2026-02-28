import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// ─── Async Thunks ───────────────────────────────────────────

export const fetchAllTodos = createAsyncThunk(
  "todos/fetchAll",
  async ({ page, limit, status }, thunkAPI) => {
    try {
      const statusQuery = status ? `&status=${status}` : "";
      const res = await axios.get(
        `${BASE_URL}/all?page=${page}&limit=${limit}${statusQuery}`,
      );
      console.log("API response:", res.data);
      return res.data;
    } catch (error) {
      console.log("API error:", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const addTodo = createAsyncThunk(
  "todos/add",
  async (todoData, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/add`, todoData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const editTodo = createAsyncThunk(
  "todos/edit",
  async ({ id, updateFields }, thunkAPI) => {
    try {
      const res = await axios.patch(`${BASE_URL}/edit/${id}`, updateFields);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      return id; // return id so we can remove it from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// ─── Slice ───────────────────────────────────────────────────

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
    selectedTodo: null, // for pre-filling the edit modal
    pagination: {
      page: 1,
      limit: 5,
      total: 0,
      totalPages: 0,
    },
  },
  reducers: {
    // synchronous actions
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
    clearSelectedTodo: (state) => {
      state.selectedTodo = null;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── Fetch All ──
    builder
      .addCase(fetchAllTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── Add Todo ──
    builder
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── Edit Todo ──
    builder
      .addCase(editTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (t) => t._id === action.payload.todo._id,
        );
        if (index !== -1) {
          state.todos[index] = action.payload.todo; // replace old todo with updated one
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── Delete Todo ──
    builder
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedTodo, clearSelectedTodo, setPage, clearError } =
  todoSlice.actions;
export default todoSlice.reducer;
