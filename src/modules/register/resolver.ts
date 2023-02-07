import { User } from "../../entity/User";
import { Resolvers } from '../../types/resolver-types'

export const resolver: Resolvers = {
    Mutation: {
        register: async (_, { email, password }) => {
            let user = await User.findOne({where: {email}, select: ['id']})
            if (!user) {
                User.create({email, password}).save();
                return null
            }
            return [{path: "email", message: "Already Registered!"}];
        }
    }
}