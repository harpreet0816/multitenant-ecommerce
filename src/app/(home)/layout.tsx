import { Navbar } from "./navbar"

interface Props {
    children: React.ReactNode,
}
const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <nav className="bg-red-500 text-white w-full p-2">
                <Navbar />
            </nav>
            {children}
        </div>
    )
}

export default Layout