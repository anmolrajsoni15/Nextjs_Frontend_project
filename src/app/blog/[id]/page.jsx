import Navbar from '../components/Navbar'
import BlogPage from '../components/BlogPage'
import Footer from '../components/Footer'

function page() {
  return (
    <main className="flex flex-col w-full text-white">
        <Navbar />
        <BlogPage />
        <Footer />
    </main>
  )
}

export default page