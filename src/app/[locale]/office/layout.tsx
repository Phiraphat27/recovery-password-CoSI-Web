import { ComplexNavbar } from "@/components/Navber"
import { Suspense } from "react"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <ComplexNavbar />
            {children}
        </div>
    )
}