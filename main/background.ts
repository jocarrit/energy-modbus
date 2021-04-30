import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import ModbusRTU from 'modbus-serial'

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1044,
    height: 900,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  const client = new ModbusRTU()

  client
    .connectRTUBuffered('/dev/ttyUSB0', { baudRate: 9600 })
    .then(() => {
      console.log('Connected, wait for reading...')
    })
    .catch((e) => {
      console.log(e)
    })

  client.setID(64)
  client.setTimeout(5000)

  setInterval(() => {
    client
      .readInputRegisters(2, 12)
      .then((data) => {
         console.log(`Corriente: ${data.data[3]}ma`)
        mainWindow.webContents.send("current", data.data[3])
      })
      .catch((error) => {
        console.log(error)
      })
  }, 2000)

})();

app.on('window-all-closed', () => {
  app.quit();
});

