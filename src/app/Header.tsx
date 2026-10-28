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
    const [closdropDown, setclosDropDown] = useState(true)

    const closUpDrop = () => {
        setclosDropDown(false)
    }

    const openDropDown = () => {
        setclosDropDown((prev) => !prev)
    }

    const router = useRouter()

    return (
        <div className=''>
            <div className='w-full fixed top-0 left-0 z-[60]  sticky '>
                <div className='bg-black backdrop-blur  shadow-lg border-white/10 flex items-center justify-center p-5 h-20 text-white respono '>
                    <div className='clrmov  q w-[180px] h-auto border-2 rounded-full'>
                        <h1 className='fontB600  flex MAinNam font5 pl-2 moSizName'>WASI-<span className='clrbtn'>STORE</span></h1>
                    </div>
                    {<DropdownMenu >
                        <DropdownMenuTrigger asChild className='mosizDro'>
                            <Button className='border-1' onClick={openDropDown}>
                                <FaBars />
                            </Button>
                        </DropdownMenuTrigger>
                        {closdropDown && (
                            <DropdownMenuContent
                                align="center"
                                sideOffset={0}
                                className="w-[100vw] max-w-[479px] p-0 border-none bg-transparent shadow-none"
                            >
                                <div className='mosizDrownUp w-full max-w-[479px] mx-auto border-2 rspnfrdrop'>
                                    <div className='flex items-center  justify-center p-2 pt-1 gap-3 rspnsrch'>
                                        <Input value={searchitem} className='inptRsp h-11 brdrmove  ' onChange={(e) => SetSearchItem(e.target.value)} type='text' placeholder='Search Products'
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
                                        <span onClick={closUpDrop} className='text-center p-2  inptRspbtn border rounded-md w-11 h-11 respovXC '>
                                            {/* <Button className='bg-transparent w-[40px] h-[40px]'> */}
                                            <Link href={searchitem.trim() ? `/SearchBar?query=${encodeURIComponent(searchitem)}` : "#"}
                                                onClick={(e) => { if (!searchitem.trim()) e.preventDefault(); }}
                                            >
                                                <Search id='srct'
                                                    className="w-6 h-6 text-gray-500 mr-1 btn btn-outline cursor-pointer "
                                                />

                                            </Link>
                                            {/* </Button> */}
                                        </span>
                                    </div>
                                    <nav className='mosizDrown'>
                                        <DropdownMenuItem asChild>
                                            <Link href={'/'} className='Dropname font2'>Home</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={'/products'} className='Dropname fontB400  font2'>Products</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={'/Customize'} className='Dropname fontB400 font2'>Customize</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={'/Dashboard'} className='Dropname fontB400 font2'>Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={'/helpCenter'} className='Dropname fontB400 font2'>Help-Center</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={'/Admin'} className='Dropname fontB400 font2' hidden>AdminPage</Link>
                                        </DropdownMenuItem>
                                    </nav>
                                </div>

                            </DropdownMenuContent>
                        )

                        }
                    </DropdownMenu>}
                    <div className='respnv'>
                        <nav className='respnvX'>
                            <Link href={'/'} className=' fontsIz fontg hover:border-b-2 hover:border-red-500 font2 hover:border-b-2 hover:border-red-500'>Home</Link>
                            <Link href={'/products'} className=' fontsIz fontg hover:border-b-2 hover:border-red-500 fontB400 font2 '>Products</Link>
                            <Link href={'/Customize'} className=' fontsIz fontg hover:border-b-2 hover:border-red-500 fontB400 font2 '>Customize</Link>
                            <Link href={'/Dashboard'} className=' fontsIz fontg hover:border-b-2 hover:border-red-500 fontB400 font2 '>Dashboard</Link>
                            <Link href={'/helpCenter'} className=' fontsIz fontg hover:border-b-2 hover:border-red-500 fontB400 font2 '>Help-Center</Link>
                            <Link href={'/Admin'} className=' fontsIz fontg hover:border-b-2 hover:border-red-500 fontB400 font2 ' hidden>AdminPage</Link>
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
                                    className="w-6 h-6 text-gray-500 mr-1 btn btn-outline cursor-pointer "
                                />
                            </Link>
                            {/* </Button> */}
                        </span>
                    </div>
                    <div className=' rpzp flex justify-center white items-center'>
                        <LogMenu />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default HeaderPAge