import { useEffect, useRef } from 'react'
import { Collection } from '../types/index'
import { useCollectionStore } from '../stores/collectionStore'

interface UseCollectionsReturn {
  collections: Collection[]
  createCollection: (name: string) => Promise<void>
  addBookToCollection: (collectionId: string, bookId: string) => Promise<void>
  removeBookFromCollection: (collectionId: string, bookId: string) => Promise<void>
  deleteCollection: (collectionId: string) => Promise<void>
}

const COLLECTIONS_KEY = 'book-explorer-collections'

export const useCollections = (): UseCollectionsReturn => {
  const { collections, addCollection, removeCollection, addBookToCollection: storeAddBook, removeBookFromCollection: storeRemoveBook, setCollections } = useCollectionStore()
  const abortControllerRef = useRef<AbortController | null>(null)

  // Load collections from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COLLECTIONS_KEY)
      if (stored) {
        const collections = JSON.parse(stored)
        setCollections(collections)
      }
    } catch (error) {
      console.error('Failed to load collections:', error)
    }
  }, [setCollections])

  // Save collections to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections))
    } catch (error) {
      console.error('Failed to save collections:', error)
    }
  }, [collections])

  const createCollection = async (name: string) => {
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })

      if (!response.ok) throw new Error('Failed to create collection')

      const data = await response.json()
      addCollection(data.data)
    } catch (error) {
      console.error('Error creating collection:', error)
      throw error
    }
  }

  const addBookToCollection = async (collectionId: string, bookId: string) => {
    try {
      const response = await fetch(`/api/collections/${collectionId}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId })
      })

      if (!response.ok) throw new Error('Failed to add book to collection')

      storeAddBook(collectionId, bookId)
    } catch (error) {
      console.error('Error adding book to collection:', error)
      throw error
    }
  }

  const removeBookFromCollection = async (collectionId: string, bookId: string) => {
    try {
      const response = await fetch(`/api/collections/${collectionId}/books/${bookId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to remove book from collection')

      storeRemoveBook(collectionId, bookId)
    } catch (error) {
      console.error('Error removing book from collection:', error)
      throw error
    }
  }

  const deleteCollection = async (collectionId: string) => {
    try {
      const response = await fetch(`/api/collections/${collectionId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete collection')

      removeCollection(collectionId)
    } catch (error) {
      console.error('Error deleting collection:', error)
      throw error
    }
  }

  return {
    collections,
    createCollection,
    addBookToCollection,
    removeBookFromCollection,
    deleteCollection
  }
}
