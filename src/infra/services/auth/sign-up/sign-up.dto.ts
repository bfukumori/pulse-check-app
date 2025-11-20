interface SignUpRequestDto {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'member';
  department_id: number;
}

type SignUpResponseDto = string;

export { type SignUpRequestDto, type SignUpResponseDto };
