import NavBar from "../../components/NavBar/NavBar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main>
           
            {children}
        </main>
    )
}