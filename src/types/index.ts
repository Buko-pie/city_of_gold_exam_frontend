export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  publicationDate: string
  description: string
  genre: string[]
  rating: number
  coverImage: string
  pageCount: number
}

export interface Collection {
  id: string
  name: string
  bookIds: string[]
  createdAt: string
  updatedAt: string
}

export interface Filter {
  type: 'genre' | 'author' | 'year'
  value: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
  timestamp: string
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta
}
