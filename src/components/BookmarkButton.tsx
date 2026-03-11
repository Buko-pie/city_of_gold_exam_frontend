import React from 'react'
import './BookmarkButton.css'

interface BookmarkButtonProps {
  bookId: string
  isBookmarked: boolean
  onToggle: (bookId: string) => void
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  bookId,
  isBookmarked,
  onToggle
}) => {
  return (
    <button
      className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
      onClick={() => onToggle(bookId)}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      ★
    </button>
  )
}
