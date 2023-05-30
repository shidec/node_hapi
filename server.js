const Hapi = require('@hapi/hapi');
const Vision = require('vision');
const hbs = require('hbs');

const init = async () => {
  const server = new Hapi.Server({
    port: 88,
    host: 'localhost',
  });

  await server.register(Vision);
    server.views({
        engines: {
            html: hbs
        },
        relativeTo: __dirname,
        path: 'templates'
    });

  const routes = [
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
          return h.view('index', {
            title: 'Home',
            people: [
              'Soesapto',
              'Joeni',
              'Hantoro'
            ]
        });
      }
    },
    {
      method: 'GET',
      path: '/about',
      handler: (request, h) => {
          return h.view('index', {
            title: 'About'
        });
      }
    },
    {
      method: 'GET',
      path: '/products',
      handler: (request, h) => {
          return h.view('index', {
            title: 'Products'
        });
      }
    }
  ];

  server.route(routes);

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
};

init();
