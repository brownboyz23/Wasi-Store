import React from 'react'
import './css/banner.css'
import '../../mainCss/mainX.css'
const BannerPage = () => {
  return (
    <div>
      <div className='relative w-screen left-1/2 right-auto -ml-[50vw]  '>
        <video src="/PPV1.mp4"
          autoPlay
          loop
          playsInline
          muted
          className='w-[100%]'
        >
        </video>
      </div>
      <div className='text-center'>
        <h1 className='text-5xl langugP6 mt-20 leading-relaxed proheading'>Products</h1>
        <h1 className='mt-5 langugP5  proTitle'>Explore Our Best Quality & Latest Products</h1>
      </div>
    </div>
  )
}

export default BannerPage