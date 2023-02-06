import { User } from "../../entity/User";
import { GQL } from "../../types/graphql";
import { ResolverMap } from "../../types/resolvermap";

export const resolver: ResolverMap = {
    Mutation: {
        register: async (_, { email, password }: GQL.IRegisterOnMutationArguments) => {
            let user = await User.findOne({where: {email}, select: ['id']})
            if (!user) {
                User.create({email, password}).save();
                return null
            }
            return [{path: "email", message: "Already Registered!"}];
        }
    }
}