pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPO = '497086312619.dkr.ecr.us-east-1.amazonaws.com/react-cicd-app'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Check Docker') {
             steps {
              sh 'docker --version'
            }
        }

        stage('Check AWS CLI') {
            steps {
              sh 'aws --version'
             }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t react-app .'
            }
        }

        stage('Login to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-creds',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh '''
                    aws ecr get-login-password --region $AWS_REGION \
                    | docker login --username AWS --password-stdin $ECR_REPO
                    '''
                }
            }
        }

        stage('Push to ECR') {
            steps {
                sh '''
                docker tag react-app:latest $ECR_REPO:latest
                docker push $ECR_REPO:latest
                '''
            }
        }
    }
}