export const exec = (command: string, value?: string) =>
  document.execCommand(command, false, value);

export const queryCommandValue = (command: string) =>
  document.queryCommandValue(command);
