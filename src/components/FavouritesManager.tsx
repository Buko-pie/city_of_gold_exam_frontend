import React, { useState } from 'react'
import { Favourite } from '../types/index'
import './FavouritesManager.css'

interface FavouritesManagerProps {
  favourites: Favourite[]
  onRemoveFav: (id: number) => Promise<void>
  onSelectFav: (id: number) => void
}

export const FavouritesManager: React.FC<FavouritesManagerProps> = ({
  favourites,
  onRemoveFav,
  onSelectFav
}) => {

  return (
    <div className="collection-manager">
      <h2>Favourites</h2>

      {favourites.length === 0 ? (
        <p className="empty-message">No favourites yet...</p>
      ) : (
        <div className="collections-list">
          {favourites.map(fav => (
            <div key={fav.id} className="collection-item">
              <div
                className="collection-info"
                onClick={() => onSelectFav(fav.bookId)}
              >
                <h3>{fav.title}</h3>
                <p>Author/s {fav.author}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => onRemoveFav(fav.bookId)}
                title="Delete collection"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
