import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { signInInput, signUpInput } from "@rishikonar/medium-common";
import { Hono } from "hono";
import { sign, verify } from 'hono/jwt';
import { Pool } from 'pg';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    try {
        const body = await c.req.json();
        const result = signUpInput.safeParse(body);
        if (!result.success) {
            c.status(400);
            return c.json({
                message: "Inputs not correct",
                errors: result.error
            })
        }
        const pool = new Pool({ connectionString: c.env.DATABASE_URL })
        const adapter = new PrismaPg(pool)
        const prisma = new PrismaClient({ adapter })

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name || ""
            }
        })
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        return c.text(jwt)
    } catch (e) {
        c.status(500);
        return c.json({
            error: "Internal Server Error",
            message: e instanceof Error ? e.message : String(e)
        })
    }
})


userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const pool = new Pool({ connectionString: c.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password,
            }
        })
        if (!user) {
            c.status(403);
            return c.json({
                message: "Incorrect creds"
            })
        }
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        return c.text(jwt)
    } catch (e) {
        c.status(411);
        return c.text('Invalid')
    }
})

userRouter.get('/me', async (c) => {
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
        const user = await verify(token, c.env.JWT_SECRET, "HS256");

        const pool = new Pool({ connectionString: c.env.DATABASE_URL })
        const adapter = new PrismaPg(pool)
        const prisma = new PrismaClient({ adapter })

        const userDetails = await prisma.user.findFirst({
            where: {
                id: user.id as string
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        if (!userDetails) {
            c.status(404);
            return c.json({ message: "User not found" });
        }

        return c.json({
            user: userDetails
        });
    } catch (e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});
