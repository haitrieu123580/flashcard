import React, { useEffect } from 'react'
import { Card, CardTitle } from '@/components/ui/card';
import { Star, Volume1 } from 'lucide-react';
import { cn, isFunction, speek } from '@/lib/utils';
import { Button } from '../ui/button';
import UserSetPopover from './user-set-popover/UsetSetPopover';

const FlipCard = (props: any) => {
    const { card, onFlip } = props
    const [isFlipped, setIsFlipped] = React.useState(false)
    const flipCard = () => {
        setIsFlipped(!isFlipped)
        if (isFlipped) {
            isFunction(onFlip) && onFlip(card)
        }
    }

    return (
        <Card className='flex flex-col items-end p-2 shadow-lg dard:shadow-lg'>
            <CardTitle className='flex justify-end items-end gap-2'>
                <Button
                    variant={'ghost'}
                    className='w-fit h-fit rounded-full p-0'
                    onClick={() => {
                        speek(card?.term)
                    }}>
                    <Volume1 />
                </Button>
                <UserSetPopover
                    cardId={card?.id}
                />
            </CardTitle>
            <div className={`min-h-80 hover:cursor-pointer p-0 [transform:rotateY(0deg)] [transform-style:preserve-3d] ease-in-out transition-all ${isFlipped ? '[transform:rotateY(180deg)]' : ""} flex justify-center items-center w-full h-full`} onClick={flipCard} >
                {!isFlipped
                    ? <div className="w-full h-full flex justify-center items-center overflow-auto text-lg">
                        <span>{card?.term}</span>
                    </div>
                    : <div className="[transform:rotateY(180deg)] w-full h-full flex justify-center items-center overflow-hidden" >
                        <div className='grid grid-cols-2 gap-2 px-4'>
                            <div
                                className={cn('col-span-1 text-center m-auto text-lg',
                                    !card?.image ? "col-span-2" : ""
                                )}
                                onCopy={() => { return false }} onSelect={() => { return false }}>{card?.define}</div>
                            {card?.image && <div className='col-span-1'>
                                <img src={card?.image} alt="card" className='object-contain max-w-full max-h-full w-full h-full rounded-sm' />
                            </div>}
                        </div>
                    </div>}
            </div>
        </Card>
    )
}

export default FlipCard