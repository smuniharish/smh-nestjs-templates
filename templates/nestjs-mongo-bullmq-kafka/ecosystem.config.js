module.exports = {
  apps: [
    {
      name: 'test_dev',
      script: './dist/main.js',
      autorestart: true,
      exec_mode:'cluster',
      instances: "max",
      watch: false,
      max_memory_restart: '10G',
      max_restarts:5,
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'test_stag',
      script: './dist/main.js',
      autorestart: true,
      exec_mode:'cluster',
      instances: "max",
      watch: false,
      max_memory_restart: '10G',
      max_restarts:5,
      env: {
        NODE_ENV: 'staging',
      },
    },
    {
      name: 'test_prod',
      script: './dist/main.js',
      autorestart: true,
      exec_mode:'cluster',
      instances: "max",
      watch: false,
      max_memory_restart: '10G',
      max_restarts:5,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
