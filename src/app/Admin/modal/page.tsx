"use client"
import { Button } from '@/components/ui/button'
import { } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { db } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import '../../mainCss/mainXadmin.css'
import { FaCross, FaMinus } from 'react-icons/fa6'



interface products {
    image: string,
    name: string,
    price: string,
    desc: string,
    category: string
    id?: string,
}

type EditModal = {
    hoverPro: products | null
    isEdit: boolean,
    setEdit: (open: boolean) => void;
    setHover: React.Dispatch<React.SetStateAction<products[]>>
}

const EditModal = ({ hoverPro, isEdit, setEdit, setHover }: EditModal) => {

    const [image, setImage] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [title, setTitle] = useState("")

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (hoverPro) {
            setImage(hoverPro.image || "")
            setTitle(hoverPro.name || "")
            setPrice(hoverPro.price || "")
            setDesc(hoverPro.desc || "")
        }
    }, [hoverPro])


    const EditHandle = async () => {
        if (!hoverPro || hoverPro.id === undefined || hoverPro.id === "") return;
        setLoading(true)
        try {
            const ProRef = doc(db, 'products', hoverPro?.id)

            await updateDoc(ProRef, {
                image: image,
                name: title,
                price: price,
                desc: desc
            })

            setHover((prevPro) => prevPro.map((items) => items.id === hoverPro.id ? { ...items, name: title, price, desc } : items))

            setEdit(false)
        } catch (error) {
            console.error('There is an Error', error)
            alert("Something Wents To Wrong")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='container' >
            <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md '
            >
                <div className=''>
                    <div className='z-50 absolute mt-1 mx-1   '>
                        <Button onClick={() => setEdit(false)}>
                            <FaMinus />
                        </Button>
                    </div>
                    {isEdit && (
                        <div className='space-y-10 border-2 p-5 w-[400px] h-[450px] flex flex-col justify-center items-center rounded-md bg-white hplscsdxs'>
                            <div><h1 className='text-xl text-gray-800 font-bold '>Edit Products</h1></div>
                            <div>
                                <Input type='text' className='w-[380px] h-[40px] outBrder border-0 border-b hplscsde ' value={image} placeholder='Enter Image URL' onChange={(e) => setImage(e.target.value)} />
                            </div>
                            <div>
                                <Input type='text' className='w-[380px] h-[40px] outBrder border-0 border-b hplscsde   ' value={title} placeholder='Enter Product Name' onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <Input type='text' className='w-[380px] h-[40px] outBrder border-0 border-b hplscsde   ' value={price} placeholder='Enter Product Price' onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div>
                                <Input type='text' className='w-[380px] h-[40px] outBrder border-0 border-b hplscsde   ' value={desc} placeholder='Enter Descripation' onChange={(e) => setDesc(e.target.value)} />
                            </div>
                            <div>
                                <Button onClick={EditHandle} disabled={loading} className='border border-red-500 ctgbtn  mt-5 hover:bg-red-400 bg-transition px-14 py-5 text-red hover:text-white'>{loading ? "Adding..." : "Add Now"}</Button>
                            </div>
                        </div>
                    )
                    }
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default EditModal