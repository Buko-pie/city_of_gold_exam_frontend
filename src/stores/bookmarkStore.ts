import { create } from 'zustand'

interface BookmarkState {
  bookmarks: Set<string>
  toggleBookmark: (bookId: string) => void
  isBookmarked: (bookId: string) => boolean
  loadBookmarks: () => void
  saveBookmarks: () => void
  setBookmarks: (bookmarks: Set<string>) => void
}

const BOOKMARKS_KEY = 'book-explorer-bookmarks'

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: new Set(),
  toggleBookmark: (bookId) => set((state) => {
    const newBookmarks = new Set(state.bookmarks)
    if (newBookmarks.has(bookId)) {
      newBookmarks.delete(bookId)
    } else {
      newBookmarks.add(bookId)
    }
    get().saveBookmarks()
    return { bookmarks: newBookmarks }
  }),
  isBookmarked: (bookId) => get().bookmarks.has(bookId),
  loadBookmarks: () => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY)
      if (stored) {
        const bookmarks = new Set(JSON.parse(stored))
        set({ bookmarks })
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error)
    }
  },
  saveBookmarks: () => {
    try {
      const bookmarks = Array.from(get().bookmarks)
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
    } catch (error) {
      console.error('Failed to save bookmarks:', error)
    }
  },
  setBookmarks: (bookmarks) => set({ bookmarks })
}))
