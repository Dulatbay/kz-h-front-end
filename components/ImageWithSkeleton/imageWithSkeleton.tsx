import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    className?: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, alt, className = '' }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [src]);

    return (
        <div className={`relative ${className}`}>
            {!loaded && (
                <Skeleton.Image
                    active
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                />
            )}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-contain object-center ${!loaded ? 'invisible' : ''}`}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
};

export default ImageWithSkeleton;
