import { useEffect } from 'react'
import { useBookmarkStore } from '../stores/bookmarkStore'

interface UseBookmarksReturn {
  bookmarks: string[]
  toggleBookmark: (bookId: string) => void
  isBookmarked: (bookId: string) => boolean
}

export const useBookmarks = (): UseBookmarksReturn => {
  const { bookmarks, toggleBookmark, isBookmarked, loadBookmarks } = useBookmarkStore()

  // Load bookmarks from local storage on mount
  useEffect(() => {
    loadBookmarks()
  }, [loadBookmarks])

  return {
    bookmarks: Array.from(bookmarks),
    toggleBookmark,
    isBookmarked
  }
}
