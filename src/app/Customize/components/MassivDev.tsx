import React from 'react'
import '../../mainCss/manXC.css'

const MassivDev = () => {
  return (
    <div className=''>
      <div className='row mt-40 mb-40 fturproF'>
        <div className='  fturproFX   rounded border border-2 '>
          <video src={"/INtro/Intro.mp4"} className='w-full h-full  object-fill rounded '
            autoPlay
            loop
            playsInline
            muted
          />
        </div>
      </div>
    </div>
  )
}

export default MassivDev