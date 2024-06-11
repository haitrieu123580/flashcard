import React from 'react';

import image from '@/assets/images/congrat.png';

const Congrat = () => {
  return (
    <div>
      <img src={image} alt="congrat" className="h-full w-full object-contain" />
    </div>
  );
};

export default Congrat;
