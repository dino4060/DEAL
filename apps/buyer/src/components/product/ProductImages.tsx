'use client';

import Image from 'next/image';
import React from 'react';

const imageUrls = [
    '/square.jpg',
    '/laptop.jpg',
    '/ring.jpg',
    '/dog.jpg',
    '/watch.jpg',
    '/ipad.jpg',
    '/earphones.jpg',
    '/iphone.jpg',
    '/headphones.jpg',
    '/pocket3.jpg',
];

type Props = {
    selectedImage: string | null;
    setSelectedImage: (img: string) => void;
};

const ProductImages = ({ selectedImage, setSelectedImage }: Props) => {
    // const [selectedImage, setSelectedImage] = useState(imageUrls[0]); // todo: default image dùng useEffect

    return (
        <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 max-h-full overflow-y-auto scrollbar-hidden">
                {/* EXP: aspect-* h-full: tạo ra một ratio tính toán theo height
                height lại kế thừa từ parent
                parent height: có dãn, tính theo cột phải
                parent width: tính toán một cách tự nhiên, bằng 64px
                 */}
                <div className="h-full aspect-square flex flex-col gap-2">
                    {imageUrls.map((url) => (
                        <Image
                            key={url}
                            src={url}
                            alt={`Thumbnail ${url}`}
                            onMouseEnter={() => setSelectedImage(url)}
                            width={64}
                            height={64}
                            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${selectedImage === url ? 'border-blue-500' : 'border-transparent'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Main Image */}
            <div className="flex-1 w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative">
                {/* width của cột phải: flex-1 w-full nên lấy toàn bộ width còn lại
                height của cột phải: aspect-square w-full tính toán chiều cao theo chiều rộng  */}
                <Image
                    src={selectedImage || imageUrls[0]}
                    alt="Selected Product"
                    fill
                    className="object-contain rounded"
                    sizes="(min-width: 1024px) 500px, 100vw"
                />
            </div>
        </div>
    );
};

export default ProductImages;