import { PrismaClient } from "@prisma/client";

function getDatabaseUrl() {

  if (process.env.NODE_ENV === 'production') {
    return process.env.DATABASE_URL;
  } else {
    return process.env.DATABASE_URL;
  }
}

// Initialize PrismaClient with the selected database URL
const prismaOptions = {
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
};

global.prisma = global.prisma || new PrismaClient(prismaOptions);

export const db = globalThis.prisma;

if (process.env.NODE_ENV !== 'production') global.prisma = db;