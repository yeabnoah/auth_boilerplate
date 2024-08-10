interface UserInterface {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  emailActivated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default UserInterface;
