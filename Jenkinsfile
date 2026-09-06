pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps { checkout scm }
        }

        // Tahap CI: Install, lint, dan test aplikasi React (menggunakan pnpm sesuai Dockerfile)
        stage('Test & Lint (CI)') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS26') {
                    sh '''
                    npm install -g pnpm
                    pnpm config set allow-scripts true
                    pnpm install --frozen-lockfile
                    pnpm run lint
                    pnpm run test -- --watchAll=false --ci
                    '''
                }
            }
        }

        // Tahap CD: Build production & deploy ke VPS (hanya branch master)
        stage('Deploy Production (CD)') {
            when {
                branch 'master'
            }
            steps {
                sh '''
                echo "Memulai deployment Frontend ke VPS..."
                docker compose -f docker-compose.prod.yml build --no-cache
                docker compose -f docker-compose.prod.yml up -d
                '''
            }
        }
        
        stage('Clean Up') {
            when {
                branch 'master'
            }
            steps {
                sh 'docker image prune -f'
            }
        }
    }
}