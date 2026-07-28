"use client"

export const dynmaic = 'force-dynamic'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import '../mainCss/mainX.css'
import React, { Suspense, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaStar } from 'react-icons/fa6'
import { useRouter, useSearchParams } from 'next/navigation'
import CardsUp from '../mainComp/cardup'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'


interface products {
    image: string,
    name: string,
    desc: string,
    category: string,
    price: string,
    id?: string,
}

function ConSearchBar() {


    const router = useRouter()

    const [hoverProducts, setHoveredProducts] = useState<products | null>(null)
    const [products, setProducts] = useState<products[]>([])

    const searchparams = useSearchParams()
    const querysearch = (searchparams?.get("query") || "").toLowerCase();

    const [searchitem, setSearchitem] = useState("")

    useEffect(() => {
        setSearchitem(querysearch.toLowerCase().trim())
    }, [querysearch])


    useEffect(() => {
        const getproDucts = async () => {
            try {
                const data = await getDocs(collection(db, "products"))
                const dataSe = data.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as products)
                }))
                setProducts(dataSe)
            } catch (error) {
                console.error("There is an Error", error)
                alert("Something Wents To Wrong")
            }

        }
        getproDucts()
    }, [])


    const handleBuyNow = async (items: products) => {
        try {
            await addDoc(collection(db, "products"), {
                name: items.name,
                price: items.price,
                desc: items.desc,
                id: items.id,
                createdAt: new Date(),
                status: "Pending",
            })
            router.push('/Dashboard/buyingdashboard/')
        } catch (error) {
            console.log('there is an error', error)
            alert("Something Wents to Wrong")
        }

    }


    const filteredProducts = products.filter((item) => {
        const search = searchitem.toLowerCase().trim()

        if (!search) return false;

        return (
            item.name?.toString().toLowerCase().includes(search) ||
            item.category?.toString().toLowerCase().includes(search)
        );
    })



    return (
        <div>
            <div className='container min-h-screen '>
                <div className='w-full relative mt-40 '>
                    {filteredProducts.length > 0 ? (
                        <div className='CardXrp'>
                            {
                                filteredProducts.map((items, index) => (
                                    <div key={index} className='relative'>
                                        <Card className='w-[200px] min-h-[320px] py-0  border white shadow-lg CardResp' onClick={() => setHoveredProducts(items)}>
                                            <img
                                                src={items.image}
                                                alt=''
                                                style={{ objectFit: "fill" }}
                                                className='w-full  crdimg'
                                            />
                                            <CardHeader className='text-center langugP7 crdHd  h-[150px] '>
                                                <CardTitle className=' line-clamp-1 fontsgs'>
                                                    <h1 className=''> {items.name} </h1>
                                                </CardTitle>
                                                <h1 className='mt-1 fontPric'> <span className='text-red-600'>RS</span> : {items.price}  </h1>
                                                <CardDescription className='line-clamp-2  fontDesc'>
                                                    <h1 > {items.desc} </h1>
                                                </CardDescription>
                                                <div className='flex justify-center gap-2 crdstr '>
                                                    <FaStar className='text-yellow-500' />
                                                    <FaStar className='text-yellow-500' />
                                                    <FaStar className='text-yellow-500' />
                                                    <FaStar className='text-yellow-500' />
                                                    <FaStar />
                                                </div>
                                                <div className='text-center' >
                                                    <Button className='w-30 bg-black rounded-sm langugP2 mb-1 ctgbtn' onClick={() => handleBuyNow(items)}>Buy Now</Button>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                        {hoverProducts && String(hoverProducts.id || hoverProducts.id) === String(items.id || items.id) && (
                                            <div className='absolute top-10 left-10 z-50  overflow-y-auto'>
                                                <CardsUp
                                                    ProCardzs={hoverProducts}
                                                    closeCard={() => setHoveredProducts(null)}
                                                />
                                            </div>
                                        )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        ///Not Found Massage
                        <div className='flex flex-col justify-center items-center'>
                            <div>
                                <h1 className='text-3xl langugP7 bold fontsgs'>Result Not Found</h1>
                                <div className='text-center'>
                                    <Button
                                        onClick={() => router.push("/products")}
                                        className='mt-15 hover:bg-blue-400 h-[35px] w-[100px] ctgbtn'
                                    >
                                        More Products
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