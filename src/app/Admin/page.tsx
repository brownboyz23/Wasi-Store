"use client"

import React, { useState } from 'react'
import ThreeMainsDiv from './components/uperdiv'
import AddCards from './components/addcard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from 'recharts'


const AdminPage = () => {

    const [athentic, setAuthentic] = useState(false)


    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const checkLog = () => {
        if (email === 'wasiialiali@outlook.com' && password === '12345') {
            setAuthentic(true)
        } else {
            alert('Wrong Email Or Password')
        }
    }


    if (!athentic) {
        return (
            <div>
                <div className='conatiner'>
                    <div className='w-full min-h-screen flex justify-center items-center'>
                        <div className='w-[500px] h-[500px]'>
                            <div className='mx-auto'>
                                <Card className='p-8 max-w-sm border-0 white shadow-lg border-2'>
                                    <h1 className='text-xl font-bold text-center langugP2'>Log In</h1>
                                    <div className='space-y-2'>
                                        <Label className="mb-2  langugP8 fontSizei">Email</Label>
                                        <Input value={email} className=' border-gray-500 py-5' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label className="mb-2 fontSizei">Password</Label>
                                        <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className=' border-gray-500 py-5' placeholder='Enter your password' />
                                    </div>
                                    <Button className='bg-blue-600 hover:bg-blue-700 w-full mt-6' onClick={() => checkLog()}>Log In</Button>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (

        <div>
            <ThreeMainsDiv />
            <AddCards />
        </div>
    )
}
export default AdminPage