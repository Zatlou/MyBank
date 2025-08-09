pipeline {
    agent none

    stages {
        stage('Checkout') {
            agent { label 'linux' }
            steps {
                checkout scm
            }
        }

        stage('Install & Test Frontend') {
            agent { label 'linux' }
            steps {
                sh '''
                    echo "=== Installation & Tests Front ==="
                    docker run --rm -v $PWD:/workspace -w /workspace/front node:18 \
                    sh -c "npm install && npm test -- --watchAll=false || true && npm run build"
                '''
            }
        }

        stage('Install & Test API') {
            agent { label 'linux' }
            steps {
                sh '''
                    echo "=== Installation & Tests API ==="
                    docker run --rm -v $PWD:/workspace -w /workspace/api php:8.2-cli \
                    sh -c "curl -sS https://getcomposer.org/installer | php && php composer.phar install && ./vendor/bin/phpunit --configuration phpunit.xml.dist"
                '''
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
