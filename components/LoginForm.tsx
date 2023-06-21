"use client"

import { useState, FC, useEffect } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { FcGoogle } from "react-icons/fc"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { HiArrowUpRight } from "react-icons/hi2"
import { useForm } from "react-hook-form"
import { ZodType, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"
import BrandLogo from "./BrandLogo"
// import Footer from "./Footer"

interface FormType {
  email: string
  password: string
}

const LoginForm: FC = () => {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/notes"
  const { toast } = useToast()

  const schema: ZodType<FormType> = z.object({
    email: z.string().nonempty({ message: "Email is required" }).email(),
    password: z.string().nonempty({ message: "Password is required" }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema), mode: "all" })

  const handleSignIn = async (data: FormType) => {
    setIsLoading(true)
    try {
      const email = data.email
      const password = data.password
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: callbackUrl,
        redirect: false,
      })

      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Invalid email or password.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        setIsLoading(false)
      }
    } catch (error: any) {
      console.log(error)
      setIsLoading(false)
    } finally {
    }
  }

  const loginWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: callbackUrl, redirect: true })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "There was an error logging in with Google",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  return (
    <div className=" flex items-center justify-center rounded-2xl bg-secondary p-12 shadow-2xl">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex sm:w-[26rem] w-[17rem] flex-col gap-8"
      >
        <section className="flex items-center justify-between">
          <BrandLogo />
          <Link href={"/signup"} className="flex items-center justify-center group gap-1">
            <p>Sign up</p>
            <HiArrowUpRight className="h-4 w-4 text-slate-500 group-hover:dark:text-white group-hover:text-black" />
          </Link>
        </section>

        <p className="text-xl hidden sm:block">Welcome to NoteFlix.</p>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col w-full gap-1">
            <Input {...register("email")} placeholder="Email" type="text" />
            {errors.email && (
              <p className="pl-3 text-sm cursor-default text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <Input {...register("password")} placeholder="Password" type="password" />
            {errors.password && (
              <p className="pl-3 text-sm cursor-default text-red-500">{errors.password?.message}</p>
            )}
          </div>
          {!isLoading ? (
            <Button edge="default" type="submit" size="default" className="mt-5 w-full">
              Log In
            </Button>
          ) : (
            <Button
              edge="default"
              type="submit"
              size="default"
              loading="yes"
              className="mt-5 w-full"
            >
              Log In
            </Button>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            <Separator className="w-[40%] sm:w-[30%]" />
            <p className="text-xs sm:block hidden text-slate-400 dark:text-slate-500">
              OR CONTINUE WITH
            </p>
            <p className="text-xs sm:hidden block text-slate-400 dark:text-slate-500">OR</p>
            <Separator className="w-[40%] sm:w-[30%]" />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <Button
            onClick={loginWithGoogle}
            edge="default"
            type="submit"
            size="default"
            className="w-full flex gap-2"
          >
            <FcGoogle className="h-5 w-5" />
            Google
          </Button>
        </section>
      </form>
    </div>
  )
}

export default LoginForm
