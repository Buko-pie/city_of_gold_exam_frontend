import { create } from 'zustand'
import { Book, PaginationMeta } from '../types/index'

interface BookState {
  books: Book[];
  pagination: PaginationMeta;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
  setBooks: (books: Book[]) => void;
  setCurrentPage: (page: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setPagination: (pagination: PaginationMeta) => void;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  pagination: {
    currentPage: 1,
    totalItems: 0,
    next_page: null,
    prev_page: null,
  },
  totalPages: 0,
  isLoading: false,
  error: null,
  setBooks: (books) => set({ books }),
  setCurrentPage: (page) => set((prev) => ({
    pagination: {
      ...prev.pagination,
      currentPage: page
    }
  })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setPagination: (pagination) => set({
    pagination: pagination
  })
}))
