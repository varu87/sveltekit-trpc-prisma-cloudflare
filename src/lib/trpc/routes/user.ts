import { z } from "zod";
import pkg from "@prisma/client/edge";
import { t } from "../t";
import { protectedProcedure } from "../utils";

const { UserHomeRoles } = pkg;

export const user = t.router({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        email: ctx.email!,
      },
      include: {
        UserHome: {
          include: {
            home: true,
          },
        },
      },
    });
    return user;
  }),
  createUserAndHome: protectedProcedure
    .input(
      z.object({
        firstname: z.string().nullable(),
        lastname: z.string().nullable(),
        homeName: z.string().min(1, { message: "Home name missing." }),
        addressLine1: z.string().nullable(),
        addressLine2: z.string().nullable(),
        city: z.string().nullable(),
        state: z.string().nullable(),
        postcode: z.string().nullable(),
        country: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            firstname: input.firstname,
            lastname: input.lastname,
            email: ctx.email!,
            isActive: true,
          },
        });
        const home = await tx.home.create({
          data: {
            name: input.homeName,
            addressLine1: input.addressLine1,
            addressLine2: input.addressLine2,
            city: input.city,
            state: input.state,
            postcode: input.postcode,
            country: input.country,
            isActive: true,
          },
        });
        await tx.userHome.create({
          data: {
            homeId: home.id,
            userId: user.id,
            role: UserHomeRoles.OWNER,
          },
        });
      });
    }),
});
