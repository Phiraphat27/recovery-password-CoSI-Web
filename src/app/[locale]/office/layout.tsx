import { ComplexNavbar } from "@/components/Navber"

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