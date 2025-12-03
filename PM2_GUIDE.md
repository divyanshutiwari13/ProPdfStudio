# PM2 Deployment Guide

This guide explains how to run ProPDF Studio using PM2 process manager.

## Prerequisites

1. Install PM2 globally:
```bash
npm install -g pm2
```

2. Build the application for production:
```bash
npm run build
```

3. Make sure MongoDB is running and accessible.

4. Set up your environment variables in `.env.local` or `.env.production`.

## PM2 Commands

### Start the application

```bash
# Start with production environment
pm2 start ecosystem.config.js --env production

# Or simply (uses default env)
pm2 start ecosystem.config.js
```

### Stop the application

```bash
pm2 stop propdf-studio
```

### Restart the application

```bash
pm2 restart propdf-studio
```

### Reload the application (zero-downtime)

```bash
pm2 reload propdf-studio
```

### Delete the application from PM2

```bash
pm2 delete propdf-studio
```

### View application status

```bash
pm2 status
```

### View logs

```bash
# View all logs
pm2 logs propdf-studio

# View only error logs
pm2 logs propdf-studio --err

# View only output logs
pm2 logs propdf-studio --out

# View logs with lines limit
pm2 logs propdf-studio --lines 100
```

### Monitor application

```bash
pm2 monit
```

## Auto-start on System Reboot

### For Linux (systemd)

```bash
# Generate startup script
pm2 startup systemd

# Save current PM2 process list
pm2 save
```

### For macOS

```bash
# Generate startup script
pm2 startup

# Save current PM2 process list
pm2 save
```

## Environment Variables

Make sure to set up your environment variables before starting PM2:

1. Create `.env.production` file:
```env
MONGODB_URI=mongodb://localhost:27017/propdf-studio
NEXT_PUBLIC_APP_URL=http://your-domain.com
MAX_UPLOAD_SIZE=104857600
ALLOWED_PDF_TYPES=application/pdf
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp
SESSION_SECRET=your-secret-key-here-change-in-production
NODE_ENV=production
```

2. Or load from a specific file:
```bash
pm2 start ecosystem.config.js --env production --update-env
```

## Logs Location

Logs are stored in the `./logs/` directory:
- `pm2-error.log` - Error logs
- `pm2-out.log` - Output logs
- `pm2-combined.log` - Combined logs

## Useful PM2 Commands

```bash
# Show detailed information
pm2 show propdf-studio

# Flush all logs
pm2 flush

# Update PM2
pm2 update

# List all processes
pm2 list

# Stop all processes
pm2 stop all

# Restart all processes
pm2 restart all

# Delete all processes
pm2 delete all
```

## Troubleshooting

### Application won't start

1. Check if the build was successful:
```bash
npm run build
```

2. Check PM2 logs:
```bash
pm2 logs propdf-studio --lines 50
```

3. Verify environment variables are set correctly.

4. Check if MongoDB is running and accessible.

### Application crashes frequently

1. Check memory usage:
```bash
pm2 monit
```

2. Increase memory limit in `ecosystem.config.js`:
```javascript
max_memory_restart: "2G", // Increase from 1G
```

3. Check application logs for errors.

### Port already in use

If port 3000 is already in use, change it in `ecosystem.config.js`:
```javascript
env_production: {
  NODE_ENV: "production",
  PORT: 3001, // Change port
}
```

## Production Checklist

- [ ] Build the application (`npm run build`)
- [ ] Set up environment variables
- [ ] Verify MongoDB is running
- [ ] Start application with PM2
- [ ] Set up PM2 to start on system reboot
- [ ] Configure reverse proxy (nginx/Apache) if needed
- [ ] Set up SSL certificate if using HTTPS
- [ ] Monitor logs regularly
- [ ] Set up log rotation if needed

## Log Rotation

To set up log rotation, install pm2-logrotate:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

