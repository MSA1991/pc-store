export type SignUpForm = {
  userPhoto: File | null;
  userName: string;
  userEmail: string;
  userPassword: string;
  confirmedPassword: string;
};

export type LogInForm = {
  userEmail: string;
  userPassword: string;
  rememberUser: boolean;
};
