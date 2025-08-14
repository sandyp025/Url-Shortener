# ---------- Build stage ----------
FROM eclipse-temurin:24-jdk AS build
WORKDIR /app

# Copy Maven Wrapper and POM so dependencies can be resolved first
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml ./

# Make wrapper executable and warm the dependency cache
RUN chmod +x mvnw && ./mvnw -q dependency:go-offline

# Copy source code and build
COPY src ./src
RUN ./mvnw -q clean package -DskipTests

# ---------- Runtime stage ----------
FROM eclipse-temurin:24-jre
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Optional JVM flags
ENV JAVA_OPTS=""

# Start the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
