# Stage 1: Build the backend with Maven wrapper
FROM eclipse-temurin:17-jdk-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper files first to leverage Docker caching
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Give execution permission to the Maven wrapper
RUN chmod +x mvnw

# Resolve dependencies offline (improves caching for faster future builds)
RUN ./mvnw dependency:go-offline

# Copy the actual source code
COPY src ./src

# Build the Spring Boot application, skipping tests to speed up deployment
RUN ./mvnw clean package -DskipTests

# Stage 2: Create a minimal lightweight image to run the backend 
FROM eclipse-temurin:17-jre-alpine

# Set the working directory
WORKDIR /app

# Expose port 8080 (which Render uses by default)
EXPOSE 8080

# Copy the packaged jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
