import { api } from '../../http/http-client';
import { type GetSuggestionsResponseDto } from './get-suggestions.dto';

export async function getSuggestionsService(): Promise<GetSuggestionsResponseDto> {
  const response = await api.get('/suggestions/getSuggestionForUser');

  return response.data;
}
