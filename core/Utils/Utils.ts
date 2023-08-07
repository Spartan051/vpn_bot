import {log} from "console-log-colors";
import {TimeEnum} from "../Enums";

export class Utils {
    public static sleep(second: number, reason?: string): Promise<Function> {
        log.yellow(`Sleep: ${second}s ${reason ?? ""}`);
        return new Promise((resolve) => setTimeout(resolve, second * 1000));
    }

    public static randomNumber(min: number, max: number): number {
        return Math.floor((Math.random()) * (max - min)) + min;
    }

    public static getTimestamp(type: TimeEnum): number {
        switch (type) {
            case TimeEnum.MILLISECOND:
                return Math.floor(Date.now());
            case TimeEnum.SECOND:
                return Math.floor(Date.now() / 1000);
            case TimeEnum.MINUTE:
                return Math.floor(Date.now() / 1000 / 60);
            case TimeEnum.HOUR:
                return Math.floor(Date.now() / 1000 / 60 / 60);
            case TimeEnum.DAY:
                return Math.floor(Date.now() / 1000 / 60 / 60 / 24);
        }
    }

    public static timeDifference(
        startDate: Date,
        endDate: Date,
        type: TimeEnum
    ): number {
        const baseDifference = Math.floor(endDate.getTime() - startDate.getTime());
        switch (type) {
            case TimeEnum.MILLISECOND:
                return Math.abs(baseDifference);
            case TimeEnum.SECOND:
                return Math.abs(Math.floor(baseDifference / 1000));
            case TimeEnum.MINUTE:
                return Math.abs(Math.floor(baseDifference / 1000 / 60));
            case TimeEnum.HOUR:
                return Math.abs(Math.floor(baseDifference / 1000 / 60 / 60));
            case TimeEnum.DAY:
                return Math.abs(Math.floor(baseDifference / 1000 / 60 / 60 / 24));
        }
    }

    public static async retry(
        func: Function,
        retryCount: number
    ): Promise<boolean> {
        for (let i = 1; i <= retryCount; i++) {
            try {
                await func();
                return true;
            } catch (error: unknown) {
                log.red(`ERR: ${error}`);
                log.yellow(`retry time: ${i}`);
            }
        }
        return false;
    }

    public static writeFileErrorHandler(err: NodeJS.ErrnoException | null) {
        err &&
        log.red(`error on write to file\n${err}`);
    }
}
