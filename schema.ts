import * as NexusSchema from 'nexus'
import * as path from 'path'
import * as types from './types/user'
import { ApolloError } from 'apollo-server-express'

export default NexusSchema.makeSchema({
  types: types,
  plugins: [
    NexusSchema.fieldAuthorizePlugin({
      formatError: ({ error }) => {
        console.log({ error })
        return new ApolloError(error.message, '10')
      },
    }),
  ],
  outputs: {
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/nexus-typegen/index.d.ts',
    ),
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
})
