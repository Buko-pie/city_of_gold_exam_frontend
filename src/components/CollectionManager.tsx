import React, { useState } from 'react'
import { Collection } from '../types/index'
import './CollectionManager.css'

interface CollectionManagerProps {
  collections: Collection[]
  onCreateCollection: (name: string) => Promise<void>
  onDeleteCollection: (collectionId: string) => Promise<void>
  onSelectCollection: (collection: Collection) => void
}

export const CollectionManager: React.FC<CollectionManagerProps> = ({
  collections,
  onCreateCollection,
  onDeleteCollection,
  onSelectCollection
}) => {
  const [newCollectionName, setNewCollectionName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCollectionName.trim()) return

    setIsCreating(true)
    try {
      await onCreateCollection(newCollectionName)
      setNewCollectionName('')
    } catch (error) {
      console.error('Failed to create collection:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="collection-manager">
      <h2>My Collections</h2>

      <form onSubmit={handleCreateCollection} className="create-collection-form">
        <input
          type="text"
          placeholder="New collection name..."
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          disabled={isCreating}
          className="collection-input"
        />
        <button type="submit" disabled={isCreating} className="create-button">
          {isCreating ? 'Creating...' : 'Create'}
        </button>
      </form>

      {collections.length === 0 ? (
        <p className="empty-message">No collections yet. Create one to get started!</p>
      ) : (
        <div className="collections-list">
          {collections.map(collection => (
            <div key={collection.id} className="collection-item">
              <div
                className="collection-info"
                onClick={() => onSelectCollection(collection)}
              >
                <h3>{collection.name}</h3>
                <p>{collection.bookIds.length} books</p>
              </div>
              <button
                className="delete-button"
                onClick={() => onDeleteCollection(collection.id)}
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
