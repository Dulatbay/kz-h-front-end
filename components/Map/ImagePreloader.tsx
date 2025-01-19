'use client'

import Image from 'next/image';
import {getMapImageUrl} from '@/utills/getHistoryData';

export function ImagePreloader({mapUrls}: { mapUrls: string[] }) {
    return (
        <div className="hidden">
            {mapUrls.map((url) => (
                <Image
                    key={url}
                    src={getMapImageUrl(url)}
                    alt="preload"
                    width={1}
                    height={1}
                    priority
                />
            ))}
        </div>
    );
}