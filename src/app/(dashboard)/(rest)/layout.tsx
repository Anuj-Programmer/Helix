import { AppHeader } from "@/components/app-header";

function Layout({children}: {children: React.ReactNode;}) {
  return (
        <>
        <AppHeader/>
        <main className="flex-1">{children}</main>
        </>
  )
}

export default Layout;
