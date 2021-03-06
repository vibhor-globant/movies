/**
 * Created by pushanmitra on 09/11/15.
 */

import EventEmitter  from "events"
import logger from "./applogger"

export default class ServerBaseController extends EventEmitter {
    constructor(){
        super();
        this._typeName = "ServerBaseController";
        this._colorCodes = {
            red: 31,
            green: 32,
            yellow: 33,
            blue: 34,
            pink: 35,
            sky: 36
        };
    }
    log(){
        /*var caller = this.typeName;
        var args = Array.prototype.slice.call(arguments);
        var time = new Date().toString();
        var message = '[' + caller.toString() + ':{' + time + '}]';
        var colorMessage = this.colorText(message, 'green');
        var finalArgs = [colorMessage + ':'].concat(args);
        console.log.apply(console, finalArgs);*/
        var args = Array.prototype.slice.call(arguments);
        var finaArg = ["{" + this._typeName + "}"].concat(args);
        logger.info.apply(logger, finaArg);

    }
    error_log(){
        var args = Array.prototype.slice.call(arguments);
        var finaArg = ["{" + this._typeName + "}"].concat(args);
        logger.error.apply(logger, finaArg);
    }
    colorText(message, color){
        if (this._colorCodes && this._colorCodes[color]) {
            /*if (this._colorCodes[color]) {
                return '\0o33[0;' + this._colorCodes[color] + 'm' + message + '\0o33[0m';
            } else if (color) {
                return '\0o33[' + color + 'm' + message + '\0o33[0m';
            }*/
            return message;
        } else {
            return message;
        }
    }

    set typeName(name){
        this._typeName = name;
    }
    get typeName () {
        return this._typeName;
    }
}