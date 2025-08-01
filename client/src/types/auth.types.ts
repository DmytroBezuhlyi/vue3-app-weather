export interface AuthState {
  token: string | null
  tokenExpiresAt: number | null
  email: string | null
}
