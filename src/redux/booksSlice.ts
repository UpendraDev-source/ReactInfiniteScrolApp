import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchBooksAPI, Book } from "../api/fetchBooks"; 

interface BooksState {
  books: Book[];
  page: number;
  loading: boolean;
  hasMore: boolean;
}

const initialState: BooksState = {
  books: [],
  page: 1,
  loading: false,
  hasMore: true,
};

export const fetchBooks = createAsyncThunk<Book[], void, { state: { books: BooksState } }>(
  "books/fetchBooks",
  async (_, { getState }) => {
    const state = getState().books;
    const response = await fetchBooksAPI(state.page);
    return response.docs;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    resetBooks: (state) => {
      state.books = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        if (action.payload.length > 0) {
          state.books = [...state.books, ...action.payload];
          state.page += 1;
        } else {
          state.hasMore = false;
        }
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetBooks } = booksSlice.actions;
export default booksSlice.reducer;
