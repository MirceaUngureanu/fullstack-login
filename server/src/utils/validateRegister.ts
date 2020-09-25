import { UsernamePasswordInput } from "../resolvers/usernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
    if (!options.email.includes("@")) {
        return [ {
            field: 'email',
            message: 'email must include "@" sign'
        } ]
    }

    if (options.username.length <= 2) {
        return [ {
            field: 'username',
            message: 'length must be greater than 2 characters'
        } ]
    }

    if (options.username.includes("@")) {
        return [ {
            field: 'username',
            message: 'cannot include @'
        } ]
    }

    if (options.password.length <= 3) {
        return [ {
            field: 'password',
            message: 'length must be greater than 3 characters'
        } ]
    }

    return null
}