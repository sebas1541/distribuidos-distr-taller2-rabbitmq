Evidence Photos for Distributed Work Queue

1. 2workers-containers-running.png
   Command: docker-compose ps
   Shows: Two consumer containers running alongside producer and rabbitmq

2. tasks-workers.png  
   Command: docker-compose logs consumer
   Shows: Multiple workers processing tasks from the queue

3. workers&producer-logs.png
   Command: docker-compose logs
   Shows: Combined logs of producer sending tasks and workers processing them

4. stop-one-worker.png
   Command: docker-compose kill consumer (then docker-compose logs)
   Shows: System continuing to work after one worker is stopped