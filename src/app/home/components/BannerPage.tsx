"use client"
import "./css/banner.css"
import '../../mainCss/main.css'


const BannerPage = () => {
  return (
    <div className='relative w-full'>
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]  h-[900px] mx-auto banerLinear banresp">
        {/* Image */}
        <video
          src={'/Baner.mp4'}
          autoPlay
          loop
          muted
          style={{ objectFit: 'fill' }}
          className="w-full h-full cover"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/5 to-transparent z-10" />

        {/* Text */}
        <div className="absolute inset-0 space-y-2 z-20 flex flex-col items-center justify-center">
          <h1 className="font-bold text-8xl text-white langugX1 wrdAnim text-center banrName">
            Build Your Owns PC
          </h1>
          <h1 className='font-bold mt-12 text-5xl text-red-500 langugX1 wrdAnimtn text-center redBanr'>
            Abouts Your Needs
          </h1>
        </div>
      </div>
      <h1 className='font-bold text-4xl text-center mt-20 fturProHN'>
        Categories
      </h1>
    </div>
  )
}

export default BannerPage
