module.exports = {
  apps: [
    {
      name: 'app',
      script: 'node_modules/next/dist/bin/next',
      cwd: './',
      args: 'start',
      instances: 1,
      exec_mode: 'cluster',
      watch: ['next.config.js', 'package.json', 'pages', 'lib'],
      watch_delay: 1000,
    },
  ],
};
