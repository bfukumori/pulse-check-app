import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: number;
  department_id: number;
  role: 'admin' | 'member';
  name: string;
}

export function decodeToken(token: string): TokenPayload {
  return jwtDecode<TokenPayload>(token);
}
