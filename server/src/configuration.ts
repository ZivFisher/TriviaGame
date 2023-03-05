export interface AuthConfig {
    auth: {
        ttl?: {
            [type: string]: number;
        };

        // verification_email?: {
        // 	welcome_to?: string;
        // 	verifyPath?: string;
        // 	html?: string;
        // 	text?: string;
        // 	logoDiv?: string;
        // 	logoPath?: string;
        // 	subject?: string;
        // };

        // reset_password_email?: {
        // 	welcome_to?: string,
        // 	changePath?: string,
        // 	html?: string,
        // 	text?: string,
        // 	logoDiv?: string,
        // 	logoPath?: string,
        // 	subject?: string
        // }

        access_logger?: {
            enable: boolean;
            minutes?: number;
            tries?: number
        };

        secretOrKey?: string;

        // twoFactorSecretOrKey?: string;

        accessToken_cookie?: string;

        allow_accessToken_query?: boolean;

        // twoFactorToken_cookie?: string;

        retrieve_all_userData?: boolean;
    };

    app_name?: string;

    app_name_he?: string;

    roleAccess: {
        [role: string]: {
            components: string[];
            defaultHomePage: string;
        };
    };
}

export default () => ({
    auth: {
        access_logger: {
            enable: true,
            tries: 5
        },
        roleAccess: {
            editor: {
                defaultHomePage: 'home-page'
            }
        }
    }
})