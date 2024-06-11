import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const genAccessToken = (data: any): string => {
  const { id, username, role, email } = data;
  const access_token = jwt.sign(
    {
      id: id,
      email: email || '',
      username: username,
      role: role,
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: String(process.env.TOKEN_EXPIRE_TIME),
      algorithm: 'HS256',
    },
  );
  return access_token;
};
export const genRefreshToken = (data: any): string => {
  const { id, username, role, email } = data;
  const refresh_token = jwt.sign(
    {
      id: id,
      email: email || '',
      username: username,
      role: role,
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: String(process.env.REFRESH_TOKEN_EXPIRE_TIME),
      algorithm: 'HS256',
    },
  );
  return refresh_token;
};
export const verifyToken = (token: string): any => {
  const data = jwt.verify(token, String(process.env.JWT_SECRET)) as {
    id: string;
    username: string;
  };
  return data;
};
