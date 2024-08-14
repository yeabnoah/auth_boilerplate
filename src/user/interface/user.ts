interface UserInterface {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  emailActivated?: boolean;
  githubId?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default UserInterface;
