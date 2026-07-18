'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import F1 from "public/F (1).jpeg"
import F2 from "public/F (2).jpg"
import F3 from "public/F (3).webp"
import F4 from "public/F (4).jpg"
import F5 from "public/F (5).jpg"
import F6 from "public/F (6).webp"
import "./css/products.css"

const FeaturedPage = () => {
  const images = [F1, F2, F3, F4, F5, F6]

  const content = [
    {
      title: "NZXT Kraken 360mm RGB AIO Liquid Cooler",
      desc: "Keep your rig ice-cold during overclocks or intense workloads, ensuring silent, <br /> stable domination. The hypnotic RGB effects turn your build into a glowing masterpiece <br /> visible through any windowed case. Precision engineering meets stunning visuals: efficient cooling, <br /> zero noise, endless personalization. This isn't just a cooler; it's a <br /> statement of power and beauty. Dominate thermals, illuminate your setup, and push limits without compromise. <br /> NZXT Kraken – where performance meets art"
    },
    {
      title: "Samsung SSD 980 1TB NVMe M.2",
      desc: "Experience blistering read/write speeds that slash load times, making games launch instantly <br /> and files transfer in seconds. Built with Samsung's renowned reliability,  intelligent thermal <br /> control keeps it cool under pressure. The minimalist design against a clean white backdrop <br /> emphasizes purity and speed – no heatsink needed, yet it dominates. Elevate your PC to elite <br /> levels: faster boots, smoother multitasking, and unstoppable productivity. <br /> This isn't just storage; it's a gateway to peak performance."
    },
    {
      title: "MSI GeForce RTX 5090 Gaming Trio",
      desc: "the MSI GeForce RTX 5090 Gaming Trio – the monstrous flagship GPU that redefines extremes! <br /> Triple-fan TORX design with dragon-emblazoned shrouds dominates in silver-black armor, <br /> accented by mystic RGB lighting. Massive heatsinks and bold MSI branding promise unrelenting <br /> power, while the vibrant box highlights 32GB GDDR7 Gaming Trio and cutting-edge <br /> features like DLSS 4, ray tracing, and Reflex. This beast unleashes <br /> god-like 4K/8K performance,"
    },
    {
      title: "Vibrant Smart LED TV",
      desc: "this stunning Smart LED TV – where breathtaking visuals meet sleek design! <br /> The ultra-thin bezel frames a massive screen exploding with vibrant neon waves in <br /> electric purple, cyan, and pink, creating hypnotic flowing patterns that pulse with energy. <br /> Glossy black frame and sturdy V-shaped stands provide elegant stability, <br /> blending seamlessly into any modern setup. Crystal-clear display <br /> technology delivers vivid colors,"
    },
    {
      title: "Intel Core i9 14th Gen Unlocked Processor",
      desc: "the Intel Core i9 14th Gen Unlocked Processor – the pinnacle of desktop power for enthusiasts <br /> and professionals! Encased in a stunning blue retail box with gradient hues <br /> transitioning to deep cosmic purple, it screams premium performance. The bold i9 badge and <br /> 14th Gen label gleam alongside Intel Core Unlocked and Special Edition <br /> markers, promising limitless overclocking potential. Dramatic lighting reveals a metallic heatsink <br /> glimpse inside, teasing the beast within"
    },
    {
      title: "NRESPAWN Gaming Chair Black & Red",
      desc: "Aggressive ergonomic design features premium bonded leather in deep black with fiery red accents, <br /> contoured padding, and stitched chevron patterns for race-inspired flair. <br /> Extendable footrest, adjustable lumbar pillow, and high-back headrest cradle you during <br /> marathon sessions. Bold RESPAWN branding screams pro-gamer vibes, <br /> while reclining mechanism and swivel base offer <br /> full control"
    }
  ]

  const [counter, setCounter] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setCounter(prev => (prev + 1) % images.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [paused, images.length])

  return (
    <div>
      <div className='fturproFX'>
        <div
          className="relative w-full overflow-hidden rounded-lg fturproF"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Image
            src={images[counter]}
            alt=""
            style={{ objectFit: "fill" }}
            className="w-full h-[300px] object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-6 ">
            <h1 className="text-3xl font-bold mb-10 text-center fturPro">
              {content[counter].title}
            </h1>
            <p
              className="text-2xl text-center leading-relaxed langugP4 fturProx"
              dangerouslySetInnerHTML={{ __html: content[counter].desc || "" }}
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-30">
        <h1 className="  langugP4 fturProHN">Why Choose Us</h1>
      </div>
    </div>
  )
}

export default FeaturedPage
