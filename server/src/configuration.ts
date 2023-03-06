import { AuthConfig } from "@hilma/auth-nest";

export default (): AuthConfig => ({
    auth: {
        access_logger: {
            enable: true,
            tries: 5
        },

        accessToken_cookie: "m4StEr_1T4r4T0r",
        secretOrKey: process.env.JWT_SECRET,
    },

    roleAccess: {
        Editor: {
            components: [],
            defaultHomePage: 'home-page'
        }
    }
})