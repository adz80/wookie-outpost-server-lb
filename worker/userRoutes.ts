import { Hono } from "hono";
import { Env } from './core-utils';
// Extend the Env interface to include our environment variable for type safety
interface AppEnv extends Env {
    'server-name'?: string;
}
export function userRoutes(app: Hono<{ Bindings: AppEnv }>) {
    app.get('/api/signal', (c) => {
        // Access the 'server-name' environment variable with a fallback for local development
        const serverName = c.env['server-name'] || 'Kashyyyk-Local';
        return c.json({ serverName });
    });
}