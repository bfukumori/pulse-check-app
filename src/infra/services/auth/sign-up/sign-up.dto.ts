interface SignUpRequestDto {
  name: string;
  email: string;
  password: string;
  departmentId?: number;
}

interface SignUpResponseDto {
  id: string;
  name: string;
  email: string;
}

export { type SignUpRequestDto, type SignUpResponseDto };
