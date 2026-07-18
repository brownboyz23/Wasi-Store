import React from 'react'
import BannerPage from './components/bannerpage'
import CategoriesPage from './components/Categories'
import LoadMoreSec from './components/LoadMoreSec'
// import ProductPage from './components/productspage'

const ProductsPage = () => {
  return (
    <div>
         <BannerPage/>
         <CategoriesPage/>
         <LoadMoreSec/>
    </div>
  )
}

export default ProductsPage