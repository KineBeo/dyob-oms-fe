import MoreDetails from "@/components/specific-product-page/MoreDetails";
import ProductInfo from "@/components/specific-product-page/ProductInfo";
import OtherProducts from "@/components/specific-product-page/OtherProduct";
export default function SpecificProduct() {
  return (
    <div>
      <div className="place-content-center w-full mobile:h-32 tablet:h-40 h-48 bg-[#3F291B]"></div>
      <div className="">
        <ProductInfo />
        <MoreDetails />
        <OtherProducts />
      </div>
    </div>
  );
}
