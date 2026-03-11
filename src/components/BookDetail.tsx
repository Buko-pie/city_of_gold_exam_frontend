import React from 'react'
import { Book } from '../types/index'
import { BookmarkButton } from './BookmarkButton'
import './BookDetail.css'

interface BookDetailProps {
  book: Book | null
  relatedBooks: Book[]
  isLoading: boolean
  isBookmarked: boolean
  onBookmarkToggle: (bookId: string) => void
  onClose: () => void
  onRelatedBookClick: (book: Book) => void
}

export const BookDetail: React.FC<BookDetailProps> = ({
  book,
  relatedBooks,
  isLoading,
  isBookmarked,
  onBookmarkToggle,
  onClose,
  onRelatedBookClick
}) => {
  if (isLoading) {
    return <div className="book-detail loading">Loading...</div>
  }

  if (!book) {
    return <div className="book-detail empty">No book selected</div>
  }

  return (
    <div className="book-detail">
      <button className="close-button" onClick={onClose}>✕</button>

      <div className="detail-container">
        <div className="detail-header">
          <img src={book.coverImage} alt={book.title} className="detail-cover" />
          <div className="detail-meta">
            <h1>{book.title}</h1>
            <p className="author">by {book.author}</p>
            <div className="rating">★ {book.rating.toFixed(1)}</div>
            <BookmarkButton
              bookId={book.id}
              isBookmarked={isBookmarked}
              onToggle={onBookmarkToggle}
            />
          </div>
        </div>

        <div className="detail-content">
          <div className="info-section">
            <h3>Details</h3>
            <dl>
              <dt>ISBN:</dt>
              <dd>{book.isbn}</dd>
              <dt>Publication Date:</dt>
              <dd>{new Date(book.publicationDate).toLocaleDateString()}</dd>
              <dt>Pages:</dt>
              <dd>{book.pageCount}</dd>
              <dt>Genres:</dt>
              <dd>{book.genre.join(', ')}</dd>
            </dl>
          </div>

          <div className="info-section">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>

          {relatedBooks.length > 0 && (
            <div className="info-section">
              <h3>Related Books</h3>
              <div className="related-books">
                {relatedBooks.map(relatedBook => (
                  <div
                    key={relatedBook.id}
                    className="related-book-card"
                    onClick={() => onRelatedBookClick(relatedBook)}
                  >
                    <img src={relatedBook.coverImage} alt={relatedBook.title} />
                    <p className="related-title">{relatedBook.title}</p>
                    <p className="related-author">{relatedBook.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
