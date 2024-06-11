import React from 'react';

import Somethingwentwrong from '@/assets/images/somethingwentwrong.png';

const AuthError = () => {
  return (
    <div className="w-full">
      <h1 className="text-center text-lg font-bold">Please try again !</h1>
      <div className="m-auto flex justify-center">
        <img
          src={Somethingwentwrong}
          alt="something went wrong"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default AuthError;
