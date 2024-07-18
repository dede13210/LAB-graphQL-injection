# Use the official MongoDB image from the Docker Hub
FROM mongo:latest

# Set the MongoDB data directory
RUN mkdir -p /data/db

# Expose the MongoDB port
EXPOSE 27017

# Command to run MongoDB
CMD ["mongod"]
