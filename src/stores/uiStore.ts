import { create } from 'zustand'
import { Book } from '../types/index'


export interface User {
  id: string;
  session_id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UIState {
  selectedBook: Book | null
  searchQuery: string
  user: User | null
  setSelectedBook: (book: Book | null) => void
  setSearchQuery: (query: string) => void
  setUser: (user: User) => void
}

export const useUIStore = create<UIState>((set) => ({
  selectedBook: null,
  searchQuery: '',
  user: null,
  setSelectedBook: (book) => set({ selectedBook: book }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setUser: (_user: User) => set ({ user: _user })
}))
