import React from 'react'
import { Book } from '../types/index'
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
  totalPages,
  onPageChange
}) => {
  if (isLoading) {
    return <div className="book-list loading">Loading books...</div>
  }

  if (books.length === 0) {
    return <div className="book-list empty">No books found</div>
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
            <img src={book.coverImage} alt={book.title} className="book-cover" />
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <div className="book-rating">★ {book.rating.toFixed(1)}</div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
