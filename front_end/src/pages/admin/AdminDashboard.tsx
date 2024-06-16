import React from 'react';

import defaultImage from '@/assets/images/flashcard_bg.jpeg';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const AdminDashboard = () => {
  return (
    <div>
      <AspectRatio
        ratio={1 / 1}
        className="aspect-square h-auto w-auto object-contain"
      >
        <img
          src={defaultImage}
          alt="bg"
          className="h-full w-full object-contain"
        />
      </AspectRatio>
    </div>
  );
};

export default AdminDashboard;
