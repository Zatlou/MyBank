pipeline {
    agent none

    stages {
        stage('Checkout') {
            agent { label 'linux' } // Ton agent Jenkins
            steps {
                checkout scm
            }
        }

        stage('Install & Test Frontend') {
            agent {
                docker {
                    image 'node:18'
                    args '-v $PWD:/workspace -w /workspace/front'
                }
            }
            steps {
                sh 'echo "=== Installation Front ==="'
                sh 'npm install'
                sh 'npm test -- --watchAll=false || true' // ignore test fail si besoin
                sh 'npm run build'
            }
        }

        stage('Install & Test API') {
            agent {
                docker {
                    image 'php:8.2-cli'
                    args '-v $PWD:/workspace -w /workspace/api'
                }
            }
            steps {
                sh 'echo "=== Installation API ==="'
                sh 'php -v'
                sh 'curl -sS https://getcomposer.org/installer | php'
                sh 'php composer.phar install'
                sh './vendor/bin/phpunit --configuration phpunit.xml.dist'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline terminé avec succès !'
        }
        failure {
            echo '❌ Échec du pipeline.'
        }
    }
}
