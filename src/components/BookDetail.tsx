import React from 'react'
import { Book } from '../types/index'
import { BookmarkButton } from './BookmarkButton'
import './BookDetail.css'

interface BookDetailProps {
  book: Book | null
  isLoading: boolean
  isBookmarked: boolean
  onFavouriteToggle: (bookId: number, title: string, authors: string[]) => void
  onClose: () => void
}

export const BookDetail: React.FC<BookDetailProps> = ({
  book,
  isLoading,
  isBookmarked,
  onFavouriteToggle,
  onClose,
}) => {

  if (isLoading) {
    return <div className="book-detail loading">Loading...</div>
  }

  if (!book) {
    return <div className="book-detail empty">No book selected</div>
  }

  const toggle = () => {
    const authors = book.authors?.map((book) => book.name);
    onFavouriteToggle(book.id, book.title, authors as string[])
  }

  return (
    <div className="book-detail">
      <button className="close-button" onClick={onClose}>✕</button>

      <div className="detail-container">
        <div className="detail-header">
          <div className="detail-meta">
            <h1>{book.title}</h1>
            <p>Author/s</p>
            {book.authors?.map(author => (
              <h4 key={author.name}>
                - {author.name}
              </h4>
            ))}
            <div className="book-rating">Downloads: {book.download_count}</div>
            <BookmarkButton
              bookId={book.id.toString()}
              isBookmarked={isBookmarked}
              onToggle={toggle}
            />
          </div>
        </div>

        <div className="detail-content">
          <div className="info-section">
            <h3>Details</h3>
              <h4>Bookshelves:</h4>
              {book.bookshelves?.map((subject) => (
                <p key={`${book.id}_${subject}`}>{subject}</p>
              ))}
              <br />
              <h4>Subjects</h4>
              {book.subjects?.map((subject) => (
                <p key={`${book.id}_${subject}`}>{subject}</p>
              ))}
              <br />
              <h4>Languages:</h4>
              {book.languages?.map((lang) => (
                <p key={`${book.id}_${lang}`}>{lang.toUpperCase()}</p>
              ))}
              <br />
              <h4>Copyright:</h4>
              <p>{book.copyright ? "Yes" : "No"}</p>
          </div>

          <div className="info-section">
            <h3>Summary</h3>
            {book.summaries?.length > 0 ? (
              book.summaries.map((summary, index) => (
                <p key={`${book.id}_summary_${index}`} className="book-summary">
                  {summary}
                </p>
              ))
            ) : (
              <p>No summary available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
