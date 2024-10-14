const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: `API untuk Take Home Test Nutech Integrasi\n\n Rahmat Adlin Pasaribu`,
    },
    servers: [
      {
        url: 'https://test-nutech-rahmatadlin.up.railway.app', // Tambahkan protokol https
        description: 'Server Development', // Tambahkan deskripsi opsional
      },
      // {
      //   url: 'http://localhost:3000', // Uncomment this line for local development
      //   description: 'Localhost Server', // Local development server
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: "1. Module Membership" },
      { name: "2. Module Information" },
      { name: "3. Module Transaction" }
    ],
  },
  apis: ['./routes/*.js'], // Ensure this path is correct
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerDocs,
  swaggerUi,
};
