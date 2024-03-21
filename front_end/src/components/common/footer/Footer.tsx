import { Copyright } from 'lucide-react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Separator } from "@/components/ui/separator"

const Footer = () => {
    return (

        <footer className='py-6'>
            <Separator />
            <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row !p-0'>
                <MaxWidthWrapper className='flex'>
                    <div className='flex w-full'>
                        <Copyright />  <span> {" 2024 TrieuHTH"}</span>
                    </div>
                </MaxWidthWrapper>


            </div>
        </footer>
    )
}

export default Footer
