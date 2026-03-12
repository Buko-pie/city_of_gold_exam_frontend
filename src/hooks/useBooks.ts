import { useEffect, useRef, useState } from 'react'
import { Book, PaginationMeta } from '../types/index'
import { useBookStore } from '../stores/bookStore'

interface UseBooksReturn {
  books: Book[];
  isLoading: boolean;
  error: Error | null;
  pagination: PaginationMeta;
  fetchBooks: (newPage: number, search?: string | null) => void;
}

const requestCache = new Map<string, { books: Book[]; pagination: PaginationMeta }>()

export const useBooks = (): UseBooksReturn => {
  const { books, isLoading, error, pagination, setBooks, setLoading, setError, setPagination } = useBookStore()
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchBooks = async (newPage: number, search: string | null = null) => {
    const cacheKey = `books-${newPage}-search-${search || ''}`

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
      const response = await fetch(`/api/books?page=${newPage}&search=${search || ''}`, {
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

  return {
    books,
    isLoading,
    error,
    pagination,
    fetchBooks
  }
}
