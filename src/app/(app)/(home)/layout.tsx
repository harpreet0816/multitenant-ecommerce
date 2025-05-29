import configPromise from "@payload-config";
import { getPayload } from "payload";

import Footer from "./footer"
import { Navbar } from "./navbar"
import { SearchFilters } from "./search-filters";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface Props {
    children: React.ReactNode,
}
const Layout = async ({ children }: Props) => {

    const payload = await getPayload({
        config: configPromise,
    });

    const data = await payload.find({
        collection: "categories",
        depth: 1, //populate subcategories
        pagination: false,
        where: {
            parent: {
                exists: false,
            }
        },
        sort: "name"
    });
    const formattedData: CustomCategory[] = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((subDoc) => {
            return {
                ...(subDoc as Category),
                // subcategories: undefined // Uncomment if needed 
            };
        }),
    }));

    return (
        <div className="flex flex-col min-h-screen">
            {/* <nav className="bg-red-500 text-white w-full p-2"> */}
            <Navbar />
            {/* </nav> */}
            <SearchFilters data={formattedData} />
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout