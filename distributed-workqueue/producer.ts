#!/usr/bin/env node
import * as amqp from 'amqplib/callback_api';
import { Connection, Channel } from 'amqplib/callback_api';

// Type definitions
interface Task {
  id: number;
  complexity: number;
}

const url: string = process.env.RABBITMQ_URL || "amqp://localhost";
const queue: string = "tareas_distribuidas";

// Generamos 10 tareas con complejidades 1..5 (ciclo)
const tasks: Task[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  complexity: (i % 5) + 1,
}));

amqp.connect(url, (err: Error | null, conn: Connection) => {
  if (err) {
    console.error("Connect error:", err.message || err);
    process.exit(1);
  }
  
  conn.createChannel((err: Error | null, ch: Channel) => {
    if (err) throw err;
    
    ch.assertQueue(queue, { durable: true });

    tasks.forEach((task: Task) => {
      const payload: string = JSON.stringify(task);
      ch.sendToQueue(queue, Buffer.from(payload), { persistent: true });
      console.log(`[x] Sent task ${task.id} (complexity=${task.complexity})`);
    });

    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 500);
  });
});