"use client"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import "./css/banner.css"
import LMProducts from './LMProducts'



const LoadMoreSec = () => {

    const [loadmore, SetLodmore] = useState("LoadMore")

    return (
        <div className='container'>
            <div className=''>
                <div className='flex items-center justify-center'>
                    <Button value={"Loadmore"} onClick={() => SetLodmore("Loadmore")} className='w-40  h-12 text-xl bg-black hover:bg-white hover:text-black hover:border border-gray-400 langugP2'>
                        Load More
                    </Button>
                </div>
            </div>
            {loadmore === "Loadmore" && (
                <div className='mb-30 mt-10'>
                    <LMProducts />
                </div>
            )
            }
        </div>
    )
}

export default LoadMoreSec