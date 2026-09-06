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
                    export CI=true
                    pnpm install --frozen-lockfile
                    pnpm run lint
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
                withCredentials([file(credentialsId: 'prod-portfolio-fe-env', variable: 'ENV_FILE')]) {
                    sh '''
                    echo "Menyiapkan file .env FE dari Jenkins Credentials..."
                    cp "$ENV_FILE" .env

                    echo "Memulai deployment Frontend ke VPS..."
                    docker compose -f docker-compose.yml build --no-cache
                    docker compose -f docker-compose.yml up -d
                    '''
                }
            }
        }
        
        stage('Clean Up') {
            when {
                branch 'master'
            }
            steps {
                sh '''
                docker image prune -f
                rm -f .env
                '''
            }
        }
    }
}