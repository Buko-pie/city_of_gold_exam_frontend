import React from 'react'
import { Book } from '../types/index'
import { useBooks } from '../hooks/useBooks'
import './BookList.css'

interface BookListProps {
  books: Book[]
  onBookClick: (book: Book) => void
  isLoading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const BookList: React.FC<BookListProps> = ({
  books,
  onBookClick,
  isLoading,
  currentPage,
  onPageChange
}) => {
  const { pagination } = useBooks();
  if (isLoading) {
    return <div className="book-list loading">Loading books...</div>
  }

  if (books.length === 0) {
    return <div className="book-list empty">No books found</div>
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (pagination.next_page) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="book-list">
      <div className="books-grid">
        {books.map(book => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => onBookClick(book)}
          >
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              {book.authors?.map(author => (
                <p key={author.name} className="book-author">
                  - {author.name}
                </p>
              ))}
              <div className="book-rating">{book.download_count}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          title="Previous page"
        >
          &lt;
        </button>

        <span className="pagination-current">{currentPage}</span>

        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={!pagination.next_page || isLoading}
          title="Next page"
        >
          &gt;
        </button>
      </div>
    </div>
  )
}
