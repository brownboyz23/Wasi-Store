"use client"
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPuzzlePiece, faShield, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import "./css/products.css"
import '../../mainCss/main.css'

const ChoosePage = () => {
    const cards = [
        { icon: faCircleCheck, title: "Best Price" },
        { icon: faPuzzlePiece, title: "Genuine Parts" },
        { icon: faShield, title: "Official Warranty" },
        { icon: faScrewdriverWrench, title: "Expert Support" },
    ]

    return (
        <div>
            <div className='flex flex-col justify-center items-center '>
                <div className='container  w-full flex items-center justify-around  chosProx'>
                    {cards.map((card, idx) => (
                        <Card key={idx} className='p-4 bg-white w-[12rem] h-[8rem] chosepros'>
                            <CardHeader className='flex flex-col justify-center items-center'>
                                <FontAwesomeIcon icon={card.icon} className='text-blue-500 w-27 h-12 choseproxs' />
                                <CardTitle className='text-center mt-4 langugP4 '>
                                    {card.title}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <div className='text-center mb-10'>
                </div>
                <h1 className='font-bold text-3xl langugP4 fturProHN'>More Products</h1>
            </div>
        </div>
    )
}

export default ChoosePage
