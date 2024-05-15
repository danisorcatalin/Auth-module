// noinspection JSCheckFunctionSignatures

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
    const { user } = await req.json();
    try {
        return NextResponse.json(
            await prisma.user.update({
                where: { email: user.email },
                data: user
            }),
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            {
                error: err.message
            },
            { status: 400 }
        );
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    return NextResponse.json(
        await prisma.user.findUnique({
            where: { email }
        }),
        { status: 200 }
    );
}
