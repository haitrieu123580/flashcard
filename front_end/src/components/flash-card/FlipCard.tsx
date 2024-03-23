import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
// import ReactFlipCard from 'reactjs-flip-card'

const FlipCard = (props: any) => {
    const { term, define } = props
    const [isFlipped, setIsFlipped] = React.useState(false)
    const flipCard = () => {
        setIsFlipped(!isFlipped)
    }
    return (
        <Card onClick={flipCard} className={`min-h-80 hover:cursor-pointer p-0 [transform:rotateY(0deg)] [transform-style:preserve-3d] ease-in-out transition-all ${!isFlipped ? '[transform:rotateY(180deg)]' : ""} flex justify-center items-center w-full h-full`}>
            {isFlipped
                ? <div className="w-full h-full flex justify-center items-center overflow-auto">
                    {term}
                </div>
                : <div className="[transform:rotateY(180deg)] w-full h-full flex justify-center items-center overflow-auto" >
                    {define}
                </div>}
        </Card>
    )
}

export default FlipCard