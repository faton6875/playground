import EventEmitter from 'events';
import fs from 'fs';

const event = new EventEmitter();
event.on('createPost', (data) => {
  fs.appendFileSync('./logs.txt', JSON.stringify(data) + '\n');
});

export default event;
