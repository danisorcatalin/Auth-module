// noinspection JSCheckFunctionSignatures

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import {random} from "lodash";

const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json();
    const {email, code } = body;

    if (!code || !email) {
        return NextResponse.json(
            { error: 'Missing validation Code or email!' },
            { status: 400 }
        );
    }

    try {
        let exists = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!exists) {
            return NextResponse.json(
                { error: 'Error occurred!' },
                { status: 400 }
            );
        }

        let emailVerified = exists.verificationCode === code ;
        const user = await prisma.user.update({
            where: { email: email },
            data: { email: email, emailVerified}
        });

        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}