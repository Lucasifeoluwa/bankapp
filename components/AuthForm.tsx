'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if (type === 'sign-up') {
        const newUser = await signUp(data)
        setUser(newUser)
      }

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password
        })

        if (response) router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className=' auth-form '>
      <header className=' flex flex-col gap-5 md:gap-8 '>
        <Link href={'/'} className=' cursor-pointer  items-center gap-1 flex '>
          <Image src={'/icons/logo.svg'} width={34} height={34} alt='logo' />
          <h1 className=' text-[26px] font-ibm-plex-serif text-black-1 '>
            Summit
          </h1>
        </Link>
        <div className=' flex flex-col gap-1 md:gap-3'>
          <h1 className=' tex-24 lg:text-36  text-gray-900 '>
            {user
              ? 'Link Account'
              : type === 'sign-in'
              ? 'Sign In'
              : 'Sign  Up'}
            <p className=' text-16  font-normal text-gray-600 '>
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className=' flex flex-col gap-4 '></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {type === 'sign-up' && (
                <>
                  <div className=' flex gap-4 '>
                    <CustomInput
                      control={form.control}
                      label={'First Name'}
                      name={'firstName'}
                      placeholder={'Enter your first name'}
                    />
                    <CustomInput
                      control={form.control}
                      label={'Last Name'}
                      name={'lastName'}
                      placeholder={'Enter your last name'}
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    label={'Address'}
                    name={'address1'}
                    placeholder={'Enter your address'}
                  />
                  <CustomInput
                    control={form.control}
                    label={'City'}
                    name={'city'}
                    placeholder={'Enter your city'}
                  />

                  <div className=' flex gap-4 '>
                    <CustomInput
                      control={form.control}
                      label={'State'}
                      name={'state'}
                      placeholder={'e.g Lagos'}
                    />
                    <CustomInput
                      control={form.control}
                      label={'Postal Code'}
                      name={'postalCode'}
                      placeholder={'e.g 100001'}
                    />
                  </div>
                  <div className=' flex gap-4 '>
                    <CustomInput
                      control={form.control}
                      label={'Date of Birth'}
                      name={'dob'}
                      placeholder={'yyyy-mm-dd'}
                    />
                    <CustomInput
                      control={form.control}
                      label={'SSN'}
                      name={'ssn'}
                      placeholder={'e.g 1234'}
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                label={'Email'}
                name={'email'}
                placeholder={'Enter your email'}
              />
              <CustomInput
                control={form.control}
                label={'Password'}
                name={'password'}
                placeholder={'Enter your password'}
              />

              <div className=' flex flex-col gap-4 '>
                <Button
                  type='submit'
                  className=' form-btn '
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className=' animate-spin ' /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className=' flex justify-center gap-1 '>
            <p className=' text-14 font-normal text-gray-600 '>
              {' '}
              {type === 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account?'}{' '}
            </p>
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className='form-link'
            >
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm
