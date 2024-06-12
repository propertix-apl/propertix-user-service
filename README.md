docker build -t user-service:1.0 .
docker run -p 3002:3002 -d user-service:1.0