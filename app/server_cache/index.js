/**
 * Created by pushanmitra on 05/11/15.
 */
import EventEmitter  from "events"
import keyMirror from "keymirror"
import async from "async"
import Q from  "q"
import redisManager from "./redis_manager"
import app_utl from "../app_utl"

class ServerCacheManager extends app_utl.BaseController  {
    /*!
        @constructor
    * */
    constructor(){
        super();
        this.OPERATION_EVENTS = keyMirror({
            STORE_OBJECT_CREATED: null,
            STORE_OBJECT_UPDATE : null,
            STORE_OBJECT_REMOVED: null,
            STORE_OBJECT_OPERATION_ERROR: null
        });
        this.EVENTS = keyMirror({
            STORE_READY : null,
            STORE_CONNECTED: null,
            STORE_DISCONNECTED: null,
            STORE_CONNECTION_ERROR: null
        });

        this.STATE = keyMirror({
            ready : null,
            disconnected: null
        });

        this.state = this.STATE.disconnected;
        this._localDataStorage = {}
    }

    /*!
        connect to the caching system
     */
    connect(){
        var deferred = Q.defer();

        /*async.series([
            function(){
                deferred.resolve();
                this.emit(this.EVENTS.STORE_CONNECTED,{});
            },
            function(){
                this.state = this.STATE.ready;
                this.emit(this.EVENTS.STORE_READY,{});
            }
        ]);*/

        return redisManager.connect(6379,"redis"); // In case for localhost use redisManager.connect(6379,"127.0.0.1")


        //return deferred.promise;
    }

    addKey(key , object, expiry){
        return redisManager.addKey(key, object, expiry);
        /*var deferred = Q.defer();
        this._localDataStorage[key] = object;
        setTimeout(function(){
            async.series([
                function(){
                    deferred.resolve(key);
                },
                function(){
                    this.emit(this.OPERATION_EVENTS.STORE_OBJECT_CREATED,{
                        key : key,
                        value: object
                    });
                }
            ]);
        },0.1);
        return deferred.promise;*/
    }

    updateKey(key , updateObj){
        var deferred = Q.defer();
        this._localDataStorage[key] = updateObj;
        setTimeout(function(){
            async.series([
                function(){
                    deferred.resolve(key);
                },
                function(){
                    this.emit(this.OPERATION_EVENTS.STORE_OBJECT_UPDATE, {
                        key : key,
                        value: object
                    });
                }
            ]);
        },0.1);
        return deferred.promise;
    }

    removeKey(key){
        return redisManager.removeKey(key);
        /*var deferred = Q.defer();
        if (this._localDataStorage[key]){
            this._localDataStorage[key] = null;
            delete this._localDataStorage[key];
            setTimeout(function(){
                async.series([
                    function(){
                        deferred.resolve(key);
                    },
                    function(){
                        this.emit(this.OPERATION_EVENTS.STORE_OBJECT_REMOVED,{
                            key : key
                        });
                    }
                ]);
            },0.1);
        }
        else {
            async.series([
                function(){
                    deferred.reject(new Error("Key not exists:" + key));
                }
            ]);
        }
        return deferred.promise;*/
    }

    getValue (key){
        var obj = redisManager.getValue(key);
        return obj;
        /*setTimeout(function(){
            if (callback){
                var value = this._localDataStorage[key];
                callback(null, value);
            }
        }.bind(this),0.1);*/
    }

}

export default new ServerCacheManager();