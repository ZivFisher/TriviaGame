export { };

type LogLevel = "ERROR" | "INFO" | "SUCCESS";

function log(level: LogLevel) {
    return function (message: string) {
        switch (level) {
            case "ERROR":
                console.log("ERROR: " + message);
                console.log("WARNING! WE SEE AN ERROR!");
                break;
            case "INFO":
                console.log("INFO: " + message);
                break;
            case "SUCCESS":
                console.log("SUCCESS: " + message);
                console.log("YAY!");
                break
        }
    }
}