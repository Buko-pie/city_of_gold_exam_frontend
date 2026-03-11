import { useEffect, useState } from 'react'
import { Book, Collection } from './types/index'
import { useBooks } from './hooks/useBooks'
import { useSearch } from './hooks/useSearch'
import { useBookmarks } from './hooks/useBookmarks'
import { useCollections } from './hooks/useCollections'
import { useBookDetail } from './hooks/useBookDetail'
import { BookList } from './components/BookList'
import { SearchBar } from './components/SearchBar'
import { BookDetail } from './components/BookDetail'
import { CollectionManager } from './components/CollectionManager'
import { LoadingIndicator } from './components/LoadingIndicator'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFilters, setSearchFilters] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Hooks
  const { books, isLoading, error, totalPages } = useBooks(currentPage, 10)
  const { results: searchResults, isLoading: isSearchLoading } = useSearch(searchQuery, searchFilters)
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks()
  const { collections, createCollection, deleteCollection } = useCollections()
  const { book: detailBook, relatedBooks, isLoading: isDetailLoading } = useBookDetail(selectedBook?.id || '')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)
    setCurrentPage(1)
  }

  const handleFilter = (filters: any) => {
    setSearchFilters(filters)
    setIsSearching(true)
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
    window.scrollTo(0, 0)
  }

  const displayBooks = isSearching ? searchResults : books
  const isLoading_ = isSearching ? isSearchLoading : isLoading

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Book Explorer</h1>
        <p>Discover, search, and manage your favorite books</p>
      </header>

      <div className="app-container">
        <div className="main-content">
          <SearchBar onSearch={handleSearch} onFilter={handleFilter} />

          {isLoading_ ? (
            <LoadingIndicator message="Loading books..." />
          ) : error ? (
            <div className="error-message">Error: {error.message}</div>
          ) : (
            <BookList
              books={displayBooks}
              onBookClick={handleBookClick}
              isLoading={isLoading_}
              currentPage={currentPage}
              totalPages={isSearching ? 1 : totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        <aside className="sidebar">
          <CollectionManager
            collections={collections}
            onCreateCollection={createCollection}
            onDeleteCollection={deleteCollection}
            onSelectCollection={() => {}}
          />

          {selectedBook && (
            <div className="detail-panel">
              <BookDetail
                book={detailBook || selectedBook}
                relatedBooks={relatedBooks}
                isLoading={isDetailLoading}
                isBookmarked={isBookmarked(selectedBook.id)}
                onBookmarkToggle={toggleBookmark}
                onClose={handleCloseDetail}
                onRelatedBookClick={handleBookClick}
              />
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default App
