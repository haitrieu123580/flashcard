import React from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Star, Volume1 } from 'lucide-react';
import { speek } from '@/lib/utils';
const FlipCard = (props: any) => {
    const { term, define, card } = props
    const [isFlipped, setIsFlipped] = React.useState(false)
    const [isStarred, setIsStarred] = React.useState(false)
    const flipCard = () => {
        setIsFlipped(!isFlipped)
    }
    return (
        <Card className='flex flex-col items-end p-2'>
            <CardTitle className='flex justify-end items-end gap-4'>
                <div className="flex justify-end hover:cursor-pointer" onClick={() => {
                    speek(card?.term)
                }}>
                    <Volume1 />
                </div>
                <Star
                    onClick={() => {
                        setIsStarred(!isStarred)
                    }}
                    className={`${isStarred ? "fill-yellow-400" : ""} cursor-pointer`}
                />
            </CardTitle>
            <div className={`min-h-80 hover:cursor-pointer p-0 [transform:rotateY(0deg)] [transform-style:preserve-3d] ease-in-out transition-all ${isFlipped ? '[transform:rotateY(180deg)]' : ""} flex justify-center items-center w-full h-full`} onClick={flipCard} >
                {!isFlipped
                    ? <div className="w-full h-full flex justify-center items-center overflow-auto">
                        <span>{term}</span>
                    </div>
                    : <div className="[transform:rotateY(180deg)] w-full h-full flex justify-center items-center overflow-hidden" >
                        <div className='flex flex-col max-h-full max-w-full gap-4 items-center'>
                            <span onCopy={() => { return false }} onSelect={() => { return false }}>{define}</span>
                            {card?.image && <>
                                <img src={card?.image} alt="card" className='object-contain max-w-full max-h-full w-3/4 h-3/4 rounded-sm' />
                            </>}
                        </div>
                    </div>}
            </div>
        </Card>
    )
}

export default FlipCard