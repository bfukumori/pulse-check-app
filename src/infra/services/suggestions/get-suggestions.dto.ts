type Suggestion = {
  id: number;
  title: string;
  description: string;
  moodTarget: number;
};

type GetSuggestionsResponseDto = Suggestion[];

export { type GetSuggestionsResponseDto };
