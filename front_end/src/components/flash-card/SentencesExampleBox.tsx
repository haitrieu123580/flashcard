import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
const SentencesExampleBox = () => {
    return (
        <Card className="w-full h-full p-2 ">
            <CardTitle className='font-semibold text-lg'> Example Sentences</CardTitle>
            <CardContent className='grid grid-rows row-auto w-full h-full p-0'>
                <div className='flex flex-col'>
                    <Separator />
                    <div>
                        Example sentence
                    </div>
                    <i className=''>
                        Translation
                    </i>
                </div>
            </CardContent>
        </Card>
    )
}

export default SentencesExampleBox
