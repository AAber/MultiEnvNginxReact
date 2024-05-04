# Multi-Environment React App with NGINX

This project demonstrates how to build a multi-environment React application served by NGINX. It includes a React frontend that fetches environment information from an NGINX server, which dynamically provides the environment based on system variables. This setup allows you to deploy the same React application in different environments (e.g., development, staging, production) with configuration handled by NGINX.

## How to Use

### Prerequisites

- Node.js and npm installed on your local machine
- Docker installed on your local machine

### Running the Application Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/example/MultiEnvNginxReact.git
   ```

2. Navigate to the project directory:

   ```bash
   cd MultiEnvNginxReact
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the React application.

### Building and Running the Docker Image

1. Build the Docker image:

   ```bash
   docker build -t MultiEnvNginxReact .
   ```

2. Run the Docker container:

   ```bash
   docker run -d -p 8080:80 MultiEnvNginxReact
   ```

3. Open your web browser and navigate to [http://localhost:8080](http://localhost:8080) to view the React application served by NGINX.

## Environment Configuration

The NGINX server dynamically provides environment information to the React application via the `/api/environment` endpoint. The NGINX configuration reads the `$ENVIRONMENT` variable from the operating system and includes it in the response header when accessing the endpoint.

To customize the environment configuration, modify the NGINX configuration in the `nginx.conf` file according to your requirements.

