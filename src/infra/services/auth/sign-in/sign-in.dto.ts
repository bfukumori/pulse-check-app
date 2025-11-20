interface SignInRequestDto {
  email: string;
  password: string;
}

interface SignInResponseDto {
  token: string;
  type: string;
  expiresIn: string;
}

export { type SignInRequestDto, type SignInResponseDto };
