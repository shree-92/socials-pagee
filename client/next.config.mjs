// next.config.mjs
export default {
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application
                source: "/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Credentials",
                        value: "true",
                    },
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*", // Allow any origin, change to a specific domain if needed
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-Requested-With, Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
};
