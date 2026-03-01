import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { createBlogInput, updateBlogInput } from "@rishikonar/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { Pool } from 'pg';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    let authHeader = c.req.header("authorization") || "";
    if (authHeader.startsWith("Bearer ")) {
        authHeader = authHeader.split(" ")[1];
    }

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET, "HS256");
        if (user) {
            c.set("userId", user.id as string);
            await next();
        } else {
            console.log("Auth failed: No user returned from verify");
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (e) {
        console.log("Auth failed:", e);
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const authorId = c.get("userId");
    const pool = new Pool({ connectionString: c.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
            category: body.category || "General"
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const pool = new Pool({ connectionString: c.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            category: body.category
        }
    })

    return c.json({
        id: blog.id
    })
})

// Todo: add pagination
blogRouter.get('/bulk', async (c) => {
    const pool = new Pool({ connectionString: c.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })
    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            authorId: true,
            category: true,
            createdAt: true,
            author: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");

    const pool = new Pool({ connectionString: c.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                authorId: true,
                category: true,
                createdAt: true,
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        });
    } catch (e) {
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})
