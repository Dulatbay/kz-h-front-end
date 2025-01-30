'use client';

import React, {Suspense} from "react";
import Loader from "@/components/Loader/loader";
import ShowModule from "@/app/[lng]/(main-pages)/modules/show-module";

const Page = () => {
    return (
        <div
            className="mt-10 w-full max-w-[1200px] min-w-80 mx-auto flex flex-col gap-6 sm:px-8 px-0 overflow-x-hidden">
            <Suspense fallback={<Loader/>}>
                <ShowModule/>
            </Suspense>
        </div>
    );
};


export default Page;
