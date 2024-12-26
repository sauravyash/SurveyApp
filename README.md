# Lead Survey Application

A web-based survey application built with React and TypeScript, featuring two deployment versions and AWS integration.

## Features

- Two survey versions: standard and public
- AWS deployment support
- Built with React 18 and TypeScript
- Material UI and React Spectrum components
- PDF generation capabilities
- Markdown support with GFM (GitHub Flavored Markdown)
- Serverless architecture

## Prerequisites

- Node.js (Latest LTS version recommended)
- Yarn package manager
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
VITE_SURVEY_BACKEND_URL=https://YOUR_ENDPOINT.com
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

## Available Scripts

### Development

- Start development server (standard version):
  ```bash
  yarn start
  ```

- Start development server (public version):
  ```bash
  yarn start:public
  ```

### Building

- Build the application:
  ```bash
  yarn build
  ```

### Linting

- Run ESLint:
  ```bash
  yarn lint
  ```

### Deployment

#### Development Environment
- Deploy public version to dev:
  ```bash
  yarn deploy:public:dev
  ```

#### Production Environment
- Deploy to production:
  ```bash
  yarn deploy:prod
  ```

## Project Structure

The application uses Vite as the build tool and includes the following key dependencies:

- **UI Libraries**:
  - @adobe/react-spectrum
  - @mui/material
  - bulma
  - styled-components

- **Routing**: react-router-dom

- **PDF Generation**: @react-pdf/renderer

- **Markdown Support**: 
  - react-markdown
  - remark-gfm

- **AWS Deployment**:
  - serverless
  - serverless-cloudfront-invalidate
  - serverless-s3-sync

## Development Notes

- The project uses TypeScript for type safety
- ESLint is configured with TypeScript support
- Vite is used as the build tool for faster development experience
- SASS is available for styling
- Environment variables are managed through dotenv

## Deployment Configuration

The application supports multiple deployment environments:

- **Development**: Uses staging mode and dev stage
- **Production**: Uses production mode and prod stage

Both versions utilize AWS CloudFront for content delivery and S3 for static file hosting.

## Version Management

The package uses Yarn's resolution feature to manage dependency versions, specifically:
```json
"resolutions": {
  "styled-components": "^5"
}
```

## Contributing

1. Ensure you have the correct Node.js version installed
2. Install dependencies using `yarn install`
3. Create a new branch for your feature
4. Make your changes
5. Run linting before committing: `yarn lint`
6. Submit a pull request

## License

[Add your license information here]
