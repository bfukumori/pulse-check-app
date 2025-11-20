import { api } from '../../http/http-client';
import { type GetStatsResponseDto } from './get-stats.dto';

export async function getStatsService(): Promise<GetStatsResponseDto> {
  const response = await api.get('/checkins/getCheckinStatus');

  return response.data;
}
