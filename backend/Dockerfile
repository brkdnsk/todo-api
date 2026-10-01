# 1. Java 17 ortamını baz al
FROM eclipse-temurin:17-jdk-alpine

# 2. Çalışma dizinini belirle
WORKDIR /app

# 3. Maven ile derlenen jar dosyasını konteyneere kopyala
COPY target/*.jar app.jar

# 4. Uygulamayı çalıştır
ENTRYPOINT ["java", "-jar", "app.jar"]