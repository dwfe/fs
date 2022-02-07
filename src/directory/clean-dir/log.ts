import {logAction, logErr} from '@do-while-for-each/log-node';

const title = 'Clean dir:';

export function err(message: string, showLog?: boolean): void {
  showLog && logErr(title, message);
}

export function action(message: string, showLog?: boolean): void {
  showLog && logAction(message);
}
