import {createInterface, Interface} from 'readline';

export function question(query: string, callback: (answer: string) => void): void {
  const readLine = getReadLine();
  readLine.question(query, answer => {
    callback(answer);
    readLine.close();
  })
}

function getReadLine(): Interface {
  return createInterface({
    input: process.stdin,
    output: process.stdout
  });
}
