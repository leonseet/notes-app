import LoginForm from "@/components/LoginForm"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"
// import Footer from "@/components/Footer"
import Link from "next/link"

export default async function Login() {
  return (
    <main className="flex flex-col min-h-screen">
      <div>
        <Link href="/">
          <ArrowLeft className="w-12 h-12 mt-4 ml-4 text-secondary-foreground hover:text-foreground sm:block hidden" />
        </Link>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-6 container items-center mt-10 sm:mt-12">
          <LoginForm />
        </div>
      </div>
      {/* <footer className="container">
        <Footer />
      </footer> */}
    </main>
  )
}
