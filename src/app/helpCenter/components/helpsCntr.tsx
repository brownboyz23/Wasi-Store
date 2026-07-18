"use client"
import { Button } from '@/components/ui/button'
import '../css/helps.css'
import '../../mainCss/mainXhc.css'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { Input } from '@/components/ui/input'


const HelpCntr = () => {

    const [acount, setAcount] = useState(false)
    const [acc, setAcc] = useState("Account & Security")
    const [technical, setTechnical] = useState(false)
    const [techn, settechn] = useState("Technical Bugs")
    const [billing, setBilling] = useState(false)
    const [billi, setBilli] = useState("Billing & Payments")
    const [other, setOther] = useState(false)
    const [othr, setOthr] = useState("Others")
    const [feedback, setFeedback] = useState(false)
    const [feedbac, setFeedbac] = useState("Feedback & Suggestions")
    // const [users, setUsers] = useState(false)
    // const [maxatmp, setMaxAtmp] = useState(2)

    const acounts = [
        "Change Password/Email", "Login Issues", "Delete/Deactivate Account"
    ]
    const tech = [
        "Loading/Lagging", "Feature Not Working", "Visual Glitch",
    ]
    const biles = [
        "Payment Failed", "Refund Request", "Subscription Plan",
    ]
    const FeedB = [
        "New Feature Idea", "UI/UX Improvement", "General Feedback",
    ]
    const Othrs = [
        "Something Else",
    ]


    const [atempts, setAtempts] = useState({
        acount: 0, technical: 0, other: 0, billing: 0, feedback: 0,
    })


    const totalAtempts = Object.values(atempts).reduce((a, b) => a + b, 0)

    const maxAtemmpt = (Category: keyof typeof atempts) => {

        if (totalAtempts >= 2) return;

        setAtempts(prev => ({
            ...prev,
            [Category]: prev[Category] + 1
        }))
    }

    return (
        <div className='container'>
            <div className=' w-full min-h-full  z-10'>
                <div className=' flex justify-around items-center hplcf '>
                    <div className='w-[500px] h-[600px] border border-gray-300 border rounded-md p-3 hplcfS '>
                        <h1 className='text-4xl text-center mt-5 langugP8 hplscsdxsnm fturProHN'>Help Categories</h1>
                        <div className='relative flex flex-col gap-5 p-5 hplcft'>
                            <div className=''>
                                <div className='mt-8'>
                                    <Button disabled={totalAtempts >= 2} onClick={() => setAcount(!acount)} className='w-full h-[60px] hplcinpu border text-2xl  langugP6'>{acc}</Button>
                                </div>
                                {acount && (
                                    <ul className='absolute z-10 w-[449px] bg-white border border-gray-300 shadow-md hplcinpux  '>
                                        {acounts.map((items, index) => (
                                            <li key={index} onClick={() => {
                                                setAcount(false)
                                                setAcc(items)
                                                maxAtemmpt("acount")
                                            }}
                                                className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer border-b last:border-0 text-xl text-center  "
                                            >
                                                {items}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                )
                                }

                            </div>
                            <div>
                                <div className='mt-8'>
                                    <Button disabled={totalAtempts >= 2} onClick={() => setTechnical(!technical)} className='w-full h-[60px] hplcinpu border text-2xl  langugP6'> {techn} </Button>
                                </div>
                                {technical && (
                                    <ul className='absolute z-10 w-[449px] bg-white border border-gray-300 shadow-md hplcinpux' >
                                        {tech.map((items, index) => (
                                            <li key={index} onClick={() => {
                                                setTechnical(false)
                                                settechn(items)
                                                maxAtemmpt("technical")
                                            }}
                                                className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer border-b last:border-0 text-xl text-center  "
                                            >
                                                {items}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                )

                                }

                            </div>
                            <div>
                                <div className=' mt-8'>
                                    <Button disabled={totalAtempts >= 2} onClick={() => setBilling(!billing)} className='w-full h-[60px] hplcinpu border text-2xl  langugP6'> {billi} </Button>
                                </div>
                                {billing && (
                                    <ul className='absolute z-10 w-[449px] bg-white border border-gray-300 shadow-md hplcinpux' >
                                        {biles.map((items, index) => (
                                            <li key={index}
                                                onClick={() => {
                                                    setBilling(false)
                                                    setBilli(items)
                                                    maxAtemmpt("billing")
                                                }}
                                                className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer border-b last:border-0 text-xl text-center "
                                            >
                                                {items}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                )
                                }
                            </div>
                            <div>
                                <div className=' mt-8'>
                                    <Button disabled={totalAtempts >= 2} onClick={() => setFeedback(!feedback)} className='w-full h-[60px] hplcinpu border text-2xl  langugP6'> {feedbac} </Button>
                                </div>
                                {feedback && (
                                    <ul className='absolute z-10 w-[449px] bg-white border border-gray-300 shadow-md  hplcinpux '>
                                        {FeedB.map((items, index) => (
                                            <li key={index}
                                                onClick={() => {
                                                    setFeedback(false)
                                                    setFeedbac(items)
                                                    maxAtemmpt("other")
                                                }}
                                                className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer border-b last:border-0 text-xl text-center "
                                            >
                                                {items}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                )
                                }
                            </div>
                            <div>
                                <div className=' mt-8'>
                                    <Button disabled={totalAtempts >= 2} onClick={() => setOther(!other)} className='w-full h-[60px] hplcinpu border text-2xl  langugP6'> {othr} </Button>
                                </div>
                                {other && (
                                    <ul className='absolute z-10  bg-white border border-gray-300 shadow-md  w-[449px] rounded hplcinpux'>
                                        {Othrs.map((items, index) => (
                                            <li key={index}
                                                onClick={() => {
                                                    setOther(false)
                                                    setOthr(items)
                                                    maxAtemmpt("feedback")
                                                }}
                                                className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer border-b last:border-0 text-xl text-center  "
                                            >
                                                {items}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='hplcfS '>
                        <div className='w-[500px] h-[600px] border border-gray-300 rounded-md  hplscsdxs'>
                            <div className='h-[150px] flex justify-center items-center hplscsdeN'>
                                <h1 className=' bold langugP6 text-red-400 text-center  fturProHN '>Request Form</h1>
                            </div>
                            <div className='w-full h-[250px] gap-10 flex flex-col justify-center items-center p-5 hplscsdxxs'>
                                <div className='w-full p-5 mt-20 hplscsde '>
                                    <Label className='text-1xl font-bold '>Email</Label>
                                    <Input type='email' className='h-[35px]' placeholder='Enter Your Email' required />
                                </div>
                                <div className='mt-8 w-full p-5 hplscsd '>
                                    <Label className='text-1xl font-bold '>Address</Label>
                                    <textarea className=' border-1  shadow-lg p-2 rounded-2  w-full min-h-full ' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {
            } */}
        </div>
    )
}

export default HelpCntr
