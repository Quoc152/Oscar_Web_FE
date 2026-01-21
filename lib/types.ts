export interface Artist {
  id: string;
  name: string;
  image: string;
  category: string;
  employeeId?: string;
  englishname?: string;
  votecount?: number;
}

export interface Category {
  id: string;
  name: string;
  round: string;
  artists: Artist[];
}

export interface VoteData {
  artistId: string;
  categoryId: string;
  timestamp: Date;
}
