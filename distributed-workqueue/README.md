# Distributed Work Queue with TypeScript and RabbitMQ

This project demonstrates a distributed work queue implementation using RabbitMQ and TypeScript.

## Project Structure

- `producer.ts` - Generates and sends tasks to the queue
- `consumer.ts` - Consumes and processes tasks from the queue
- `package.json` - Project configuration and dependencies
- `tsconfig.json` - TypeScript configuration
- `Dockerfile` - Docker configuration for containerization

## Types

### Task Interface
```typescript
interface Task {
  id: number;
  complexity: number; // 1-5, affects processing time
}
```

## Features

- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Durable Queues**: Tasks persist even if RabbitMQ restarts
- **Manual Acknowledgment**: Ensures tasks are not lost if a worker crashes
- **Prefetch Limit**: Each consumer processes one task at a time
- **Auto-reconnection**: Automatically reconnects if connection is lost
- **Environment Configuration**: Configurable RabbitMQ URL and worker names

## Installation

```bash
npm install
```

## Development

### Build the project
```bash
npm run build
```

### Run in development mode
```bash
# Start producer (sends tasks)
npm run dev:producer

# Start consumer (processes tasks)
npm run dev:consumer
```

### Run compiled version
```bash
# Start producer
npm run start:producer

# Start consumer
npm run start:consumer
```

## Environment Variables

- `RABBITMQ_URL`: RabbitMQ connection URL (default: "amqp://localhost")
- `WORKER_NAME`: Name for the worker instance (default: "worker")
- `HOSTNAME`: Alternative worker name source

## Usage

1. Start RabbitMQ server
2. Run the producer to send tasks: `npm run dev:producer`
3. Run one or more consumers to process tasks: `npm run dev:consumer`

The producer will send 10 tasks with varying complexity (1-5 seconds processing time), and consumers will process them with proper acknowledgment handling.

## Docker Usage

The included Dockerfile can be used to containerize the application. Build and run with your preferred container orchestration tool.