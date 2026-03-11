import { create } from 'zustand'
import { Book, PaginationMeta } from '../types/index'

interface BookState {
  books: Book[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  error: Error | null
  setBooks: (books: Book[]) => void
  setCurrentPage: (page: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
  setPagination: (pagination: PaginationMeta) => void
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  error: null,
  setBooks: (books) => set({ books }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setPagination: (pagination) => set({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages
  })
}))
