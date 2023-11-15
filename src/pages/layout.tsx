
import BackToTopButton from "@/components/BackToTopButton"
import CookiePop from "@/components/CookiePop"
import Header from "@/components/header"
import { useRouter } from "next/router"

export default function Layout({ children }:any ) {
  const router = useRouter()
  return (
    <>
      {/* <Header /> */}

      <main dir={router.locale == 'ar' ? "rtl":'ltr'}>{children}</main>
      <BackToTopButton /> 
      <CookiePop />
    </>
  )
}
