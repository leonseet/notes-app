"use client"

import { useState, FC, useEffect } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { HiArrowUpRight } from "react-icons/hi2"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useForm } from "react-hook-form"
import { ZodType, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"

interface FormType {
  firstName: string
  lastName: string
  email: string
  password: string
}

const SignUpForm: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/notes"
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  const schema: ZodType<FormType> = z.object({
    firstName: z.string().nonempty({ message: "First name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" }),
    email: z.string().nonempty({ message: "Email is required" }).email(),
    password: z.string().nonempty({ message: "Password is required" }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema), mode: "all" })

  const handleSignUp = async (data: FormType) => {
    setIsLoading(true)
    try {
      const firstName = data.firstName
      const lastName = data.lastName
      const email = data.email
      const password = data.password
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          name: `${firstName} ${lastName}`,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.ok) {
        signIn("credentials", { email, password, callbackUrl: "/dashboard/notes" })
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        console.log(await res.json())
        setIsLoading(false)
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      console.log(error?.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col gap-6 container mt-10 sm:mt-60 items-center justify-center rounded-2xl bg-secondary p-12 shadow-2xl w-fit">
      {/* <form className="flex w-[26rem] flex-col gap-8" onSubmit={handleSignIn}> */}
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex sm:w-[26rem] w-[17rem] flex-col gap-8"
      >
        <section className="flex items-center justify-between">
          <Image
            src={theme === "dark" ? "logo-light.svg" : "logo-dark.svg"}
            width={1}
            height={1}
            alt="Kanban Light Logo"
            className="w-auto h-5 sm:h-6"
          />
          <Link href={"/login"} className="flex items-center justify-center group gap-1">
            <p>Log in</p>
            <HiArrowUpRight className="h-4 w-4 text-slate-500 group-hover:dark:text-white group-hover:text-black" />
          </Link>
        </section>

        <p className="text-xl hidden sm:block">Get Started.</p>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col w-full gap-1">
            <Input {...register("firstName")} placeholder="First name" type="text" />
            {errors.firstName && (
              <p className="pl-3 text-sm text-red-500">{errors.firstName?.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <Input {...register("lastName")} placeholder="Last name" type="text" />
            {errors.lastName && (
              <p className="pl-3 text-sm text-red-500">{errors.lastName?.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <Input {...register("email")} placeholder="Email" type="text" />
            {errors.email && <p className="pl-3 text-sm text-red-500">{errors.email?.message}</p>}
          </div>
          <div className="flex flex-col w-full gap-1">
            <Input {...register("password")} placeholder="Password" type="password" />
            {errors.password && (
              <p className="pl-3 text-sm text-red-500">{errors.password?.message}</p>
            )}
          </div>
          {!isLoading ? (
            <Button edge="default" type="submit" size="default" className="w-full mt-5">
              Create Account
            </Button>
          ) : (
            <Button
              edge="default"
              type="submit"
              size="default"
              loading="yes"
              className="w-full mt-5"
            >
              Create Account
            </Button>
          )}
        </section>
      </form>
    </div>
  )
}

export default SignUpForm
