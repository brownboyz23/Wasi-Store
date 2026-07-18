"use client"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase";
import '../css/logMenu.css'
import '../../mainCss/main.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; // Aapki firebase config file

import { FaRegCircleUser } from "react-icons/fa6"
// import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useContext, useState } from "react"
import { BuilderContext, BuilderContextType } from "@/app/Dashboard/components/buildcontext"
import { FirebaseError } from "firebase/app";



export function LogMenu() {

  const { user, setUser, isopen, setIsOpen, activeform, loggedin, setActiveform, setLoggedin } = useContext(BuilderContext) as BuilderContextType

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [name, setName] = useState("")
  const [username, setUserName] = useState("")

  const realHandleLogin = async () => {

    if (!email || !password) {
      alert("Email & Passowrd Fill karna zarori ha ")
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user)
      setLoggedin(true)
      setIsOpen(false)
      alert("Login Successful")
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.message)
      }
    }

  }

  const realHandleSignup = async () => {
    if (!email || !password || !name) {
      alert("Email Password and name requered ")
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoggedin(true)
      setIsOpen(false)
      alert("account Successfully Created")
    }
    catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.message)
      }
    }
  }


  const LoginToOut = async () => {
    if (email || password || name) {
      console.log("user LogedOut")
    }
    try {
      await signOut(auth)
      setUser(null)
      setLoggedin(false)
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.message)
      }
    }
  }

  const changingcolors = (str: string) => {

    let z = 0;

    for (let i = 0; i < str.length; i++) {
      z = str.charCodeAt(i) + ((z << 5) - z)

      const colors = [
        "bg-red-600", "bg-orange-600", "bg-amber-600", "bg-yellow-600",
        "bg-lime-600", "bg-green-600", "bg-emerald-600", "bg-teal-600",
        "bg-cyan-600", "bg-sky-600", "bg-blue-600", "bg-indigo-600",
        "bg-violet-600", "bg-purple-600", "bg-fuchsia-600", "bg-pink-600",
        "bg-rose-600", "bg-slate-700", "bg-gray-700", "bg-zinc-700",
        "bg-neutral-700", "bg-stone-700"
      ]

      const index = Math.abs(z) % colors.length;
      return colors[index]
    }

  }


  return (
    <div className="container moSizLog">
      <DropdownMenu open={isopen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          {
            <button suppressHydrationWarning className="focus:outline-none me-5 mb-3 responXX ">
              {user ? (
                <div className={`w-11 h-11 flex justify-center items-center bg-blue-500 rounded-full text-2xl font-bold langugP8 ${changingcolors(user.email || "default")} `} >

                  {user.email?.charAt(0).toUpperCase()}
                </div>
              ) : (
                <FaRegCircleUser className="text-4xl flex items-center justify-center ms-1 mx-auto mt-2  " />
              )
              }
            </button>
          }

        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96" align="end">
          {loggedin ? (
            <>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={LoginToOut} >
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <div className="flex mb-4 border-b p-2 border-gray-200  gap-2 ">
                <Button onClick={() => {
                  setActiveform('login')
                }} className={`flex-1 py-2 ${activeform === "login" ? "border-b-2 border-blue-500" : ""}`}>Log In</Button>
                <Button onClick={() => setActiveform("signup")} className={`flex-1 py-2 ${activeform === "signup" ? "border-b-2 border-blue-500" : ""}`}>Sgin up</Button>
              </div>



              {activeform === "login" && (
                <div className='mx-auto '>
                  <Card className='p-8 w-full max-w-sm border-0  '>
                    <h1 className='text-xl font-bold text-center langugP2'>Log In</h1>
                    <div className='space-y-2'>
                      <Label className="mb-2  langugP8 fontSizei">Email</Label>
                      <Input value={email} className=' border-gray-500 py-5' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                    </div>
                    <div className='space-y-2'>
                      <Label className="mb-2 fontSizei">Password</Label>
                      <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className=' border-gray-500 py-5' placeholder='Enter your password' />
                    </div>
                    <Button className='bg-blue-600 hover:bg-blue-700 w-full mt-6' onClick={() =>
                      realHandleLogin()
                    }>Log In</Button>
                  </Card>
                </div>
              )}

              {activeform === "signup" && (
                <div className=' flex justify-center items-center  '>
                  <Card className='p-5 w-full border-0 '>
                    <h1 className='text-xl font-bold text-center langugP8'>Sgin Up</h1>
                    <div className='flex justify-around items-center'>
                      <div className=' flex flex-col gap-1 leading-relaxed'>
                        <Label className=" langugP2">Name</Label>
                        <Input value={name} className=' border-gray-500 w-33' onChange={(e) => setName(e.target.value)} placeholder='Your Name' />
                      </div>
                      <div className='leading-relaxed flex flex-col gap-1'>
                        <Label className="langugP2 w-35">UserName</Label>
                        <Input value={username} className=' border-gray-500' onChange={(e) => setUserName(e.target.value)} placeholder='Your UserName' />
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Label className="langugP2">Email</Label>
                      <Input value={email} className=' border-gray-500' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Label className="langugP2">Password</Label>
                      <Input value={password} className=' border-gray-500' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password' />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Label className="langugP2"> Re-Enter Password</Label>
                      <Input value={password} className=' border-gray-500' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Re-Enter password' />
                    </div>
                    <Button className='bg-blue-700' onClick={() => {
                      realHandleSignup()
                    }
                    } >Sgin Up</Button>
                  </Card>
                </div>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
