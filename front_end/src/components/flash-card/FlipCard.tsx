import React, { useEffect } from 'react';
import { Star, Volume1 } from 'lucide-react';

import { Card, CardTitle } from '@/components/ui/card';
import { cn, isFunction, speak } from '@/lib/utils';

import { Button } from '../ui/button';
import UserSetPopover from './user-set-popover/UsetSetPopover';

const FlipCard = (props: any) => {
  const { card, onFlip } = props;
  const [isFlipped, setIsFlipped] = React.useState(false);
  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      isFunction(onFlip) && onFlip(card);
    }
  };

  return (
    <Card className="dard:shadow-lg flex flex-col items-end p-2 shadow-lg">
      <CardTitle className="flex items-end justify-end gap-2">
        <Button
          variant={'ghost'}
          className="h-fit w-fit rounded-full p-0"
          onClick={() => {
            speak(card?.term);
          }}
        >
          <Volume1 />
        </Button>
        <UserSetPopover cardId={card?.id} />
      </CardTitle>
      <div
        className={`min-h-80 p-0 transition-all ease-in-out [transform-style:preserve-3d] [transform:rotateY(0deg)] hover:cursor-pointer ${isFlipped ? '[transform:rotateY(180deg)]' : ''} flex h-full w-full items-center justify-center`}
        onClick={() => {
          flipCard();
        }}
      >
        {!isFlipped ? (
          <div className="flex h-full w-full items-center justify-center overflow-auto text-lg">
            <span>{card?.term}</span>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center overflow-hidden [transform:rotateY(180deg)]">
            <div className="grid grid-cols-2 gap-2 px-4">
              <div
                className={cn(
                  'col-span-1 m-auto text-center text-lg',
                  !card?.image ? 'col-span-2' : '',
                )}
                onCopy={() => {
                  return false;
                }}
                onSelect={() => {
                  return false;
                }}
              >
                {card?.define}
              </div>
              {card?.image && (
                <div className="col-span-1">
                  <img
                    src={card?.image}
                    alt="card"
                    className="h-full max-h-full w-full max-w-full rounded-sm object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FlipCard;
