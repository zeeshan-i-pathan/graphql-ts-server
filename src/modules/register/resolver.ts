import { User } from "../../entity/User";
import { Resolvers } from '../../types/resolver-types';
// const { object, string } = require("yup");
import formatYupErrors from '../../utils/formatYupErrors';
import { object, string } from "yup";


const schema = object({
    email: string().min(3).max(255).email(),
    password: string().min(3).max(20)
})

export const resolver: Resolvers = {
    Mutation: {
        register: async (_, args) => {
            try {
                await schema.validate(args, { abortEarly: false });
            } catch (err) {
                return formatYupErrors(err);
            }
            const { email, password } = args;
            // Check if user exists
            let user = await User.findOne({where: {email}, select: ['id']})
            // If not found create one
            if (!user) {
                User.create({email, password}).save();
                return null
            }
            // If found return error
            return [{path: "email", message: "Already Registered!"}];
        }
    }
}