import {logErr, logSuccess} from '@do-while-for-each/log-node';

const title = 'Remove:';

export function err(message: string, showLog?: boolean): void {
  showLog && logErr(title, message);
}

export function success(message: string, showLog?: boolean): void {
  showLog && logSuccess(title, message);
}
