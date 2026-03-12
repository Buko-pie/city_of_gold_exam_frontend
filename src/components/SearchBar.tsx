import React, { useState } from 'react'
import { useBooks } from '../hooks/useBooks'
import './SearchBar.css'

interface SearchBarProps {
  onSearch: (query: string) => void
  currentPage: number
  onPageChange: (page: number) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, currentPage, onPageChange }) => {
  const [query, setQuery] = useState('')
  const { pagination, isLoading } = useBooks();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
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
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
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
