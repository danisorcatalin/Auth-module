// noinspection JSCheckFunctionSignatures

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import {random} from "lodash";

const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json();
    const { password, email, passwordMatch } = body;

    if (!password || !email) {
        return NextResponse.json(
            { error: 'Missing password or email on Register!' },
            { status: 400 }
        );
    }

    if (!password?.length || password.length < 8) {
        return NextResponse.json(
            { error: "Passwords doesn't meat requirements! must be at least 8 char long" },
            { status: 400 }
        );
    }

    if (!passwordMatch?.length || passwordMatch !== password) {
        return NextResponse.json(
            { error: "Passwords doesn't match!" },
            { status: 400 }
        );
    }

    try {
        const exists = await prisma.user.findUnique({
            where: { email: email }
        });

        if (exists) {
            return NextResponse.json(
                { error: 'Error occurred!' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateRandomString(10) ;
        console.log(verificationCode);
        const user = await prisma.user.create({
            data: { email: email, hashedPassword, verificationCode }
        });

        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}