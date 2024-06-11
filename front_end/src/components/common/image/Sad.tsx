import React from 'react';

import image from '@/assets/images/try_again.jpg';

const Sad = () => {
  return (
    <div>
      <img src={image} alt="congrat" className="h-full w-full object-contain" />
    </div>
  );
};

export default Sad;
