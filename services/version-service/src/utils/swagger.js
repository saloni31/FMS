import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

export const setupSwagger = (app, routePrefix = "/api-docs") => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: `FMS Version Service API`,
                version: "1.0.0",
                description: `API documentation for Version Service`,
            },
            servers: [
                {
                    // This should match the service URL as exposed by Nginx
                    url:  "http://localhost:8080/version/api/v1",
                },
            ],
        },
        // Absolute path inside the container
        apis: [path.join(process.cwd(), "src/routers/*.js")], // adjust if your routes folder is different
    };

    const specs = swaggerJsdoc(options);

    // Serve swagger UI
    app.use(routePrefix, swaggerUi.serve, swaggerUi.setup(specs));
};
