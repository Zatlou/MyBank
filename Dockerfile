FROM jenkins/jenkins:lts-jdk17
USER root
RUN groupadd -g 1 docker && usermod -aG docker jenkins
USER jenkins
