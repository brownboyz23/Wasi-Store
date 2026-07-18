"use client"
import React, { useEffect, useState } from 'react'
import '../css/helps.css'
import { AlertCircle } from 'lucide-react'
import '../../mainCss/mainXhc.css'

const BigDiv = () => {



    const Descrpation = [
        {
            desc: "Our platform is engineered to provide expeditious and seamless support ensuring your journey <br/> remains entirely frictionless. Should you encounter any obstacles, our vigilant support team is <br/> perpetually available  to offer comprehensive guidance. We have meticulousl structured our assistance protocols to <br/> address your concerns with utmost precision, allowing you  navigate <br/> our services with absolute confidence and ease"
        },

        {
            desc: "Protecting your digital assets and maintaining your utmost confidentiality remains our paramount <br/> objective. We have implemented state-of-the-art security architectures and impenetrable encryption standards designed  <br/> to proactively thwart anyunauthorized access. By conducting continuous rigorous audits  <br/> of our defense systems we ensure your personal data remains fortified and secure <br/> granting you complete  peace of mind while engaging with our website."
        },
        {
            desc: " We deeply value your candid insights and recognize that your feedback is a pivotal catalyst <br/> for our continuous improvement.  if you identify any discrepancies or shortcomings in our service, we encourage you to voice  <br/> your concerns through our transparent grievance process.We treat  every complaint <br/> as an opportunity for remediation, striving to   resolve issues  with unwavering <br/> commitment to excellence  and to restore your trust in our brand."
        }
    ]

    const [count, setCount] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused) return
        const interval = setInterval(() => {
            setCount(prev => (prev + 1) % Descrpation.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [paused])

    return (
        <div>
            <div className='container'>
                <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className='w-full h-[350px] border col-lg-2 col-md-6 col-md-12 hover:shadow-xl rounded mb-50 p-4 '>
                    <div className='w-full  flex items-center justify-center'>
                        <AlertCircle className='w-[50px] h-[50px] text-red-600 rounded-full ' />
                    </div>
                    <p className=' langugP6 h-[350px]  text-bold text-4xl leading-relaxed text-center custodevHd'
                        dangerouslySetInnerHTML={{ __html: Descrpation[count].desc }}
                    />
                </div>
            </div>
        </div>
    )
}

export default BigDiv