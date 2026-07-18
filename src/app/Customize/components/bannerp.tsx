"use client"
import "./css/banner.css"
import '../../mainCss/manXC.css'

type componentsPropSt = {
    selectcom: components[],
}

export type components = {
    name: string,
    type: string,
    image: string,
}

const BannerProducts = ({ selectcom = [] }: componentsPropSt) => {


    const activeItem = selectcom.length > 0
        ? selectcom[selectcom.length - 1]
        : {
            name: "Build A Beast",
            image: "/Main (2).png",
            desc: `
          Massive inventory, large-scale availability,<br />
                            and unmatched premium quality PC builds—<br />
                            crafted for gamers and creators—hardware<br />
                            you won’t find elsewhere, delivering power,<br />
                            reliability, elite performance every time,<br />
                            worldwide trusted, expertly engineered.
        `
        }





    return (
        <div>
            <div className='relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#000010] mt-[1px] mb-10'>
                <div className=''>
                    <div className='w-full flex items-center justify-around  '>
                        <div className=' w-[700px] h-[530px] cstproxs py-5'>
                            <img
                                src={activeItem.image}
                                alt=""
                                className='w-[500px] h-[500px] cstorpro'
                            />
                        </div>
                        <div className=' col-sm-12 col-md-6 col-lg-1 text-center w-[600px] h-[400px] flex flex-col overflow-hidden p-5'>
                            <h1 className='text-red-700 text-6xl langugP8 mb-10 cstorproHd'> {activeItem.name}</h1>
                            <p className='text-3xl langugP8 mt-5 leading-relaxed text-center text-gray-400 cstorproDc'>
                                {activeItem.name === "Build A Beast" ? (
                                    <>
                                        Massive inventory, large-scale availability,<br />
                                        and unmatched premium quality PC builds—<br />
                                        crafted for gamers and creators—hardware<br />
                                        you won’t find elsewhere, delivering power,<br />
                                        reliability, elite performance every time,<br />
                                        worldwide trusted, expertly engineered.
                                    </>
                                ) :
                                    (
                                        ` You have ${activeItem.name}
                            This high-performance is ready to be part of your ultimate beast.
                             reliability, elite performance every time,
                            worldwide trusted, expertly engineered.
                            `
                                    )}
                            </p>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerProducts
