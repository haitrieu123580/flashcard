import React from 'react'
import Somethingwentwrong from '@/assets/images/somethingwentwrong.png'
const AuthError = () => {
    return (
        <div className='w-full'>
            <h1 className='text-lg font-bold text-center'>Please try again !</h1>
            <div className='m-auto flex justify-center'>
                <img src={Somethingwentwrong} alt="something went wrong" className=' object-contain' />
            </div>
        </div>
    )
}

export default AuthError