import Sidebar from "./Sidebar"
import TopNav from "./TopNav"
import Footer from "./Footer"

function DashboardLayout({ children, pageTitle }) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col">
        <TopNav pageTitle={pageTitle} />
        <main className="mt-16 p-6 flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout