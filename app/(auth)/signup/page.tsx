import SignUpForm from "@/components/SignUpForm"
// import Footer from "@/components/Footer"

export default function Signup() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-1">
        <SignUpForm />
      </div>
      {/* <div className="container">
        <Footer />
      </div> */}
    </main>
  )
}
