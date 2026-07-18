"use client"
import React, { SetStateAction, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CPUSection from "../cpu/page"
import GPUSection from "../gpu/page"
import Storage from "../storage/page"
import Categorypst from "./Categorypst"


const CategoriesPage = () => {

    const [selectedItem, setSelected] = useState("Category")

    const [position, setPosition] = React.useState('bottom')
    // const [products, setProducts] = useState<products[]>([])
    const [range1, setRange1] = useState("All")

    return (
        <div className="container ">
            <div className="flex items-center justify-between border-t border-b p-3">
                <div className="">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" value={"Category"} className="font-bold langugP7 text-gray-500">{selectedItem}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="ctgProxs">
                            <DropdownMenuLabel className="mx-5 langugP8 font-bold fontSizej">Parts</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                <DropdownMenuRadioItem value="CPU_s" onClick={() => setSelected("CPU-s")} className="langugP8 font-bold fontSizej">CPU-s</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="GPU-s" onClick={() => setSelected("GPU-s")} className="langugP8 font-bold fontSizej">GPU-s</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Storage" onClick={() => setSelected("Storage")} className="langugP8 font-bold fontSizej">Storage</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="font-bold langugP7 text-gray-500">{range1}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="ctgProxs">
                            <DropdownMenuLabel className="langugP8 font-bold fontSizej">Range</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={range1} onValueChange={setRange1}>
                                <DropdownMenuRadioItem value="High" onClick={() => setRange1("High")} className="langugP8 font-bold fontSizej">High</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Medium" onClick={() => setRange1("Medium")} className="langugP8 font-bold fontSizej">Medium</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Low" onClick={() => setRange1("Low")} className="langugP8 font-bold fontSizej">Low</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div>
                {selectedItem === "Category" && (
                    <Categorypst selectItem={range1} />
                )
                }
            </div>
            <div className="mt-25">
                {selectedItem === "CPU-s" && (
                    <div className="">
                        <CPUSection  />
                    </div>
                )
                }
                {selectedItem === "GPU-s" && (
                    <div>
                        <GPUSection  />
                    </div>
                )
                }
                {selectedItem === "Storage" && (
                    <div>
                        <Storage />
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default CategoriesPage   