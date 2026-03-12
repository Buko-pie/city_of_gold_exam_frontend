interface Person {
  name: string;
  birth_year: number;
  death_year: number;
}

export interface Book {
  id: number;
  title: string;
  author: Person;
  authors?: Person[];
  summaries: string[];
  editors: Person[];
  translators: Person[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: "Text" | "Video" | "Audio";
  formats: Record<string, string>
  download_count: number;
}

export interface Favourite {
  id: string
  userId: string
  bookId: number
  title: string
  author: string
  addedAt: string
}

export type Favourites = Map<number, Favourite>

export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
  timestamp: string
}

export interface PaginationMeta {
  currentPage: number
  totalItems: number
  next_page: string | null;
  prev_page: string | null;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta
}
