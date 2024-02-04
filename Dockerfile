FROM openjdk:8-jre-alpine
EXPOSE 8080
ADD todo-server/target/todo-image.jar todo-image.jar
ENTRYPOINT ["java", "-jar", "todo-image.jar"]