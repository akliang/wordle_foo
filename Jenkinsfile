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
                script {
                  deploy_cmd = '''
                    cd /home/user/foostar/foostar_website/wordfoo;
                    git pull;
                  '''
                  deploy_cmd = deploy_cmd.replaceAll("\\s","")
                }
                echo deploy_cmd
                // sh "ssh -p 33 -i /home/user/jenkins/.ssh/ubudocker user@albertliang.xyz '$deploy_cmd'"
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