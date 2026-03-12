import { useEffect, useState, useRef } from 'react'
import { Book } from '../types/index'

interface UseBookDetailReturn {
  book: Book | null
  isLoading: boolean
  error: Error | null
}

const bookDetailCache = new Map<string, Book>()

export const useBookDetail = (bookId: string): UseBookDetailReturn => {
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!bookId) return

    const fetchBookDetail = async () => {
      // Check cache first
      if (bookDetailCache.has(bookId)) {
        setBook(bookDetailCache.get(bookId)!)
      }

      setIsLoading(true)
      abortControllerRef.current = new AbortController()

      try {
        // Fetch book details
        const bookResponse = await fetch(`/api/books/${bookId}`, {
          signal: abortControllerRef.current.signal
        })

        if (!bookResponse.ok) throw new Error('Failed to fetch book details')

        const bookData = await bookResponse.json()
        const fetchedBook = bookData.data

        bookDetailCache.set(bookId, fetchedBook)
        setBook(fetchedBook)

        setError(null)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookDetail()

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [bookId])

  return {
    book,
    isLoading,
    error
  }
}
