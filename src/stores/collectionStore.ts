import { create } from 'zustand'
import { Collection } from '../types/index'

interface CollectionState {
  collections: Collection[]
  addCollection: (collection: Collection) => void
  removeCollection: (collectionId: string) => void
  addBookToCollection: (collectionId: string, bookId: string) => void
  removeBookFromCollection: (collectionId: string, bookId: string) => void
  setCollections: (collections: Collection[]) => void
}

export const useCollectionStore = create<CollectionState>((set) => ({
  collections: [],
  addCollection: (collection) => set((state) => ({
    collections: [...state.collections, collection]
  })),
  removeCollection: (collectionId) => set((state) => ({
    collections: state.collections.filter(c => c.id !== collectionId)
  })),
  addBookToCollection: (collectionId, bookId) => set((state) => ({
    collections: state.collections.map(c =>
      c.id === collectionId && !c.bookIds.includes(bookId)
        ? { ...c, bookIds: [...c.bookIds, bookId] }
        : c
    )
  })),
  removeBookFromCollection: (collectionId, bookId) => set((state) => ({
    collections: state.collections.map(c =>
      c.id === collectionId
        ? { ...c, bookIds: c.bookIds.filter(id => id !== bookId) }
        : c
    )
  })),
  setCollections: (collections) => set({ collections })
}))
