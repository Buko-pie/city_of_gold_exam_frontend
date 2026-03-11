import { create } from 'zustand'
import { Book, Filter } from '../types/index'

interface UIState {
  selectedBook: Book | null
  searchQuery: string
  filters: Filter[]
  setSelectedBook: (book: Book | null) => void
  setSearchQuery: (query: string) => void
  setFilters: (filters: Filter[]) => void
}

export const useUIStore = create<UIState>((set) => ({
  selectedBook: null,
  searchQuery: '',
  filters: [],
  setSelectedBook: (book) => set({ selectedBook: book }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set({ filters })
}))
