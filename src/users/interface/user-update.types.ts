export interface UserUpdate {
  username?: string;
  password?: string;
  twoFASecret?: string;
  enable2FA?: boolean;
}
