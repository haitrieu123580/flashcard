import { compareSync, genSaltSync, hashSync } from 'bcrypt';

type IHashingPassword ={
  salt: string;
  password: string;
}

type comparePasswordInput = {
  inputPassword: string;
  password: string;
  salt?: string;
}

export const hasingPassword = (inputString: string): IHashingPassword => {
  const salt: string = genSaltSync(10);
  const password: string = hashSync(inputString, salt);
  return {
    salt,
    password,
  };
};

export const comparePassword = (
 data: comparePasswordInput
): boolean => {
  const result: boolean = compareSync(data.inputPassword, data.password);
  return result;
};
