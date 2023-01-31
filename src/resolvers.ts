import { ResolverMap } from "./types/resolvermap";
import { GQL } from "./types/graphql";

const resolvers: ResolverMap = {
    Mutation: {
        register: (_, { email, password }: GQL.IRegisterOnMutationArguments) => {
            console.log(email, password)
            return true
        }
    },
    Query: {
        hello: (_, ) => {
            return `Hello`
        }
    }
}

export default resolvers;