import { User, Post } from 'nexus-prisma'
import { intArg, list, makeSchema, mutationField, nonNull, nullable, objectType, queryField, queryType } from 'nexus'
import { prisma } from '../prisma/client'

export const schema = makeSchema({
  types: [
    objectType({
      name: User.$name,
      description: User.$description,
      definition(t) {
        t.field(User.id)
        t.field(User.name)
        t.field(User.post)
        t.boolean('myBool', {
          resolve: (user, args, context, info) => {
            console.log({ user, args, context, info })
            return false
          },
          authorize: () => false
        })
      }
    }),
    objectType({
      name: Post.$name,
      description: Post.$description,
      definition(t) {
        t.field(Post.id)
        t.field(Post.title)
        t.field(Post.content)
      }
    })
  ],
})

queryType({
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve(_, __, ctx) {
        return ctx.prisma.user.findMany()
      },
    })
  },
})

export const queries = queryField((t) => {
  t.field('custom', {
    type: 'Int',
    args: {
      idx: nonNull(intArg()),
    },
    resolve: async (_root, args, ctx, info) => {
      return args.idx
    }
  })
  t.field('get', {
    type: 'User',
    resolve: async (_root, args, ctx) => {
      const user = await prisma.user.findFirst({})
      return user
    }
  })
  t.field('users', {
    type: list(nullable('User')),
    resolve: async (_root, args, ctx) => {
      const users = await prisma.user.findMany({})
      return users
    }
  })
})

export const mutations = mutationField((t) => {
  t.field('create', {
    type: 'User',
    resolve: async (_root, args, ctx) => {
      const id = `${Math.random()}`
      const user = await prisma.user.create({
        data: {
          id: id,
          name: `Cauê_${id}`,
          post: {
            create: {
              id: id,
              title: `Title_${id}`,
              content: `Content_${id}`,
            }
          }
        }
      })
      return user
    }
  })
})