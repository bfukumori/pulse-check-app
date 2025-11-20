import { api } from '../../http/http-client';
import { type GetCheckInsResponseDto } from './get-checkins.dto';

export async function getAdminCheckInService(
  userId: number
): Promise<GetCheckInsResponseDto> {
  const response = await api.get(`/checkins/user/${userId}`);

  return response.data;
}
