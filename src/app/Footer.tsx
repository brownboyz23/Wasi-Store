import Link from 'next/link'
import React from 'react'
import './mainCss/main.css'

const FooterPage = () => {
    return (
        <div>
            <div className=' mt-20 '>
                <div className=' w-full min-h-[250px]  py-10 flex justify-around items-center text-center  bg-black text-white '>
                    <div className='flex flex-col leading-relaxed gap-9 ftrH'>
                        <div>
                            <Link href={"/"} className=' langugP5 '>
                                <h1>Wasi-Store</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className=' langugP5 '>
                                <h1>CASE</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/products/cpu/"} className=' langugP5 '>
                                <h1>CPU</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={""} className=' langugP5 '>
                                <h1>GPU</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center leading-relaxed gap-9 ftrH'>
                        <div>
                            <Link href={"/products/gpu/"} className='font-bold langugP5 '>
                                <h1>GPU-z</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>KEYBOARD</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>LCD-S</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>GPUz</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center leading-relaxed gap-9 ftrH'>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>N-FANS</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/products/storage/"} className='font-bold langugP5 '>
                                <h1>Storage</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>C-FANS</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>THERMAL</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center leading-relaxed gap-9 ftrH'>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>W-Store</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>SUPPLY-S</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>HARD-HDD</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>NVME-S</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center leading-relaxed gap-9 ftrH'>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>W-Store</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>ALFA-S</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>WIFI-CARD</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>S-Card</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center leading-relaxed gap-9 ftrH'>
                        <div>
                            <Link href={"/Dashboard/"} className='font-bold langugP5 '>
                                <h1>DashBoard</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/helpCenter/"} className='font-bold langugP5 '>
                                <h1 className='font-bold'>SUPPORT</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>TERMS-CON</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1>F-FAQS</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center leading-relaxed gap-9 ftrH'>
                        <div>
                            <Link href={"/helpCenter/"} className='font-bold langugP5 '>
                                <h1>FOR HELP</h1>
                            </Link>
                        </div>
                        <div>
                            <Link href={"/"} className='font-bold langugP5 '>
                                <h1 className='font-bold'>PRICVY-POLICY</h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterPage