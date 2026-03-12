import { create } from 'zustand'
import { Favourites } from '../types/index'

interface CollectionState {
  collections: Favourites[]
  addCollection: (collection: Favourites) => void
  removeCollection: (collectionId: string) => void
  addBookToCollection: (collectionId: string, bookId: string) => void
  removeBookFromCollection: (collectionId: string, bookId: string) => void
  setCollections: (collections: Favourites[]) => void
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
