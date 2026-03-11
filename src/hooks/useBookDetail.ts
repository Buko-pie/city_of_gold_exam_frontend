import { useEffect, useState, useRef } from 'react'
import { Book } from '../types/index'

interface UseBookDetailReturn {
  book: Book | null
  relatedBooks: Book[]
  isLoading: boolean
  error: Error | null
}

const bookDetailCache = new Map<string, Book>()
const relatedBooksCache = new Map<string, Book[]>()

export const useBookDetail = (bookId: string): UseBookDetailReturn => {
  const [book, setBook] = useState<Book | null>(null)
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([])
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

      if (relatedBooksCache.has(bookId)) {
        setRelatedBooks(relatedBooksCache.get(bookId)!)
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

        // Fetch related books
        const relatedResponse = await fetch(`/api/books/related/${bookId}`, {
          signal: abortControllerRef.current.signal
        })

        if (!relatedResponse.ok) throw new Error('Failed to fetch related books')

        const relatedData = await relatedResponse.json()
        const fetchedRelated = relatedData.data

        relatedBooksCache.set(bookId, fetchedRelated)
        setRelatedBooks(fetchedRelated)

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
    relatedBooks,
    isLoading,
    error
  }
}
