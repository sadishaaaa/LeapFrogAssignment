export interface User {
  UserId: number;
  UserName: string;
  Address: string;
  PhoneNumber: string;
  Email: string;
  Password: string;
  EmailVerified: boolean;
}

const users: User[] = [];

export default users;
