import { PrismaClient } from "@prisma/client";

global.prisma = new PrismaClient();

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = db;