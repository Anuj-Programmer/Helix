import Image from "next/image"
import Link from "next/link"

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted flex min-h-svh items-center flex-col justify-center gap-6 p-6 md:p-10">
    <div className="flex w-full max-w-4xl flex-col gap-6">
      {children}
      </div>
      </div>
  )
}

export default AuthLayout
