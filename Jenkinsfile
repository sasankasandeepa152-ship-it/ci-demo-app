pipeline {
    agent any

    environment {
        NOTIFY_EMAIL = ''
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'node --version'
                bat 'npm --version'
                bat 'npm install'
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'index.html, app.js',
                                 fingerprint: true
            }
        }
    }

    post {
        always {
            script {
                if (env.NOTIFY_EMAIL?.trim()) {
                    try {
                        mail(
                            to: env.NOTIFY_EMAIL,
                            subject: "Jenkins ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                            body: "Build result: ${currentBuild.currentResult}\nJob: ${env.JOB_NAME}\nBuild number: ${env.BUILD_NUMBER}\nBuild URL: ${env.BUILD_URL}"
                        )
                    } catch (err) {
                        echo 'Email failed. Check the Jenkins Mailer and SMTP settings.'
                    }
                } else {
                    echo 'Email notification skipped: NOTIFY_EMAIL is empty.'
                }
            }
        }
    }
}