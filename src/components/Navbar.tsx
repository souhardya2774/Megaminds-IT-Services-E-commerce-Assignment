import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <nav className='sticky z-[100] text-4xl h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-16 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40 font-semibold'>
            cobra<span className='text-green-600'>Case</span>
          </Link>

          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <LogoutLink
                  className={buttonVariants({
                    size: 'lg',
                    variant: 'ghost',
                  })}>
                  Sign out
                </LogoutLink>
                {isAdmin && (
                  <Link
                    href='/dashboard'
                    className={buttonVariants({
                      size: 'lg',
                      variant: 'ghost',
                    })}>
                    Dashboard ✨
                  </Link>
                ) }
                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'lg',
                    className: 'hidden lg:flex items-center gap-1',
                  })}>
                  Create case
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            ) : (
              <>
                <RegisterLink
                  className={buttonVariants({
                    size: 'lg',
                    variant: 'ghost',
                  })}>
                  Sign up
                </RegisterLink>

                <LoginLink
                  href='/api/auth/login'
                  className={buttonVariants({
                    size: 'lg',
                    variant: 'ghost',
                  })}>
                  Login
                </LoginLink>

                <div className='h-8 w-px bg-zinc-200 hidden lg:block' />

                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: "lg",
                    className: 'hidden lg:flex items-center gap-1',
                  })}>
                  Create case
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
