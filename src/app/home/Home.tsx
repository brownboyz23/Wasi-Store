import CategoriesPage from "./components/Categories"
import ProductsSection from "./components/ProductsSection"
import FeaturedPage from "./components/Featured"
import ChoosePage from "./components/Choose"
import SliderPage from "./components/slider"
import BannerPage from "./components/BannerPage"



const HomePage = () => {
  return (
    <div>
      <BannerPage/>
      <CategoriesPage />
      <ProductsSection />
      <FeaturedPage />
      <ChoosePage />
      <SliderPage />
    </div>
  )
}

export default HomePage