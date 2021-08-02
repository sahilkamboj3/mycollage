FROM openjdk:11.0-jdk-oracle

RUN mkdir /home/app
# COPY ./target/projects-0.0.1-SNAPSHOT-jar-with-dependencies.jar /home/app
COPY . /home/app

WORKDIR /home/app

# ENTRYPOINT java -jar projects-0.0.1-SNAPSHOT-jar-with-dependencies.jar
ENTRYPOINT ./mvnw spring-boot:run

