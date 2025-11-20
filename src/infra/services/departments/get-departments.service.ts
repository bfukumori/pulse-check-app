import { api } from '../../http/http-client';
import { type GetDepartmentsResponseDto } from './get-departments.dto';

export async function getDepartmentsService(): Promise<GetDepartmentsResponseDto> {
  const response = await api.get('/departments');

  return response.data;
}
