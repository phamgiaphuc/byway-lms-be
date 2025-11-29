import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Byway LMS API",
      version: "1.0.0",
      description: "API documentation",
      license: {
        name: "Apache License, Version 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        url: "/api",
      },
    ],
    tags: [
      { description: "Auth API", name: "Auth" },
      { description: "User API", name: "User" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["src/lib/docs/**/*.yaml"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
