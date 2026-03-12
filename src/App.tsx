import { useEffect, useState } from 'react'
import { Book } from './types/index'
import { useBooks } from './hooks/useBooks'
import { useFavourites } from './hooks/useFavourites'
import { useUser } from './hooks/useUser'
import { useBookDetail } from './hooks/useBookDetail'
import { useCookie } from './hooks/useCookie';
import { BookList } from './components/BookList'
import { SearchBar } from './components/SearchBar'
import { BookDetail } from './components/BookDetail'
import { FavouritesManager } from './components/FavouritesManager'
import { LoadingIndicator } from './components/LoadingIndicator'
import './App.css'
import { useUIStore } from './stores/uiStore';
import { useFavouriteStore } from './stores/favouritesStore';

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [searchQuery, setSearchQuery] = useState<string | null>(null)

  // Hooks
  const { books, isLoading, error, fetchBooks } = useBooks()
  const { setCookie, getCookie } = useCookie();
  const { isFavourited, fetchFavourites, toggleFavourite } = useFavourites()
  const { favourites } = useFavouriteStore()
  const { loginSession } = useUser();
  const { user } = useUIStore();
  const { book: detailBook, isLoading: isDetailLoading } = useBookDetail(selectedBook?.id.toString() || '')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
  }

  const handleCloseDetail = () => {
    setSelectedBook(null)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFavourteToggle = (bookId: number, title: string, authors: string[]) => {
   toggleFavourite(bookId, title, authors)
  }

  const removeFav = async (bookId: number) => {
    toggleFavourite(bookId, '', [''])
  }

  const selectFav = async (bookId: number) => {
    setSelectedBook({
      id: bookId,
      title: '',
      author: {
        name: '',
        birth_year: 0,
        death_year: 0
      },
      summaries: [],
      editors: [],
      translators: [],
      subjects: [],
      bookshelves: [],
      languages: [],
      copyright: false,
      media_type: "Text",
      formats: {},
      download_count: 0
    })
  }

  useEffect(() => {
    fetchBooks(currentPage, searchQuery);
  }, [currentPage, searchQuery])

  useEffect(() => {
    const existingSession = getCookie("session_id");

    if (!existingSession) {
      const sessionId = crypto.randomUUID();
      setCookie("session_id", sessionId, { expires: 365 })
      console.log("New session created:", sessionId);
    } else {
      console.log("Returning user, session:", existingSession);

      loginSession(existingSession);
    }
  }, []);

  useEffect(() => {
    if(user){
      fetchFavourites(user.id);
    }
  }, [user])

  useEffect(() => {
    console.log("Favourites updated:", favourites);
  }, [favourites])

  const displayBooks = books;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Explorer</h1>
      </header>

      <div className="app-container">
        <div className="main-content">
          <SearchBar onSearch={handleSearch} currentPage={currentPage} onPageChange={handlePageChange}  />

          {isLoading ? (
            <LoadingIndicator message="Loading books..." />
          ) : error ? (
            <div className="error-message">Error: {error.message}</div>
          ) : (
            <BookList
              books={displayBooks}
              onBookClick={handleBookClick}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={1}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        <aside className="sidebar">
          <FavouritesManager
            favourites={[...favourites.values()]}
            onRemoveFav={removeFav}
            onSelectFav={selectFav}
          />

          {selectedBook && (
            <div className="detail-panel">
              <BookDetail
                book={detailBook || selectedBook}
                isLoading={isDetailLoading}
                isBookmarked={isFavourited(selectedBook.id)}
                onFavouriteToggle={handleFavourteToggle}
                onClose={handleCloseDetail}
              />
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default App
