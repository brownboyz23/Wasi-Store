"use client"
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { FaMinus, FaStar } from 'react-icons/fa6'
import '../mainCss/upcrd.css'

interface Comp {
    image: string,
    name: string,
    desc: string,
    price: string,
    category: string,
}


type Component = {
    ProCardzs: Comp,
    closeCard: () => void,
}




const CardsUp = ({ ProCardzs, closeCard }: Component) => {


    const router = useRouter()


    const handleBuyNow = async (proId: Comp) => {
        try {
            await addDoc(collection(db, 'orders'), {
                image: proId.image,
                name: proId.name,
                price: proId.price,
                desc: proId.desc,
                createdAt: new Date(),
                status: "pending",
            })
            router.push('./Dashboard/buyingdashboard/')
        } catch (error) {
            console.log('There is an Error', error)
            alert("Something Wents to Wrong")
        }
    }

    return (

        <div className='container overflow-hidden rounded-md crdupx' onClick={closeCard}>
            <div className='crdupxfs'>
                <Card className='crdupxm'>
                    <img src={ProCardzs.image}
                        alt=''
                        width={350}
                        height={350}
                        className='w-full h-[350px] object-fill crdupxIm'
                    />
                    <CardHeader className='flex flex-col gap-3 justify-center items-center crdupxsm'>
                        <CardTitle className='text-3xl crdupxHn'>
                            {ProCardzs.name}
                        </CardTitle>
                        <div className='mt-2'>
                            <h1 className='text-xl'> <span className='text-red-500 font-bold'>RS :</span> {ProCardzs.price}</h1>
                        </div>
                        <CardDescription className='text-xl text-gray-400 text-center line-clamp-2 crdupxnM'>
                            {ProCardzs.desc}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className='flex justify-center gap-3 items-center text-yellow-400'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </CardFooter>
                    <div className='flex justify-center items-center '>
                        <Button className='w-[10vw] h-[35px] crdupxbtnb' onClick={() => handleBuyNow(ProCardzs)}>
                            Buy Now
                        </Button>
                    </div>
                </Card>
            </div>
        </div>

    )
}

export default CardsUp