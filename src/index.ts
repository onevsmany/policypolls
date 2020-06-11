const cluster = require('cluster');
import os from 'os';
//main entry point
const runServer = require('./app');

/**
 * Check if current process is master, Get total CPU cores, Spawn a worker for every core.
 * creating a new process if a worker die
 * 
 */


if (cluster.isMaster) {
    const cpuCount = os.cpus().length;
    for (let j = 0; j < cpuCount; j++) {
      cluster.fork();
    }
  } else {
    // This is not the master process, so we spawn the express server.
    // runServer();
  }
  
  cluster.on('exit', function (worker) {
    console.log(`Worker ${worker.id} died'`);
    console.log(`Staring a new one...`);
    cluster.fork();
  });
