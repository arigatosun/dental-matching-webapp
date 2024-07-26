export interface MatchingData {
    month: string;
    matchCount: number;
  }
  
  export interface ThootRankData {
    currentRank: string;
    progress: number;
    remainingMatches: number;
  }
  
  export interface ReviewData {
    id: number;
    name: string;
    workDate: string;
    overallRating: number;
    cleanliness: number;
    communication: number;
    workability: number;
  }
  
  export interface PerformanceSummary {
    totalMatches: number;
    averageRating: number;
  }