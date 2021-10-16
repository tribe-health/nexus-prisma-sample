import { ExpressContext } from 'apollo-server-express'
import { prisma } from './prisma/client';

export const createContext = (e: ExpressContext) => ({
  prisma,
  params: e,
})
