# Jenkins Configuration for MyApp2 MERN Stack

## Overview

Jenkins CI/CD pipeline for automated building, testing, and deployment of the MyApp2 application.

## Prerequisites

- Docker & Docker Compose
- Git
- GitHub repository with webhook enabled
- Jenkins admin access

## Setup Instructions

### 1. Start Jenkins

```bash
docker compose up -d jenkins
```

Jenkins will be available at: `http://localhost:8080`

### 2. Initial Jenkins Setup

1. **Get Initial Admin Password**:
   ```bash
   docker compose exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```

2. **Install Recommended Plugins**:
   - Pipeline
   - GitHub Integration
   - Docker Pipeline
   - NodeJS Plugin

3. **Configure System**:
   - Manage Jenkins → Configure System
   - Add GitHub credentials
   - Configure Docker

### 3. Create Pipeline Job

1. Click "New Item"
2. Enter job name: `myapp2-pipeline`
3. Select "Pipeline"
4. Configure:
   - **Pipeline section**: 
     - Definition: `Pipeline script from SCM`
     - SCM: `Git`
     - Repository URL: `https://github.com/yuvan2op/myapp2.git`
     - Branch: `*/main`
   - **Build Triggers**:
     - GitHub hook trigger for GITScm polling

### 4. GitHub Webhook Setup

1. Go to GitHub repository → Settings → Webhooks
2. Add Webhook:
   - Payload URL: `http://your-jenkins-url:8080/github-webhook/`
   - Content type: `application/json`
   - Events: Push events

## Pipeline Stages

```
1. Checkout      - Clone repository
2. Build Backend - Install deps & build server
3. Build Frontend - Build React app with Vite
4. Test Backend  - Run backend tests
5. Test Frontend - Run frontend tests
6. Build Docker  - Create Docker images
7. Push Docker   - Push to registry (main branch only)
8. Deploy        - Deploy with docker-compose
9. Health Check  - Verify services running
```

## Usage

### Manual Trigger
```bash
# Via Jenkins UI or CLI
curl -X POST http://localhost:8080/job/myapp2-pipeline/build
```

### Automated Trigger
- Push to `main` branch automatically triggers pipeline

## Environment Variables

Configure in Jenkins:
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password
- `DOCKER_REGISTRY` - Docker registry URL

## Build Scripts

### Build
```bash
chmod +x scripts/build.sh
./scripts/build.sh
```

### Test
```bash
chmod +x scripts/test.sh
./scripts/test.sh
```

### Deploy
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## Troubleshooting

### Jenkins won't start
```bash
docker compose logs jenkins
```

### Docker socket permission issue
```bash
sudo usermod -aG docker jenkins
```

### Build fails with npm errors
```bash
# Clear npm cache in Jenkins
docker compose exec jenkins npm cache clean --force
```

## Accessing Logs

```bash
# Jenkins logs
docker compose logs -f jenkins

# Backend logs during build
docker compose logs -f server

# Frontend logs during build
docker compose logs -f client
```

## Security Notes

1. Never commit sensitive credentials to Git
2. Use Jenkins credentials for secrets
3. Enable GitHub token authentication
4. Restrict Jenkins access with firewall rules

## Next Steps

1. Add SonarQube for code quality analysis
2. Add email/Slack notifications
3. Implement automatic rollback on failure
4. Add performance testing
5. Integrate with monitoring tools

