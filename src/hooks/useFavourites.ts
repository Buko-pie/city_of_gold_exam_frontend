import { useFavouriteStore } from '../stores/favouritesStore'
import { useUIStore } from '../stores/uiStore'
import { ApiResponse, Favourite } from '../types'

interface UseBookmarksReturn {
  isFavourited: (bookId: number) => boolean
  addFavourite: (bookId: string, title: string, authors: string[]) => void
  toggleFavourite: (bookId: number, title: string, authors: string[]) => void
  fetchFavourites: (userId: string) => void
}

export const useFavourites = (): UseBookmarksReturn => {
  const { favourites, isFavourited, toggleFavourite: toggleFav, setFavourites } = useFavouriteStore()
  const { user } = useUIStore();

  const addFavourite = async (bookId: string, title: string, authors: string[]) => {
    if(!user) {
      console.error("No user logged in");
      return;
    }

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          bookId,
          title,
          author: authors.join(', ')
         }),
      })

      if (!response.ok) throw new Error(`Failed to add favourites: ${response.status} ${response.statusText}`)
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  const toggleFavourite = async (bookId: number, title: string, authors: string[]) => {
    if(!user) {
      console.error("No user logged in");
      return;
    }

    try {
      let response = null;
      console.log(favourites);
      console.log(bookId)
      if(favourites.has(bookId)) {
        console.log("removing fav");
        response = await fetch(`/api/favorites/${bookId}?userId=${user.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      } else {
        console.log("adding fav");
        response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            bookId,
            title,
            author: authors.join(', ')
          }),
        })
      }

      if (!response.ok) throw new Error(`Failed to tooggle favourites: ${response.status} ${response.statusText}`);
      toggleFav(Number(bookId),{
        id: '',
        userId: user.id,
        bookId: Number(bookId),
        title,
        author: authors.join(', '),
        addedAt: new Date().toISOString()
      })

    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  const fetchFavourites = async (userId: string | null) => {
    if(!userId) {
      console.error("No user logged in");
      return;
    }

    try {
      console.log("FETCHING FAVOURITES");
      const response = await fetch(`/api/favorites?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) throw new Error(`Failed to get favourites: ${response.status} ${response.statusText}`)

      const { data } = (await response.json()) as ApiResponse<Favourite[]>;

      if(data && data.length > 0) {
       setFavourites(data);
      }
    } catch (error) {
      console.error(`Error: ${error}`)
      throw error;
    }
  }

  return {
    isFavourited,
    addFavourite,
    toggleFavourite,
    fetchFavourites
  }
}
