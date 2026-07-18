"use client"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaStar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CardsUp from '@/app/mainComp/cardup';
import { useRouter } from 'next/navigation';
import '../../mainCss/mainX.css'


interface products {
    image: string,
    name: string
    desc: string,
    price: string,
    category: string,

}


const LMProducts = () => {

    const [hoverProducts, setHoveredProducts] = useState<products | null>(null)
    const [products, setProduct] = useState<products[]>([])
    const router = useRouter()

    useEffect(() => {
        const proAdd = async () => {
            try {
                const getPro = await getDocs(collection(db, "products"))
                const pstPro = getPro.docs.map(doc => ({
                    id: doc.id,

                    ...(doc.data() as products)
                }))
                setProduct(pstPro)
            } catch (error) {
                console.log('there is an error', error)
                alert("something wents to wrongs")
            }
        }
        proAdd()
    },[])

    const handleBuyNow = async (itemsId: products) => {
        try {
            await addDoc(collection(db, 'orders'), {
                image: itemsId.image,
                name: itemsId.name,
                price: itemsId.price,
                desc: itemsId.desc,
                createdAt: new Date(),
                status: "pending",
            })
            router.push('/Dashboard/buyingdashboard/')
        } catch (error) {
            console.log('there is an error', error)
            alert("Something Wents to Wrong")

        }
    }

    const filterd = products.filter((CurEl) => {
        return CurEl.category === "LMP"
    })

    return (

        <div className='container'>
            {products && (
                <div className='w-full CardXrp '>
                    {
                        filterd.map((items, index) => (
                            <Card key={index} className='w-[190px] h-[330px] py-0  border white shadow-lg CardResp' onClick={() => setHoveredProducts(items)}>
                                <img
                                    src={items.image}
                                    alt=''
                                    style={{ objectFit: "fill" }}
                                    className='w-full h-full'
                                />
                                <CardHeader className='text-center langugP7  h-[150px] '>
                                    <CardTitle className=' line-clamp-1'>
                                        <h1 className='mb-2'> {items.name} </h1>
                                    </CardTitle>
                                    <h1> <span className='text-red-600'>RS</span> : {items.price}  </h1>
                                    <CardDescription className='line-clamp-2'>
                                        <h1> {items.desc} </h1>
                                    </CardDescription>
                                </CardHeader>
                                <div className='flex justify-center gap-2 '>
                                    <FaStar className='text-yellow-500' />
                                    <FaStar className='text-yellow-500' />
                                    <FaStar className='text-yellow-500' />
                                    <FaStar className='text-yellow-500' />
                                    <FaStar />
                                </div>
                                <div className='text-center'>
                                    <Button className='w-30 bg-black rounded-sm langugP2 mb-1 ctgbtn' onClick={() => handleBuyNow(items)}>Buy Now</Button>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            )
            }

            <div className="relative">
                {hoverProducts && (
                    <div className=" inset-0 fixed flex justify-center items-center bg-black/40 z-50  ">
                        <CardsUp
                            ProCardzs={hoverProducts}
                            closeCard={() => setHoveredProducts(null)}
                        />
                    </div>
                )
                }
            </div>
        </div >
    )
}

export default LMProducts