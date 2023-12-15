import { AuthConfig } from "@hilma/auth-nest";

export default (): AuthConfig => ({
    auth: {
        ttl: {
            Admin: 1000 * 60 * 30, // 30 minutes
            User: 1000 * 60 * 60 * 3, // 3 hours
        },

        accessToken_cookie: process.env.AT_COOKIE,
        secretOrKey: process.env.JWT_SECRET,
    },
    roleAccess: {
        Admin: {
            components: ["Admin", "User"],
            defaultHomePage: "Admin",
        },
        User: {
            components: ["User"],
            defaultHomePage: "Home",
        },
    },
});
