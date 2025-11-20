type Mood = {
  date: string;
  averageMood: number;
};

type GetStatsResponseDto = {
  averageMood: number;
  totalCheckins: number;
  last7Days: Mood[];
};

export { type GetStatsResponseDto };
