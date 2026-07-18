"use client"
import { useContext, useId, useState } from 'react'
import "./css/banner.css"
import { motion } from 'framer-motion'
import Selectionmin from './selectionmin'
import BannerProducts from './bannerp'
import { BuilderContext, BuilderContextType } from '@/app/Dashboard/components/buildcontext'
import { product } from '@/types'



interface MusProducts {
    name: string,
    image: string,
    category: string,
    id: string | number,
    type: string
    items: string[];
}

const categoryPrice: Record<string, number> = {
    CPU: 100000, GPUs: 120000, KeyBoards: 5000,
    Storage: 9000, Case: 5000,
    Mouse: 2000, MotherBoard: 20000, PSupply: 8000, Fans: 5000,
    WIFI: 3000, Ram: 9000,
    UPS: 18000, MONITORS: 19000, AIRBUDs: 11000, Exrnalpris: 2000,
}


const getPrices = (category: string) => {
    const base = categoryPrice[category] || 1000;
    const factor = Math.random() * 0.5 + 0.60;
    return Math.round(base * factor)
}


const dropdownConfigs = [
    {
        rowVariants: { hidden: { opacity: 0.4, x: -400 }, show: { opacity: 1, x: 0, transition: { duration: 2.2 } } },
        categories: [
            { id: "cpu", name: "CPU", category: "CPU", image: "CPUz", type: "CPU", items: ["i7-th Bloomfield", "i5-12th Haswell-E", "i3-10th Sandy Bridge-E", "i9-14th Westmere-EX", "i7-13th Nehalem", "i5-10 Broadwell", "i7-4th Haswell", "i3-7th Ivy Bridge", "i5-9th Sandy Bridge", "i5-6th Clarkdale", "i5-8th Comet Lake", "i9-9th Rocket Lake", "i7-7th Alder Lake", "i5-5th Raptor Lake", "i9-3rd Skylake"] },
            { id: "gpu", name: "GPU", category: "GPUs", image: "GPUs", type: "GPUs", items: ["RTX 5090", "GTX 1060", "GTX 1080 Ti", "RTX 2080 Ti", "RTX 3080Ti", "RTX 3060 Ti", "RTX 2060"] },
            { id: "keyboard", name: "Keyboard", category: "KeyBoards", image: "KeyBoards", type: "Keyboards", items: ["Redragon K617", "Logitech G213", "MSI Vigor GK30", "Cooler Master CK530"] },
            { id: "storage", name: "Storage", category: "Storage", image: "Storage", type: "Storage", items: ["HDD 500GB", "SeaGate 1Tb", "Samsung-980", "ADATA-480GB"] },
            { id: "case", name: "Case", category: "Case", image: "Case", type: "Case", items: ["NZXT H510", "Cougar-MX330", "Antec-NX410", "Nzxt_h510_Elite"] },
        ]
    },
    {
        rowVariants: { hidden: { opacity: 0, x: 100 }, show: { opacity: 4, x: 0, transition: { duration: 2 } } },
        categories: [
            { id: "mouse", name: "Mouse", category: "Mouse", image: "Mouse", type: "Mouse", items: ["Logitech G102", "Tuf Gaming M3", "MSI CLUTCH GM03", "Corsair Harpoon"] },
            { id: "motherboard", name: "Motherboard", category: "MotherBoard", image: "MotherBoard", type: "MotherBoard", items: ["Aorus B550", "ASUS B590", "B450M Gaming", "B490M Aorus", "B550 Gaming", "Gaming Max", "MPG Z490", "Z590 Extreme Wifi"] },
            { id: "supply", name: "Supply", category: "PSupply", image: "PSupply", type: "PSupply", items: ["Deep DA600", "P850GM", "Evga 700Ge", "HELIOS MI-550B", "A750GL", "P650G"] },
            { id: "fans", name: "Fans", category: "Fans", image: "Fans", type: "Fans", items: ["MSI-Torx", "DarkFlash", "LIQUID ML240L RGB", "Tecware"] },
            { id: "wificard", name: "WiFi Card", category: "WIFI", image: "WIFI", type: "WIFI", items: ["AC600", "Ubit AX200", "TP-LInk AX3000"] },
        ]
    },
    {
        rowVariants: { hidden: { opacity: -0, y: 100 }, show: { opacity: 2, y: 0, transition: { duration: 3 } } },
        categories: [
            { id: "ups", name: "UPS", category: "UPS", image: "UPS", type: "UPS", items: ["APC 600VA", "APC 1500VA", "EPC 1200VA", "Mercury 650VA", "Mercury 1000VA"] },
            { id: "ram", name: "Ram", category: "Ram", image: "Ram", type: "Ram", items: ["Corsair 16GB 3600", "GSkill 16GB 5600", "XPG 8GB 3200", "Crucial 8GB 2666"] },
            { id: "monitor", name: "Monitor", category: "MONITORS", image: "MONITORS", type: "MONITORS", items: ["Samsung 27 Inch Curv", "ASUS 27 Inch 165Hz", "MSI 27 Inch Curv", "AOC 24 Inch 144Hz", "BenQ 24 Inch"] },
            { id: "audio", name: "HeadStudio", category: "AIRBUDs", image: "AIRBUDs", type: "AIRBUDs", items: ["Airpods Pro", "AK-Sound", "JBL-Tune230N", "Onikuma-K19", "Audionic 425"] },
            { id: "external", name: "ExternalPeri", category: "Exrnalpris", image: "Exrnalpris", type: "Exrnalpris", items: ["6 To 8 Pins", "BlueTooth V.5", "Black-DVI", "HDMI", "Speaker_FiberWood"] },
        ]
    }
];


const SelectionCard = () => {

    const [selectcategories, setSelectcategories] = useState<{ name: string, price: number }[]>([])


    const [opendropdown, setOpenDropDown] = useState<string | null>(null)
    const [selectlabel, setSelectLabel] = useState<Record<string, string>>({})


    const handlePrice = (categoryName: string) => {
        const alreadySelect = selectcategories.find(item => item.name === categoryName)

        if (!alreadySelect) {
            const generatePrice = getPrices(categoryName)

            setSelectcategories(prev => [
                ...prev,
                { name: categoryName, price: generatePrice }
            ])
        }
    }

    function removeCard(typeifover: string) {
        setSelectP((prev) => prev.filter((item) => item.type !== typeifover))
    }

    const context = useContext(BuilderContext)


    const { selectp, setSelectP } = context as BuilderContextType;


    const handleSelect = (item: product) => {
        setSelectP((prev) => {
            const filtered = prev.filter((p) => p.desc !== item.desc)

            return [...filtered, item]
        })
    }

    const id = useId()


    const handleitemClick = (categoryconfig: MusProducts, itemName: string) => {
        if (!categoryconfig || !categoryconfig.id) {
            console.error('something wents to wrongs')
            return;
        }
        setSelectLabel(prev => ({ ...prev, [categoryconfig.id]: itemName }))
        setOpenDropDown(null)
        handlePrice(categoryconfig.category)
        const image = `/${categoryconfig.image}/${encodeURIComponent(itemName)}.png`

        handleSelect({
            name: itemName,
            desc: categoryconfig.category,
            image: image,
            id: `${id}-${itemName}`,
            price: getPrices(categoryconfig.category),
            category: categoryconfig.category === "GPUs" ? "GraphicCard" : (categoryconfig.category === "CPU" ? "Proccessor" : categoryconfig.category),
            type: categoryconfig.type
        })
    }

    return (
        <div>
            <BannerProducts selectcom={selectp} />
            <div className='flex justify-around items-center mt-20 cstmiSlxc'>
                <div className='grid grid-cols-3 gap-20 cstprocx customiSelxc'>
                    {dropdownConfigs.map((row, rowIndex) => (
                        <motion.div
                            key={rowIndex}
                            // variants={ }
                            initial="hidden"
                            animate="show"
                            className='w-full'
                        >
                            <div className='w-full min-h-full flex flex-col justify-between items-center customiSel  mt-6'>
                                {row.categories.map((cat) => (
                                    <div key={cat.id} className='relative w-[180px] cstmiSlxe '>
                                        <button onClick={() => setOpenDropDown(opendropdown === cat.id ? null : cat.id)}
                                            className='w-[140px] cursor-pointer h-[40px] bg-black text-white border-2 border-gray-300 langugP7 ctgbtn fontSizei hover:text-white box-border'
                                        >
                                            {selectlabel[cat.id] || cat.name}
                                        </button>
                                        {opendropdown === cat.id && (
                                            <ul className='absolute top-full mt-1 overflow-y-auto max-h-19 bg-white z-50 ctgbtnxy    '>
                                                {cat.items.map((itemName: string) => (
                                                    <li key={itemName} className=' w-[140px]  cursor-pointer  h-[28px]   border border-gray-300 text-center ctgbtn rounded langugP2 text-gray-600'
                                                        onClick={() => handleitemClick(cat, itemName)}>
                                                        {itemName}
                                                    </li>
                                                ))

                                                }
                                            </ul>
                                        )
                                        }
                                    </div>
                                ))
                                }
                            </div>
                        </motion.div >
                    ))
                    }
                </div >
                <div>
                </div>
                <div>
                    <Selectionmin
                        onDelete={removeCard}
                        display={handlePrice}
                    />
                </div>
            </div >
        </div>

    )
}

export default SelectionCard