import { api } from '@/src/infra/http/http-client';
import { type SignInRequestDto, type SignInResponseDto } from './sign-in.dto';

export async function signInService(
  dto: SignInRequestDto
): Promise<SignInResponseDto> {
  const { data } = await api.post<SignInResponseDto>('/auth/login', dto);

  return data;
}
