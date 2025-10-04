#!/usr/bin/env node
import * as amqp from 'amqplib/callback_api';
import { Connection, Channel, Message } from 'amqplib/callback_api';

// Type definitions
interface Task {
  id: number;
  complexity: number;
}

const url: string = process.env.RABBITMQ_URL || "amqp://localhost";
const queue: string = "tareas_distribuidas";
const workerName: string = process.env.WORKER_NAME || process.env.HOSTNAME || "worker";

function start(): void {
  amqp.connect(url, (err: Error | null, conn: Connection) => {
    if (err) {
      console.error(
        `[${workerName}] connect error: ${err.message || err}. retrying in 5s`
      );
      return setTimeout(start, 5000);
    }
    conn.createChannel((err: Error | null, ch: Channel) => {
      if (err) throw err;

      ch.assertQueue(queue, { durable: true });
      ch.prefetch(1); // limita a una tarea a la vez

      console.log(`[${workerName}] Waiting for tasks in ${queue}...`);

      ch.consume(
        queue,
        (msg: Message | null) => {
          if (!msg) return;
          const task: Task = JSON.parse(msg.content.toString());
          console.log(
            `[${workerName}] Received task ${task.id} (complexity=${task.complexity}) — processing...`
          );

          // Simula procesamiento (1..5 segundos según complejidad)
          const trabajoMs: number = task.complexity * 1000;
          setTimeout(() => {
            console.log(
              `[${workerName}] Done task ${task.id} (took ${task.complexity}s) — acking`
            );
            ch.ack(msg); // ack manual: garantiza que la tarea no se pierde
          }, trabajoMs);
        },
        { noAck: false }
      );
    });

    // manejar cierre accidental de conexión
    conn.on("error", (e: Error) => {
      console.error(`[${workerName}] connection error`, e.message || e);
    });
    conn.on("close", () => {
      console.warn(`[${workerName}] connection closed — restarting in 5s`);
      setTimeout(start, 5000);
    });
  });
}

start();