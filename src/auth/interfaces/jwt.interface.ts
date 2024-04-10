export interface JwtPayload {
  username: string;
  artistId?: number;
}

export interface AccessTokenResponse {
  accessToken: string;
}
