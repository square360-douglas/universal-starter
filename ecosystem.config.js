module.exports = {
  apps : [{
    name: 'Static SSR Server',
    script: 'node_modules/.bin/http-server',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'dist/browser',

    // ToDo: should reduce restarts if rerendering large sets, or trigger in webhook
    watch: ["dist/server"],

    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      // cwd: 'dist/browser'
    },
    env_production: {
      NODE_ENV: 'production',
      // cwd: ''
    }
  },
  {
      name: 'Dynamic SSR Server',
      script: 'dist/server',
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      //args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
