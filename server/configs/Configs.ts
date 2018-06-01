import { loggingConfig, LoggingConfig } from "./loggingConfig";

class Configs {

    private _loggingConfig: LoggingConfig;

    constructor() {
        this._loggingConfig = loggingConfig;
    }

    getLoggingConfig(): LoggingConfig {
        return this._loggingConfig;
    }
}

export const configs = new Configs();