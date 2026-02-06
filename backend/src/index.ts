import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();
app.use('/*', cors())
app.get('/', (c) => c.text('Hello Hono!'))
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const OPTIONS = handle(app);

export default app