"use server"

import * as z from 'zod'
import bcrypt from 'bcrypt'

import { db } from '@/lib/db'
import {RegisterSchema} from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 7)

    const existingUser = await getUserByEmail(email)

    if(existingUser) {
        return {error: "Email already exists"}
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    })

    // TODO: Send verification token email

    return {success: "User created!"}
}