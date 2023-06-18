import Head from "next/head"
import Footer from "./ui/Footer"
import Navbar from "./ui/Navbar"

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Bloc</title>
                <meta name='description' content="Gain control of your business's growth with Bloc's comprehensive marketing, automation, and email marketing platform." />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                {/* <link rel='icon' href='favicon.ico' /> */}
            </Head>
            <Navbar />
            <main className='w-full flex flex-col h-full bg-black'>
                {children}
            </main>
            <Footer />

        </>
    )
}

export default Layout