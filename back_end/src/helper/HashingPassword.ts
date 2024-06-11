import { compareSync, genSaltSync, hashSync } from 'bcrypt';

const hasingResult: {
  salt: string;
  password: string;
} = {
  salt: '',
  password: '',
};

export const hasingPassword = (inputString: string): typeof hasingResult => {
  const salt: string = genSaltSync(10);
  const password: string = hashSync(inputString, salt);
  return {
    salt,
    password,
  };
};

export const comparePassword = (
  inputPassword: string,
  password: string,
): boolean => {
  const result: boolean = compareSync(inputPassword, password);
  return result;
};
