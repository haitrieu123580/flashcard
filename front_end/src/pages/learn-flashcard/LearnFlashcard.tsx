import FlipCard from "@/components/flash-card/FlipCard"
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Volume1 } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SentencesExampleBox from "@/components/flash-card/SentencesExampleBox";
import NewsetSets from "@/components/home/newest-sets/NewsetSets";
const LearnFlashcard = () => {
    return (
        <div>
            <Card className="w-full min-h-[500px]  p-10 flex flex-col justify-between">
                <CardTitle>Set name</CardTitle>
                <CardContent className="w-full h-full md:h-1/2 p-0 grid grid-cols-1 md:grid-cols-6 gap-1">
                    <div className="col-span-1 md:col-span-3 flex flex-col gap-2 h-fit">
                        <div className="flex justify-end hover:cursor-pointer">
                            <Volume1 />
                        </div>
                        <FlipCard term="Front" define="Back" />
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1 md:col-span-2">
                        <SentencesExampleBox />
                    </div>
                </CardContent>
                <CardFooter className="grid grid-cols-1 md:grid-cols-6 gap-1">
                    <div className="col-span-1 md:col-span-3 flex justify-end gap-6 items-center">
                        <Button variant={"ghost"}><ChevronLeft /></Button>
                        <span>1/total</span>
                        <Button variant={"ghost"}><ChevronRight /></Button>
                    </div>
                    <div className="col-span-3"></div>
                </CardFooter>
            </Card>
            <div className="mt-10">
                <NewsetSets />
            </div>
        </div>
    )
}

export default LearnFlashcard