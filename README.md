# Streamline Your NestJS Development with `smh-nestjs-templates`

## Introduction
Building scalable and efficient backend applications is essential in modern software development. NestJS, a progressive Node.js framework, is a powerful choice for developers, but setting up a project with MongoDB, BullMQ, and Kafka can be tedious. That's where `smh-nestjs-templates` comes in! This CLI tool simplifies project scaffolding, so you can focus on coding rather than setup.

## Why Use `smh-nestjs-templates`?

With `smh-nestjs-templates`, you get:
- 📌 A variety of NestJS templates with pre-configured setups.
- 🚀 Automatically structured project organization.
- 📦 Immediate dependency installation after project creation.
- ✅ Automatic environment checks for required Node.js and npm versions.
- 🛠️ **Project essentials**:
  - **Structured project layout** with best practices.
  - **Environment-based logging** for efficient debugging.
  - **ESLint & Prettier** setup for consistent code quality.
  - **PM2 configuration** for process management.
  - **Docker Compose** for quick containerized deployment.
  - **Optimized TypeScript configuration** for performance and maintainability.
  - **Parcel bundler** for optimized and efficient builds.
  - **Bytenode for JavaScript code protection**, ensuring better security in production.

## Getting Started

### Installation
To install `smh-nestjs-templates` globally, run:
```sh
npm install -g smh-nestjs-templates
```

### Creating a New Project
Once installed, simply run:
```sh
smh-nestjs-templates
```
You'll be prompted to choose a template and provide a project name. The default name will match the selected template, but you can customize it if needed.

## System Requirements
- **🔹 Node.js >= 22.14.0**
- **🔹 npm >= 11.1.0**

The CLI checks these requirements automatically before proceeding to ensure a smooth experience.

## Available Templates
This CLI provides a range of NestJS templates that integrate MongoDB, BullMQ, and Kafka. Each template includes structured logging, linting, and deployment configurations:

- `nestjs-bullmq-kafka`: Uses BullMQ for job processing and Kafka for event-driven workflows.
- `nestjs-bullmq-mongo`: A combination of MongoDB and BullMQ for scalable task management.
- `nestjs-bullmq-worker`: A specialized template focusing on message queuing and background processing.
- `nestjs-microservices-kafka`: A microservices-oriented template with Kafka as the messaging broker.
- `nestjs-mongo-bullmq-kafka`: A full-stack backend template with MongoDB, BullMQ for job queues, and Kafka for event-driven architecture.
- `nestjs-mongo-database`: A MongoDB-centric template for database-driven applications.

## Security Features
- **Bytenode integration** ensures your JavaScript source code is compiled into bytecode, making it difficult to reverse-engineer.
- **Environment-based secrets management** ensures sensitive credentials are not hardcoded in the repository.
- **Strict ESLint rules** help maintain security best practices by detecting potential vulnerabilities in the code.

## Example Usage
Here's what an interactive session with `smh-nestjs-templates` looks like:
```sh
? What project template would you like to generate? (Use arrow keys)
> nestjs-mongo-bullmq-kafka
  nestjs-bullmq-kafka
  nestjs-bullmq-mongo

? Project name: (nestjs-mongo-bullmq-kafka)  <-- User can press Enter or customize
✅ Project 'nestjs-mongo-bullmq-kafka' created successfully!
📦 Installing dependencies...
✅ Dependencies installed successfully.
📌 Next steps:
  cd nestjs-mongo-bullmq-kafka
  npm start
```

## Conclusion
`smh-nestjs-templates` is a powerful CLI tool that removes the hassle of setting up NestJS projects with MongoDB, BullMQ, and Kafka. Whether you're building a microservices-based application or a background job processing system, these templates provide a solid foundation to get started quickly.

With built-in **logging, ESLint, Prettier, PM2, Docker Compose, Parcel, Bytenode, and an optimized TypeScript configuration**, these templates ensure a production-ready setup from day one.

Give it a try and let us know how it works for you! 🚀

## License
📝 This project is licensed under the **Apache License 2.0**.

