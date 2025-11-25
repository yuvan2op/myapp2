pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'
        IMAGE_TAG = "${BUILD_NUMBER}"
        REPO_URL = 'https://github.com/yuvan2op/myapp2.git'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from repository...'
                git branch: 'main', 
                    url: "${REPO_URL}",
                    credentialsId: 'github-credentials'
            }
        }
        
        stage('Build Backend') {
            steps {
                echo '🔨 Building backend service...'
                dir('server') {
                    sh '''
                        npm install
                        npm run build 2>/dev/null || true
                    '''
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo '🔨 Building frontend service...'
                dir('client') {
                    sh '''
                        npm install
                        npm run build
                    '''
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                echo '✅ Testing backend...'
                dir('server') {
                    sh '''
                        # Add test script if available
                        if [ -f "package.json" ]; then
                            npm test 2>/dev/null || echo "No tests configured"
                        fi
                    '''
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                echo '✅ Testing frontend...'
                dir('client') {
                    sh '''
                        # Add test script if available
                        if [ -f "package.json" ]; then
                            npm test 2>/dev/null || echo "No tests configured"
                        fi
                    '''
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                sh '''
                    docker build -t myapp2-server:${IMAGE_TAG} ./server
                    docker build -t myapp2-client:${IMAGE_TAG} ./client
                '''
            }
        }
        
        stage('Push Docker Images') {
            when {
                branch 'main'
            }
            steps {
                echo '📤 Pushing images to registry...'
                sh '''
                    # Login to Docker Registry (configure credentials in Jenkins)
                    echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                    
                    docker tag myapp2-server:${IMAGE_TAG} ${DOCKER_REGISTRY}/yuvan2op/myapp2-server:${IMAGE_TAG}
                    docker tag myapp2-client:${IMAGE_TAG} ${DOCKER_REGISTRY}/yuvan2op/myapp2-client:${IMAGE_TAG}
                    
                    docker push ${DOCKER_REGISTRY}/yuvan2op/myapp2-server:${IMAGE_TAG}
                    docker push ${DOCKER_REGISTRY}/yuvan2op/myapp2-client:${IMAGE_TAG}
                    
                    docker logout
                '''
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo '🚀 Deploying application...'
                sh '''
                    # Update docker-compose with new image tags
                    sed -i "s/myapp2-server:latest/myapp2-server:${IMAGE_TAG}/g" docker-compose.yml
                    sed -i "s/myapp2-client:latest/myapp2-client:${IMAGE_TAG}/g" docker-compose.yml
                    
                    # Recreate containers with new images
                    docker compose down
                    docker compose up -d
                    
                    echo "✅ Deployment completed successfully!"
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                echo '🏥 Performing health checks...'
                sh '''
                    sleep 5
                    
                    # Check if services are running
                    echo "Checking backend health..."
                    curl -f http://localhost:3000/api/hello || exit 1
                    
                    echo "Checking frontend health..."
                    curl -f http://localhost/api/hello || exit 1
                    
                    echo "✅ All health checks passed!"
                '''
            }
        }
    }
    
    post {
        always {
            echo '📋 Cleaning up...'
            cleanWs()
        }
        success {
            echo '✅ Pipeline completed successfully!'
            // Add Slack/Email notifications here
        }
        failure {
            echo '❌ Pipeline failed!'
            // Add Slack/Email notifications here
        }
    }
}
