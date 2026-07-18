"use client"
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { LogMenu } from './loginpages/menu/Logmenu'
import "../app/header.css"
import './mainCss/main.css'
// import { useState } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { FaBars } from 'react-icons/fa6'


const HeaderPAge = () => {

    // const [isopen, setIsOpen] = useState(false)
    // const [user, setUser] = useState('')

    const [searchitem, SetSearchItem] = useState<string>("")

    const router = useRouter()

    return (
        <div className='fixed w-full  top-0 left-0 z-[999]'>
            <div className=' sticky  backdrop-blur'>
                <div className='bg-black flex items-center justify-center p-5 h-20 text-white respono '>
                    <h1 className='fontB600 flex MAinNam font5 pl-2 moSizName'>WASI-<span className='clrbtn'>STORE</span></h1>

                    {<DropdownMenu>
                        <DropdownMenuTrigger asChild className='mosizDro'>
                            <Button className='border-1'>
                                <FaBars />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <nav className='mosizDrown'>
                                <DropdownMenuItem asChild>
                                    <Link href={'/'} className=' Dropname font2'>Home</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={'/products'} className=' Dropname fontB400 font2 '>Products</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={'/Customize'} className=' Dropname fontB400 font2 '>Customize</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={'/Dashboard'} className=' Dropname fontB400 font2 '>Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={'/helpCenter'} className=' Dropname fontB400 font2 '>Help-Center</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={'/Admin'} className=' Dropname fontB400 font2 ' hidden>AdminPage</Link>
                                </DropdownMenuItem>
                            </nav>
                        </DropdownMenuContent>
                    </DropdownMenu>}
                    <div className='respnv'>
                        <nav className='respnvX'>
                            <Link href={'/'} className=' fontsIz font2'>Home</Link>
                            <Link href={'/products'} className=' fontsIz fontB400 font2 '>Products</Link>
                            <Link href={'/Customize'} className=' fontsIz fontB400 font2 '>Customize</Link>
                            <Link href={'/Dashboard'} className=' fontsIz fontB400 font2 '>Dashboard</Link>
                            <Link href={'/helpCenter'} className=' fontsIz fontB400 font2 '>Help-Center</Link>
                            <Link href={'/Admin'} className=' fontsIz fontB400 font2 ' hidden>AdminPage</Link>
                        </nav>

                    </div>
                    <div className='flex items-center  justify-center p-2 pt-1 gap-3 respnv4 '>
                        <Input value={searchitem} className='respnv4 h-11 brdrmove' onChange={(e) => SetSearchItem(e.target.value)} type='text' placeholder='Search Products'
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const query = searchitem
                                    if (query) {
                                        e.preventDefault()
                                        router.push(`/SearchBar?query=${encodeURIComponent(query)}`)
                                    }
                                }
                            }}
                        />
                        <span className='text-center p-2  border rounded-md w-11 h-11 respovXC '>
                            {/* <Button className='bg-transparent w-[40px] h-[40px]'> */}
                            <Link href={searchitem.trim() ? `/SearchBar?query=${encodeURIComponent(searchitem)}` : "#"}
                                onClick={(e) => { if (!searchitem.trim()) e.preventDefault(); }}
                            >
                                <Search id='srct'
                                    className="w-6 h-6   text-gray-500 mr-1 btn btn-outline cursor-pointer "
                                />
                            </Link>
                            {/* </Button> */}
                        </span>
                    </div>
                    <div className='rpzp flex justify-center   white items-center'>
                        {
                            <LogMenu />
                        }
                    </div>
                </div>
            </div >
        </div >
    )
}

export default HeaderPAge