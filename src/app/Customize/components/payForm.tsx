"use client"
import { BuilderContext, } from '@/app/Dashboard/components/buildcontext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import '../../mainCss/manXC.css'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from 'react'


interface ChildProps {
    onSuccess: () => void,
    setShowpay: Dispatch<SetStateAction<boolean>>
}

const PayForm = ({ onSuccess, }: ChildProps) => {

    const [cardtype, setCardtype] = useState('')

    const [myhide, setMyhide] = useState("hiddens")

    const [valueF, setValueF] = useState("");
    const [valueS, setValueS] = useState("");
    const [valueT, setValueT] = useState("");
    const [valueg, setValueG] = useState("");


    const router = useRouter();
    const context = useContext(BuilderContext);


    const handlepayment = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data = localStorage.getItem("PendingOrders");
            if (data) {
                // const data = localStorage.getItem("Pending Orders");
                localStorage.setItem("finalOrder", data)
                localStorage.removeItem("PendingOrders")

                // window.location.href = "/Dashboard"
                if (context) {
                    context.paymentSucess()
                    context.setSelectP([])
                }

                onSuccess()
                router.push("/Dashboard");
            }
            else {
                alert("No Pending Order Found")
            }

        } catch (error) {
            console.error("Payment Failed , Try Again", error)
        }
    }

    const PaymentType = (cardNumber: string): string => {

        if (!cardNumber) return "";

        if (cardNumber.startsWith("62") && cardNumber.length > 3) {
            return "Union";
        }
        else if (cardNumber.startsWith("4") && cardNumber.length > 3) {
            return "Visa"
        }
        else if (cardNumber.startsWith("5") && cardNumber.length > 3) {
            return "Master"
        }
        else {
            return "Invlid"
        }
    }


    const handlePaymneType = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCardtype(PaymentType(value));
    }

    const maxDigits = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "fourth" || name === 'third') {
            const cleanNum = value.replace(/\D/g, "")
            const limit = name === "fourth" ? 19 : 4;

            if (cleanNum.length > limit) return;

            if (name === "fourth") setValueG(cleanNum)
            if (name === "third") setValueT(cleanNum)
        }

        if (name === "first" || name === "Second") {
            const cleanvalue = value.replace(/[^0-9/]/g, "")
            if (cleanvalue.length > 4) return;
            if (name === "first") setValueF(cleanvalue)
            if (name === "Second") setValueS(cleanvalue)
        }
    }

    // const handlePaymnetSucess = () => {
    //     localStorage.removeItem("PendingOrders")
    //       setShowpay(false)
    //     window.location.href = "/dashboard"
    // }


    return (
        <div>
            <div className='w-full h-[500px] flex  justify-center items-center cspymn'>
                <form onSubmit={handlepayment} className='w-[350px] h-[430px] p-5 cspymnxs rounded-sm  bg-white text-black hover:bg-[#0B0F19] hover:text-white border border-gray'>
                    <div className='text-center spc'>
                        <h1 className='text-4xl hover:text-white  pynmx'>Payment Form</h1>
                    </div>
                    <div className='my-10'>
                        <div className='flex justify-around items-center'>
                            <div className='flex flex-col justify-center items-center'>
                                <Label className=' pynam mb-1'>Name</Label>
                                <Input className=' hover:bg-white w-[90px] h-[35px] hover:text-black focus-visible:ring-0 spcxs' required name='Name' type='String' placeholder='Enter Name' />
                            </div>
                            <div className='mt-5   '>
                                {myhide === "hiddns" && (
                                    <div className='text-bold  rounded-sm mb-1 text-red-600 border border-outline-gray-500 p-1 rounded bg-black hover:bg-white'>
                                        {cardtype}
                                    </div>
                                )
                                }
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <Label className='pynam mb-1'>Bank Card No</Label>
                                <Input value={valueg} max={19} onClick={() => setMyhide("hiddns")} className=' hover:bg-white w-[150px] h-[35px] spcxsx hover:text-black  focus-visible:ring-0' name='fourth' required type='tel' placeholder='Enter Bank Card No' onChange={(e) => {
                                    handlePaymneType(e)
                                    maxDigits(e)
                                }} />
                            </div>
                        </div>
                        <div className='flex justify-between items-center  mt-7 mb-5 w-[320px] px-2 spcxsm'>
                            <div className='flex flex-col'>
                                <Label className='mb-1'>/CC</Label>
                                <Input value={valueF} max={3} maxLength={4} onChange={maxDigits} className='hover:bg-white  spcxe hover:text-black w-[85px] h-[35px] me-auto focus-visible:ring-0' name='first' type='tel' required placeholder='Issue/Date ' />
                            </div>
                            <div className='flex flex-col'>
                                <Label className='mb-1'>/Ex</Label>
                                <Input value={valueS} max={3} maxLength={4} onChange={maxDigits} className='hover:bg-white spcxe  spcxessx hover:text-black w-[120px] h-[35px] focus-visible:ring-0 me-2' name='Second' type='tel' required placeholder='Exp/Date ' />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center  justify-around mt-10'>
                            <Label className='mb-2'>M-Pin</Label>
                            <Input value={valueT} max={3} maxLength={3} onChange={maxDigits} className='hover:bg-white   spcxeBi hover:text-black w-[300px] h-[35px] focus-visible:ring-0' name='third' type='tel' required placeholder='Card Pin'
                            />
                        </div>
                        <div className='text-center mt-12'>
                            <Button type='submit' className='w-[200px] h-[30px] hover:bg-red-700 spcxsb'>
                                PAy NOw
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PayForm