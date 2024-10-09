import ProductCard from "@/components/cards/ProductCard";

export default function Products() {
    return (
        <>
            <div className="place-content-center w-full mobile:h-32 bg-gray-500">
                <p className="text-center font-bold text-2xl"> Đông Y Ông bụt</p>
                <p className="text-center font-bold">Quán tâm an bệnh</p>
            </div>
        

            <div className="my-8 text-center font-semibold">
                <p className="text-lg laptop:text-xl">Sản phẩm</p>
                <p className="text-2xl">Đông y ông bụt</p>
            </div>

            <div className="grid
                            mobile:grid-cols-2
                            tablet:grid-cols-2
                            mini-laptop:grid-cols-3
                            grid-cols-4
                            mobile:gap-0 gap-4 mobile:mx-2 tablet:mx-8 mini-laptop:mx-8 latptop:mx-12 mx-32 justify-items-center">
                <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
                <ProductCard image_url="/images/product.png" title="An vị khang Ông Bụt" price="200.000đ" />
            </div>
        </>
    )
}