import { Copyright } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import MaxWidthWrapper from '../MaxWidthWrapper';

const Footer = () => {
  return (
    <div className="">
      <div className="container flex flex-col items-center justify-between gap-4 !p-0 md:h-24 md:flex-row">
        <div className="flex w-full">
          <Copyright /> <span> {' 2024 TrieuHTH'}</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
