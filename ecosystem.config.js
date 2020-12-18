module.exports = {
    apps : [{
      name: 'API Prasmul',
      script: 'index.js',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'API Prasmul',
      instances: '2',
      exec_mode : 'cluster',
      autorestart: true,
      watch: false,
      kill_timeout : 3000,
      listen_timeout : 3000,
      ignore_watch : ["upload", "upload/files", ".git", "node_modules", "tools/db/sqlite/marketing.db"],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
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
