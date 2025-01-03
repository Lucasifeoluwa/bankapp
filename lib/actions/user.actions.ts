'use server'

import { ID } from 'node-appwrite'
import { createAdminClient, createSessionClient } from '../appwrite'
import { cookies } from 'next/headers'
import { parseStringify } from '../utils'
import { NextResponse } from 'next/server'

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient()

    const response = await account.createEmailPasswordSession(email, password)

    return parseStringify(response)
  } catch (error) {
    console.error('Error', error)
  }
}

export const signUp = async (userData: SignUpParams) => {
  try {
    const { account } = await createAdminClient()

    const newUser = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      `${userData.firstName} ${userData.lastName}`
    )

    const session = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    )

    const cookieStore = await cookies()

    cookieStore.set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    })

    return parseStringify(newUser)
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}

export async function getLoggedInUser () {
  try {
    const { account } = await createSessionClient()

    const user = await account.get()

    return parseStringify(user)
  } catch (error) {
    return null
  }
}

export const logOutAccount = async () => {
  try {
    const { account } = await createSessionClient()
    const cookieStore = await cookies()
    cookieStore.delete('appwrite-session')
    await account.deleteSession('current')
  } catch (error) {
    return null
  }
}
