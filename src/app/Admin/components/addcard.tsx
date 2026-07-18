"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import './css/admin.css'
import { useRouter } from 'next/navigation'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import '../../mainCss/mainXadmin.css'



const AddCards = () => {

    const options = ['CPU', "GPU", "Headphone", "Mouse", "keyBoard",
        "HomePro", "Storage", "LMP", "AlPro", "Slider"]
    const [isopen, setIsOpen] = useState(true)

    const chngngrout = useRouter()

    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState("")




    async function handleAdpro() {
        if (!title.trim() || !price || !desc.trim() || !image || !category) return alert('plz fill all inputs')

        setLoading(true)
        try {
            const CardAd = await addDoc(collection(db, "products"), {
                image: image,
                name: title,
                price: price,
                desc: desc,
                category: category,
                createdAt: new Date()
            })
            console.log("document with id ", CardAd)
            alert("Card Added Successfully")
            chngngrout.push("/Admin")
        } catch (error) {
            console.error("in the documnet somewhere erorr", error)
            alert("somethin Wents to Wrong")
        }
        finally {
            setLoading(false)
        }
    }


    const firstUpper = (a: string) => {
        return a.charAt(0).toUpperCase() + a.slice(2)
    }

    return (
        <div>
            <div className='container mb-40 w-full'>
                <div className='flex justify-center items-center '>
                    <div className='flex flex-col justify-center items-center rounded-md hover:shadow-lg gap-10 border p-4 w-[450px] h-[500px] hplscsdxs'>
                        <h1 className='text-center text-2xl fontB500 font2'>Add Card</h1>
                        <div>
                            <Input type='text' className='w-[380px] h-[40px] outBrder border-0 border-b hplscsde ' onChange={(e) => setImage(e.target.value)} placeholder='Image URL' />
                        </div>
                        <div>
                            <Input type='' className='w-[380px] h-[40px] outBrder border-0 border-b hplscsde ' onChange={(e) => {
                                const value = e.target.value
                                const fartmated = value.length >= 0 ? firstUpper(value) : value;
                                setTitle(fartmated)

                            }} placeholder='Title' />
                        </div>
                        <div>
                            <Input type='text' className='w-[380px] h-[40px] outBrder border-0 border-b hplscsde' onChange={(e) => setPrice(e.target.value)} placeholder='Price' />
                        </div>
                        <div>
                            <Input type='text' className='w-[380px] h-[40px] outBrder border-0 border-b hplscsde' onChange={(e) => {
                                const value = e.target.value
                                const formated = value.length > 0 ? firstUpper(value) : value;
                                setDesc(formated)
                            }} placeholder='Descripation' />
                        </div>
                        <div className='w-full h-[50px] flex justify-center items-center' >
                            <div className=' w-[150px] h-[50px] border flex justify-center items-center rounded-md ' onClick={() => setIsOpen(!isopen)}>
                                <span>{category}</span>
                                {isopen && (
                                    <div className="absolute  w-[145px] h-[50px] overflow-y-auto rounded-sm font-bold text-center">
                                        {options.map((opt, index) =>
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setCategory(opt)
                                                    setIsOpen(false)
                                                }}
                                                className="px-3 py-1.5 text-sm cursor-pointer border-b last:border-0 hover:bg-gray-100 text-black"
                                            >
                                                {opt}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button onClick={handleAdpro} disabled={loading} className='border border-red-500  ctgbtn hover:bg-red-400 bg-transition px-14 py-5 text-red hover:text-white'>{loading ? "Adding..." : "Add Now"}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCards