const { exec } = require('child_process');
const pm2 = require('pm2');

pm2.connect((error) => {
  if (error) {
    console.error(error);
    process.exit(2);
  }

  // Start your server command here
  const serverProcess = exec('node index.js');

  serverProcess.stdout.on('data', (data) => {
    console.log(data);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(data);
  });

  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
    pm2.disconnect();
  });
});
