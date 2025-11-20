import { api } from '../../http/http-client';
import {
  CreateCheckInsRequestDto,
  CreateCheckInsResponseDto,
} from './create-checkin.dto';

export async function createCheckInService({
  mood,
  note,
}: CreateCheckInsRequestDto): Promise<CreateCheckInsResponseDto> {
  const response = await api.post('/checkins/create', {
    mood,
    note,
  });

  return response.data;
}
