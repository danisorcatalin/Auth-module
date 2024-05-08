// noinspection JSCheckFunctionSignatures

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import {randomUUID} from "crypto";

const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json();
    const { email } = body;

    if (!email) {
        return NextResponse.json(
            { error: 'Missing email on password recovery!' },
            { status: 400 }
        );
    }

    if (!email?.length) {
        return NextResponse.json(
            { error: 'Missing email on password recovery!' },
            { status: 400 }
        );
    }
    try {
        const exists = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!exists) {
            return NextResponse.json(
                { error: 'Error occurred! User does not exist' },
                { status: 400 }
            );
        }

        let password = randomUUID();

        //TODO send email wit password so he can recover it

        const hashedPassword = await bcrypt.hash(password, 42);
        const user = await prisma.user.update({
            data: { email: email, hashedPassword }
        });

        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
