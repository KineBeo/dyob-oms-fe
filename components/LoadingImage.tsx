import { useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";

const LoadingImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full h-full">
            {loading && (
                <Skeleton className="absolute inset-0" />
            )}
            <CldImage
                src={src}
                alt={alt}
                fill
                className={`${className} ${loading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setLoading(false)}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    );
};

export default LoadingImage;