import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
// import ReactFlipCard from 'reactjs-flip-card'

const FlipCard = (props: any) => {
    const { term, define, card } = props
    const [isFlipped, setIsFlipped] = React.useState(false)
    const flipCard = () => {
        setIsFlipped(!isFlipped)
    }
    return (
        <Card onClick={flipCard} className={`min-h-80 hover:cursor-pointer p-0 [transform:rotateY(0deg)] [transform-style:preserve-3d] ease-in-out transition-all ${isFlipped ? '[transform:rotateY(180deg)]' : ""} flex justify-center items-center w-full h-full`}>
            {!isFlipped
                ? <div className="w-full h-full flex justify-center items-center overflow-auto">
                    <span>{term}</span>
                </div>
                : <div className="[transform:rotateY(180deg)] w-full h-full flex justify-center items-center overflow-hidden" >
                    <div className='flex flex-col max-h-full max-w-full gap-4 items-center'>
                        <span>{define}</span>
                        {card?.image && <>
                            <img src={card?.image} alt="card" className='object-contain max-w-full max-h-full w-3/4 h-3/4' />
                        </>}
                    </div>
                </div>}
        </Card>
    )
}

export default FlipCard