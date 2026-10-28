"use client"
import { useEffect, useState } from "react"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FaStar } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import CardsUp from '@/app/mainComp/cardup'
import '../../mainCss/mainX.css'
import { useRouter } from 'next/navigation'




interface products {
    image: string,
    name: string,
    price: string,
    desc: string,
    category: string,
    id: string
}

type comp = {
    selectItem: string
}

const Categorypst = ({ selectItem }: comp) => {


    // const cardRefs = useRef<(HTMLDivElement | null)[]>([]);


    const [hoverProducts, setHoveredProducts] = useState<products | null>(null)
    const [clickpro, setClickpro] = useState<products | null>(null)
    const [products, setProduct] = useState<products[]>([])
    const router = useRouter()

    useEffect(() => {
        const getpros = async () => {
            try {
                const getData = await getDocs(collection(db, 'products'))
                const postData = getData.docs.map(doc => ({
                    doc: doc.id,

                    ...(doc.data() as products)
                }))
                setProduct(postData)
            } catch (error) {
                console.log('here is an erorr', error)
                alert('something wents to wrong')
            }
        }
        getpros()
    }, [])



    const handleBuyNow = async (itemsId: products) => {
        try {
            await addDoc(collection(db, "orders",), {
                image: itemsId.image,
                name: itemsId.name,
                price: itemsId.price,
                desc: itemsId.desc,
                createdAt: new Date(),
                status: 'pending'
            })
            router.push('/Dashboard/buyingdashboard/')
        } catch (error) {
            console.log('there is an error', error)
            alert("Something Wents to Wrong")
        }
    }


    const filterd = products.filter((CurEl) => {
        const proFilt = CurEl.category === "AlPro"

        // Replace string format to clean number
        const price = Number(String(CurEl.price).replace(/[^0-9]/g, ''));

        if (selectItem === "High")
            return price >= 50000;
        else if (selectItem === "Medium")
            return price >= 30000 && price < 50000;
        else if (selectItem === "Low")
            return price >= 1 && price < 40000;

        return proFilt;

    })

    // Apne component ke andar yeh useEffect rakh dein:
    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Jaise hi card screen par nazar aayega, yeh class lag jayegi
                    entry.target.classList.add('active-ani');
                    // Ek dafa animate hone ke baad observer hata dein taaki baar baar na ho
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Jaise hi card ka 10% hissa nazar aayega, animation chal paray gi
        });

        const cards = document.querySelectorAll('.crdanimt');
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, [filterd]);

    return (
        <div className='container relative mx-none pxde'>
            <div className='flex  justify-center items-center mt-25'>
                <div className='py-0'>
                    {products && ((
                        <div className=' w-full CardXrp'>
                            {
                                filterd.map((items, index) => (
                                    <div key={index} className='relative'>
                                        <Card style={{ transitionDelay: `${index * 150}ms` }} className='w-[200px] min-h-[320px] py-0  border white shadow-lg CardResp crdanimt' onClick={() => {
                                            setHoveredProducts(items)
                                            setClickpro(items)
                                        }}>
                                            <img
                                                src={items.image}
                                                alt=''
                                                style={{ objectFit: "fill" }}
                                                className='w-full  crdimg'
                                            />
                                            <CardHeader className='text-center langugP7 crdHd  h-[150px] '>
                                                <CardTitle className=' line-clamp-1 fontFNM'>
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
                                        {clickpro === items && (
                                            <div className='absolute top-10 left-10 z-50  overflow-y-auto upcrdhndx'>
                                                <CardsUp
                                                    ProCardzs={clickpro}
                                                    closeCard={() => setClickpro(null)}
                                                />
                                            </div>
                                        )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ))

                    }
                </div>
                {hoverProducts && (
                    <div className='absolute top-50 left-2 z-50 overflow-y-auto upcrdhnd'>
                        <CardsUp
                            ProCardzs={hoverProducts}
                            closeCard={() => setHoveredProducts(null)}
                        />
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Categorypst