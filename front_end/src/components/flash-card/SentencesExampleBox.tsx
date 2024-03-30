import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
const SentencesExampleBox = (props: any) => {
    const { example } = props;
    console.log('example', typeof JSON.parse(example), example)
    return (
        <Card className="w-full h-full p-2 ">
            <CardTitle className='font-semibold text-lg'> Example Sentences</CardTitle>
            <CardContent className='grid grid-rows row-auto w-full h-full p-0'>
                <div className='flex flex-col'>
                    {Array.isArray(JSON.parse(example)) && JSON.parse(example).map((item: any, index: number) => (
                        <div key={index}>
                            <Separator />
                            <div className='py-4' >
                                <div>
                                    {item?.sentence}
                                </div>
                                <i className=''>
                                    {item?.translation}
                                </i>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default SentencesExampleBox
