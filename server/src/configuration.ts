import { AuthConfig } from "@hilma/auth-nest";

export default (): AuthConfig => ({
    auth: {
        access_logger: {
            enable: true,
            tries: 5
        },

        accessToken_cookie: process.env.AT_COOKIE,
        secretOrKey: process.env.JWT_SECRET,
    },

    roleAccess: {
        Editor: {
            components: ['Editor'],
            defaultHomePage: 'home-page'
        }
    }
})