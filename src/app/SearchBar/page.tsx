"use client"

export const dynmaic = 'force-dynamic'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import React, { Suspense, useEffect, useState } from 'react'
import { productsData } from '@/lib/productsData'
import { Button } from '@/components/ui/button'
import { FaStar } from 'react-icons/fa6'
import { useRouter, useSearchParams } from 'next/navigation'

function ConSearchBar() {


    const router = useRouter()

    const searchparams = useSearchParams()
    const querysearch = searchparams.get("query") || "";

    const [searchitem, setSearchitem] = useState("")

    useEffect(() => {
        setSearchitem(querysearch)
    }, [querysearch])


    const filteredProducts = productsData.filter((item) => {
        const search = searchitem.toLowerCase().trim()
        return (
            item.title.toLowerCase().includes(search) ||
            item.category.toLowerCase().includes(search)
        );
    })



    return (
        <div>
            <div className='container min-h-screen '>
                <div className='w-full relative mt-40 '>
                    {filteredProducts.length > 0 ? (
                        <div className='w-full h-[screen] grid grid-cols-1 lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2 gap-10 '>
                            {filteredProducts.map((item) => (
                                <div key={item.id} className=''>
                                    <Card className='w-[200px] h-[330px] py-0  rounded flex justify-center items-center border'>
                                        <img
                                            src={`/${item.category}/${encodeURIComponent(item.title)}.png`}
                                            alt={`item.id`}
                                            className='w-[200px] h-[160px] p-2'
                                        />
                                        <div className='w-[200px] h-[170px] flex flex-col gap-1  justify-center items-center p-2 '>
                                            <CardHeader className='line-clamp-1 w-full text-center '>
                                                <h1 className=' font-bold'>{item.title}</h1>
                                            </CardHeader>
                                            <CardFooter className='line-clamp-2 text-center'>
                                                <p>{item.desc}</p>
                                            </CardFooter>
                                            <h3 className='text-red'> <span className='text-red-500  font-bold'>RS</span> : {item.price.toLocaleString()}</h3>
                                            <div className='text-orange-300 flex gap-3'>
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                            <Button className='w-[100px] h-[28px] mt-3'>
                                                Buy Now
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            ))
                            }
                        </div>
                    ) : (
                        ///Not Found Massage
                        <div className='flex flex-col justify-center items-center'>
                            <div>
                                <h1 className='text-3xl langugP7 bold'>Result Not Found</h1>
                                <div className='text-center'>
                                    <Button
                                        onClick={() => router.push("/products")}
                                        className='mt-15 hover:bg-blue-400 h-[35px] w-[100px]'
                                    >
                                        Vist More Products
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default function SearchBar() {
    return (
        <Suspense fallback={<div className=' text-center mt-40 text-xl font-bold'>Loading Search Result</div>}>
            <ConSearchBar />
        </Suspense>
    )
}