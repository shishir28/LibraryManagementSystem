import * as cluster from "cluster";
import * as mkdirp from "mkdirp";
import * as path from "path";
import { configs } from "../configs/configs";
import { transports, Logger } from "winston";


let config = configs.getLoggingConfig();

config.file.filename = `${path.join(config.directory, "../logs")}/${config.file.filename}`;

if (cluster.isMaster) {
    mkdirp.sync(path.join(config.directory, "../logs"));
}

export const logger = new Logger({
    transports: [
        new transports.File(config.file),
        new transports.Console(config.console)
    ],
    exitOnError: false
})