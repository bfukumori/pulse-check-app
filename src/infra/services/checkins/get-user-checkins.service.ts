import { api } from '../../http/http-client';
import { type GetCheckInsResponseDto } from './get-checkins.dto';

export async function getCheckInService(): Promise<GetCheckInsResponseDto> {
  const response = await api.get('/checkins/me');

  return response.data;
}
