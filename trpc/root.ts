import { createTRPCRouter, publicProcedure } from "./index";

export const appRouter = createTRPCRouter({
  allUsers: publicProcedure
    .query(({ ctx }) => {
        return ctx.db.user.findMany()
    }),
});

export type AppRouter = typeof appRouter;
