import { ResolverMap } from "./types/resolvermap";
import { User } from "./entity/User";
import { GQL } from './types/graphql';
const resolvers: ResolverMap = {
    Mutation: {
        register: async (_, { email, password }: GQL.IRegisterOnMutationArguments) => {
            let user = await User.findOneBy({email})
            if (!user) {
                User.create({email, password}).save();
                return null
            }
            return [{path: "email", message: "Already Registered!"}];
        }
    },
    Query: {
        hello: (_, ) => {
            return `Hello`
        }
    }
}

export default resolvers;