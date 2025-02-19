import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MongoDB REST API',
      version: '1.0.0',
      description: 'A simple REST API using MongoDB',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'User\'s username'
            },
            password: {
              type: 'string',
              description: 'User\'s password'
            }
          }
        },
        Data: {
          type: 'object',
          required: ['id', 'Firstname', 'Surname', 'userid'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier'
            },
            Firstname: {
              type: 'string',
              description: 'User\'s first name'
            },
            Surname: {
              type: 'string',
              description: 'User\'s surname'
            },
            userid: {
              type: 'string',
              description: 'Associated user ID'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/app.js']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };