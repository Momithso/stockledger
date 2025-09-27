# Stockledger Backend

## Setup Project

### Install packages
Install all NodeJS packages for the project
```bash
    npm install
```

### Create JWT Key
Create a JWT Key for signing JWT Tokens
```bash
    ssh-keygen -t rsa -b 4096 -m pem -f jwtRS256.key
```

### Environment Variables
Fill out template.env file and save it as .env file

### Start docker Container
Start the docker container with:
```bash
    docker-compose up --build -d                            // detached
    docker-compose up --build                               // complete console view with database and nodejs
    docker-compose up --build --watch backend               // nodejs console view
    docker-compose up --build --watch mongo                 // database console view
```

### Stop docker Container
You can stop the container with this command:
```bash
    docker-compose down
```