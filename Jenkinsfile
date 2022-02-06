pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'make test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh "ssh -p 33 -i /home/user/jenkins/.ssh/ubudocker user@albertliang.xyz 'cd /home/user/foostar/foostar_website/wordfoo;git pull;make prod'"
            }
        }
    }
    post {
      always {
        junit '**/*.xml'
      }
      failure {
        emailext (
          to: '$DEFAULT_RECIPIENTS',
          subject: '$DEFAULT_SUBJECT',
          body: '$DEFAULT_CONTENT'
        )
      }
      unstable {
        emailext (
          to: '$DEFAULT_RECIPIENTS',
          subject: '$DEFAULT_SUBJECT',
          body: '$DEFAULT_CONTENT'
        )
      }
    }
}