pipeline {
    agent { label 'linux' }

    environment {
        // Optionnel : si ton API utilise une URL locale pendant les tests
        REACT_APP_API_URL = "http://localhost:8000"
        NODE_ENV = "test"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Test Frontend') {
            steps {
                dir('front') {
                    sh '''
                        echo "=== Installation Front ==="
                        npm install
                        echo "=== Lancement des tests Front ==="
                        npm test -- --watchAll=false
                    '''
                }
            }
        }

        stage('Install & Test API') {
            steps {
                dir('api') {
                    sh '''
                        echo "=== Installation dépendances API ==="
                        composer install --no-interaction --prefer-dist
                        echo "=== Lancement des tests API ==="
                        ./vendor/bin/phpunit --configuration phpunit.xml.dist
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build et tests réussis !"
        }
        failure {
            echo "❌ Échec du pipeline."
        }
    }
}
