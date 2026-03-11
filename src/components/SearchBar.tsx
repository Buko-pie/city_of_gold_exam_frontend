import React, { useState } from 'react'
import { Filter } from '../types/index'
import './SearchBar.css'

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilter: (filters: Filter[]) => void
}

const GENRES = ['Fiction', 'Science Fiction', 'Fantasy', 'Romance', 'Drama', 'Classic', 'Adventure', 'Dystopian', 'Poetry']

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilter }) => {
  const [query, setQuery] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [author, setAuthor] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleGenreChange = (genre: string) => {
    const updated = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre]
    setSelectedGenres(updated)

    const filters: Filter[] = [
      ...updated.map(g => ({ type: 'genre' as const, value: g }))
    ]
    if (author) {
      filters.push({ type: 'author', value: author })
    }
    onFilter(filters)
  }

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAuthor = e.target.value
    setAuthor(newAuthor)

    const filters: Filter[] = [
      ...selectedGenres.map(g => ({ type: 'genre' as const, value: g }))
    ]
    if (newAuthor) {
      filters.push({ type: 'author', value: newAuthor })
    }
    onFilter(filters)
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

      <div className="filters">
        <div className="filter-group">
          <label className="filter-label">Author:</label>
          <input
            type="text"
            placeholder="Filter by author..."
            value={author}
            onChange={handleAuthorChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Genres:</label>
          <div className="genre-checkboxes">
            {GENRES.map(genre => (
              <label key={genre} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
