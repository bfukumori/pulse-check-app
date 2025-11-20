import { type SignInRequestDto, type SignInResponseDto } from './sign-in.dto';

export async function signInService(
  dto: SignInRequestDto
): Promise<SignInResponseDto> {
  return new Promise((resolve) => {
    console.info({ dto });
    return resolve({
      token: 'access-token',
      type: 'Bearer',
      expiresIn: new Date().toISOString(),
    });
  });
}
