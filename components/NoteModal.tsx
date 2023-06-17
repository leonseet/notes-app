"use client"
import { useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

interface NoteModalProps {
  children: React.ReactNode
}

const NoteModal = ({ children }: NoteModalProps) => {
  const overlay = useRef<HTMLDivElement | null>(null)
  const wrapper = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  // const onKeyDown = useCallback(
  //   (e: KeyboardEvent) => {
  //     if (e.key === "Escape") onDismiss()
  //   },
  //   [onDismiss]
  // )

  // useEffect(() => {
  //   document.addEventListener("keydown", onKeyDown)
  //   return () => document.removeEventListener("keydown", onKeyDown)
  // }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className="fixed z-40 left-0 right-0 top-0 bottom-0 mx-auto backdrop-blur-sm"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6 h-screen"
      >
        {children}
      </div>
    </div>
  )
}

export default NoteModal
