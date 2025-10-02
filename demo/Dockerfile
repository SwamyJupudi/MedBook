# Stage 1: Build the application (using a multi-stage build for a smaller final image)
# Use a JDK image that includes Gradle/Maven for the build process
FROM eclipse-temurin:17-jdk-focal AS build
WORKDIR /app

# Copy only the files needed for the Gradle build cache first
COPY gradlew settings.gradle build.gradle ./
COPY gradle/ ./gradle

RUN chmod +x ./gradlew
# Download dependencies (skip tests and daemon for a reliable build)
RUN ./gradlew dependencies --no-daemon

# Copy the rest of the source code
COPY src ./src

# Build the executable JAR (output is typically in build/libs)
RUN ./gradlew bootJar --no-daemon

# -------------------------------------------------------------------
# Stage 2: Create the final lean image (just the JRE to run the app)
FROM eclipse-temurin:17-jre-alpine
# Expose the default Spring Boot port
EXPOSE 8080
# Set the application directory
WORKDIR /app
# Copy the built JAR from the first stage
COPY --from=build /app/build/libs/*.jar app.jar
# Set the entry point to run the JAR
ENTRYPOINT ["java", "-jar", "/app.jar"]