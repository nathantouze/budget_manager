import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        getConfig: () => ipcRenderer.invoke('get-config'),
        saveConfig: (config: any) => ipcRenderer.invoke('save-config', config),
    },
});
