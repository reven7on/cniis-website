# cniis-website

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Deployment to Render

This project is configured for easy deployment to [Render](https://render.com/) using Docker.

### Local Docker Testing

Before deploying to Render, you can test the Docker build locally:

```
# Build the Docker image
docker build -t cniis-website .

# Run the container
docker run -p 8080:80 cniis-website
```

Then visit `http://localhost:8080` in your browser to see the site.

### Deploying to Render

1. Create an account on [Render](https://render.com/) if you don't have one
2. Click on "New +" and select "Web Service"
3. Connect your GitHub/GitLab repository or use "Public Git repository" option
4. Enter your repository URL
5. Configure the service with the following settings:
   - **Name**: cniis-website (or your preferred name)
   - **Environment**: Docker
   - Leave the rest of the settings as default as they will be picked up from the Dockerfile and render.yaml
6. Click "Create Web Service"

Render will automatically build your Docker image and deploy the container. Once complete, you can access it at the URL provided by Render.

### Project Structure for Deployment

- **Dockerfile**: Defines the multi-stage build process
- **nginx.conf**: Configures Nginx for serving the SPA
- **render.yaml**: Configuration file for Render
