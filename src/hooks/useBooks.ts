import { useEffect, useState, useRef } from 'react'
import { Book, PaginationMeta } from '../types/index'
import { useBookStore } from '../stores/bookStore'

interface UseBooksReturn {
  books: Book[]
  isLoading: boolean
  error: Error | null
  totalPages: number
  currentPage: number
  setPage: (page: number) => void
}

const requestCache = new Map<string, { books: Book[]; pagination: PaginationMeta }>()

export const useBooks = (page: number = 1, limit: number = 10): UseBooksReturn => {
  const { books, isLoading, error, totalPages, currentPage, setBooks, setLoading, setError, setPagination } = useBookStore()
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      const cacheKey = `books-${page}-${limit}`

      // Check cache first
      if (requestCache.has(cacheKey)) {
        const cached = requestCache.get(cacheKey)!
        setBooks(cached.books)
        setPagination(cached.pagination)
        return
      }

      setLoading(true)
      abortControllerRef.current = new AbortController()

      try {
        const response = await fetch(`/api/books?page=${page}&limit=${limit}`, {
          signal: abortControllerRef.current.signal
        })

        if (!response.ok) throw new Error('Failed to fetch books')

        const data = await response.json()
        const { data: fetchedBooks, pagination } = data

        // Cache the result
        requestCache.set(cacheKey, { books: fetchedBooks, pagination })

        setBooks(fetchedBooks)
        setPagination(pagination)
        setError(null)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [page, limit, setBooks, setLoading, setError, setPagination])

  return {
    books,
    isLoading,
    error,
    totalPages,
    currentPage,
    setPage: (newPage) => {
      // This would be handled by parent component
    }
  }
}
