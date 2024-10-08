import OurDestinyCard from "@/components/cards/OurDestinyCard";
import ProductCard from "@/components/cards/ProductCard";
import StoreCard from "@/components/cards/StoreCard";
import WhyChoosingCard from "@/components/cards/WhyChoosingCard";

export default function Search() {
    return (
        <div className="grid
        mobile:grid-cols-2
        tablet:grid-cols-2
        mini-laptop:grid-cols-3
        laptop:grid-cols-3
        desktop:grid-cols-3
        justify-items-center bg-slate-600">
            {/* <StoreCard image_url="/images/shop.png" location="Đông Y Ông Bụt Hà Nội" />
            <StoreCard image_url="/images/shop.png" location="Đông Y Ông Bụt Hồ Chí Minh" /> */}

            {/* <ProductCard image_url="/images/product.png" title="An vi khang ong but" price="200000d" />
            <ProductCard image_url="/images/product.png" title="An vi khang ong but" price="200000d" />
            <ProductCard image_url="/images/product.png" title="An vi khang ong but" price="200000d" />
            <ProductCard image_url="/images/product.png" title="An vi khang ong but" price="200000d" /> */}

            {/* <WhyChoosingCard image_url="/images/whychoosing.png" title="Duoc lieu sach 200%" />
            <WhyChoosingCard image_url="/images/whychoosing.png" title="Duoc lieu sach 200%" />
            <WhyChoosingCard image_url="/images/whychoosing.png" title="Duoc lieu sach 200%" />
            <WhyChoosingCard image_url="/images/whychoosing.png" title="Duoc lieu sach 200%" />
            <WhyChoosingCard image_url="/images/whychoosing.png" title="Duoc lieu sach 200%" /> */}

            <OurDestinyCard />
            <OurDestinyCard />
            <OurDestinyCard />
        </div>

        
    )
}