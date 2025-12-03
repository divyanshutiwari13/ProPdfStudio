module.exports = {
  apps: [
    {
      name: "propdf-studio",
      script: "npm",
      args: "start",
      cwd: "./",
      instances: 1,
      exec_mode: "fork",
      
      // Environment variables
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_staging: {
        NODE_ENV: "production",
        PORT: 3001,
      },

      // Logging configuration
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_file: "./logs/pm2-combined.log",
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,

      // Auto restart configuration
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",

      // Advanced settings
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 4000,

      // Process management
      kill_timeout: 5000,
      listen_timeout: 10000,
      shutdown_with_message: true,

      // Ignore watch patterns (optional, for development)
      ignore_watch: [
        "node_modules",
        ".next",
        "logs",
        "*.log",
        ".git",
      ],
    },
  ],
};

