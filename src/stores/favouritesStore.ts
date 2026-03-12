import { create } from 'zustand'
import { Favourite } from '../types'

interface FavouriteState {
  favourites: Map<number, Favourite>
  toggleFavourite: (bookId: number, fav?: Favourite) => void
  isFavourited: (bookId: number) => boolean
  setFavourites: (faves: Favourite[]) => void
}

export const useFavouriteStore = create<FavouriteState>((set, get) => ({
  favourites: new Map(),
  toggleFavourite: (bookId, fav) => set((state) => {
    const newFavourites = new Map(state.favourites)
    if (newFavourites.has(bookId)) {
      newFavourites.delete(bookId)
    } else if(fav) {
      newFavourites.set(bookId, fav)
    } else {
      console.error("Cannot add favourite without data")
    }

    return { favourites: newFavourites }
  }),
  isFavourited: (bookId) => get().favourites.has(bookId),
  setFavourites: (faves: Favourite[]) => set(() => {
    const newFaves = new Map <number, Favourite>()
    for (const fav of faves) {
      newFaves.set(fav.bookId, fav)
    }

    return { favourites: newFaves }
  }),
}))
