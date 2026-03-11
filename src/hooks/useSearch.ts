import { useEffect, useState, useRef, useCallback } from 'react'
import { Book, Filter } from '../types/index'

interface UseSearchReturn {
  results: Book[]
  isLoading: boolean
  error: Error | null
  resultCount: number
}

const searchCache = new Map<string, Book[]>()

export const useSearch = (query: string, filters: Filter[] = []): UseSearchReturn => {
  const [results, setResults] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const performSearch = useCallback(async () => {
    const cacheKey = `search-${query}-${JSON.stringify(filters)}`

    // Check cache first
    if (searchCache.has(cacheKey)) {
      setResults(searchCache.get(cacheKey)!)
      return
    }

    setIsLoading(true)
    abortControllerRef.current = new AbortController()

    try {
      const params = new URLSearchParams()
      params.append('q', query)

      filters.forEach(filter => {
        if (filter.type === 'genre') {
          params.append('genre', filter.value)
        } else if (filter.type === 'author') {
          params.append('author', filter.value)
        } else if (filter.type === 'year') {
          params.append('year', filter.value)
        }
      })

      const response = await fetch(`/api/search?${params.toString()}`, {
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) throw new Error('Search failed')

      const data = await response.json()
      const searchResults = data.data

      // Cache the result
      searchCache.set(cacheKey, searchResults)

      setResults(searchResults)
      setError(null)
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err)
      }
    } finally {
      setIsLoading(false)
    }
  }, [query, filters])

  useEffect(() => {
    // Debounce search requests (300ms)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      performSearch()
    }, 300)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      abortControllerRef.current?.abort()
    }
  }, [query, filters, performSearch])

  return {
    results,
    isLoading,
    error,
    resultCount: results.length
  }
}
