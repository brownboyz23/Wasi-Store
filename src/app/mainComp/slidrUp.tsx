"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import '../mainCss/upcrd.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules'
import { SetStateAction } from 'react'



interface products {
    image: string,
    name: string,
    desc: string,
    category: string,
    price: string,
    id?: string
}

type components = {
    ProCardx: SetStateAction<products[] | null>
    productXs: (item: products) => void,
}


const SliderUp = ({ ProCardx, productXs }: components) => {

    const router = useRouter()


    const handleBuyNow = async (proId: products) => {
        try {
            await addDoc(collection(db, 'orders'), {
                proId: proId.id,
                image: proId.image,
                name: proId.name,
                desc: proId.desc,
                price: proId.price || 0,
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
        <div className='relative w-min-screen py-12 flex justify-center items-center overflow-visible'>
            <Swiper
                loop={true}
                modules={[EffectCoverflow, Autoplay]}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                slidesPerView="auto"
                slidesPerGroup={1}
                grabCursor={true}
                loopAdditionalSlides={4}
                spaceBetween={0}
                observer={true}
                observeParents={true}
                centeredSlides={true}
                effect='coverflow'
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 150,
                    modifier: 2.5,
                    slideShadows: false,
                }}

                className='w-full blur-[2px] overflow-visible py-10 flex justify-center items-center '
            >
                {Array.isArray(ProCardx) && ProCardx.map((item) => (
                    <SwiperSlide key={item.id || item.name} className=" !w-[280px] sm:!w-[320px] " onClick={() => ProCardx && productXs(item)}>
                        {({ isActive }) => (
                            <div
                                className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${isActive
                                    ? 'scale-125 -translate-y-6 border-blue-500 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20'
                                    : 'scale-90 opacity-40 border-gray-900 z-10'
                                    }`}
                            >
                                <div className="relative h-[300px] w-full border-2">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                        className="w-full h-[250px] object-cover rounded-t-xl"
                                    />
                                    <div className="absolute inset-0 bg-black/40 p-3 flex flex-col justify-between">
                                        <h1 className="text-xl text-white font-bold">{item.name}</h1>

                                        <div className="w-full">
                                            <Button
                                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                                onClick={() => handleBuyNow(item)}
                                            >
                                                Buy Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))
                }
            </Swiper>
        </div>

    )
}

export default SliderUp