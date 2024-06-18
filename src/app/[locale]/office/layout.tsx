import { ComplexNavbar } from "@/components/navber"
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