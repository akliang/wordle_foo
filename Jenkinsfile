pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                /* Wishlist:
                - switch vue and tailwind from dev to prod files
                - perform SCSS/LESS compiling
                */
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                dir("./testing") {
                  sh 'USERID=$(id -u) GROUPID=$(id -g) docker-compose up'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'ssh -p 33 -i ~/.ssh/ubudocker user@albertliang.xyz "cd /home/user/foostar/foostar_website/wordfoo; git pull"'
            }
        }
    }
    post {
      always {
        junit '**/*.xml'
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