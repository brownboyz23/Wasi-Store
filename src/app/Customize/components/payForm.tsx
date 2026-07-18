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
                <form onSubmit={handlepayment} className='w-[350px] h-[430px] p-5 cspymnxs rounded-lg  bg-white text-black hover:bg-[#0B0F19] hover:text-white border border-gray'>
                    <div className='text-center spc'>
                        <h1 className='text-4xl hover:text-white'>Payment Form</h1>
                    </div>
                    <div className='my-10'>
                        <div className='flex spcxsN'>
                            <Label className='ms-5 pynam '>Name</Label>
                            <Label className='ms-40 pynam '>Bank Card No</Label>
                        </div>
                        <div className='flex items-center  justify-between w-[315px]  p-3 -mt-1 spcxsm'>
                            <Input className=' hover:bg-white w-[100px] h-[35px] hover:text-black focus-visible:ring-0 spcxs' required name='Name' type='"' placeholder='Enter Name' />
                            {myhide === "hiddns" && (
                                <span className='text-bold  text-red-600 border border-outline-gray-500 p-1 rounded bg-black hover:bg-white'>
                                    {cardtype}
                                </span>
                            )
                            }
                            <Input value={valueg} max={19} onClick={() => setMyhide("hiddns")} className=' hover:bg-white w-[150px] h-[35px] spcxsx hover:text-black  focus-visible:ring-0' name='fourth' required type='tel' placeholder='Enter Bank Card No' onChange={(e) => {
                                handlePaymneType(e)
                                maxDigits(e)
                            }} />
                        </div>
                        <div className='flex items-center  justify-between mt-5 mb-10 w-[320px] p-4 spcxsm'>
                            <div className=''>
                                <Label className='mb-1'>/CC</Label>
                                <Input value={valueF} max={3} maxLength={4} onChange={maxDigits} className='hover:bg-white  spcxe hover:text-black w-[90px] h-[35px] focus-visible:ring-0' name='first' type='tel' required placeholder='Issue/Date ' />
                            </div>
                            <div>
                                <Label className='mb-1'>/Ex</Label>
                                <Input value={valueS} max={3} maxLength={4} onChange={maxDigits} className='hover:bg-white spcxe hover:text-black w-[90px] h-[35px] focus-visible:ring-0' name='Second' type='tel' required placeholder='Exp/Date ' />
                            </div>
                        </div>
                        <Label className='ms-4'>M-Pin</Label>
                        <div className='flex items-center  justify-around mt-1'>
                            <Input value={valueT} max={3} maxLength={3} onChange={maxDigits} className='hover:bg-white   spcxeBi hover:text-black w-[300px] h-[35px] focus-visible:ring-0' name='third' type='tel' required placeholder='Card Pin'
                            />
                        </div>
                        <div className='text-center mt-20'>
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