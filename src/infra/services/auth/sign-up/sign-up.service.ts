import { api } from "@/src/infra/http/http-client";
import { SignUpRequestDto, SignUpResponseDto } from "./sign-up.dto";

export async function signUpService(
  dto: SignUpRequestDto
): Promise<SignUpResponseDto> {
  const { data } = await api.post<SignUpResponseDto>("/auth/register", dto);
  return data;
}
