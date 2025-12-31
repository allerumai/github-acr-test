const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Azure Container Registry!',
    description: 'This is a sample Node.js application deployed via GitHub Actions to Azure Container Registry and running in Azure Container Apps.',
    features: [
      'Built with Express.js',
      'Containerized with Docker',
      'Deployed via GitHub Actions CI/CD',
      'Authenticated using OIDC Federated Identity',
      'Hosted on Azure Container Apps'
    ],
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

