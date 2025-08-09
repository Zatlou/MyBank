pipeline {
    agent { label 'linux' } // Ton agent

    options { timestamps(); ansiColor('xterm') }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('API - Install & Test') {
            steps {
                dir('api') {
                    sh 'php -v && composer -V'
                    sh 'composer install --no-interaction --no-progress --prefer-dist'

                    // Création du fichier .env.test si besoin
                    sh 'mkdir -p var && (grep -q "DATABASE_URL" .env.test || echo "DATABASE_URL=sqlite:///%kernel.project_dir%/var/data.db" >> .env.test)'
                    // Exécuter PHPUnit
                    sh './bin/phpunit --log-junit ../api-junit.xml || vendor/bin/phpunit --log-junit ../api-junit.xml'
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'api-junit.xml'
                }
            }
        }

        stage('Front - Install & Test') {
            environment {
                JEST_JUNIT_OUTPUT = 'junit.xml'
            }
            steps {
                dir('front') {
                    sh 'node -v && npm -v'
                    sh 'npm ci || npm install'
                    sh 'npm test -- --watchAll=false --reporters=default --reporters=jest-junit'
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'front/junit.xml'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline réussi'
        }
        failure {
            echo '❌ Pipeline échoué'
        }
        alway
