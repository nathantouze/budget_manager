import { Channels } from 'main/preload';

declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                getConfig: () => Promise<string>;
                saveConfig: (config: any) => Promise<any>;
            };
        };
    }
}

export {};
