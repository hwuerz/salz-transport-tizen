import {LocationService} from "./LocationService";

declare var tau:any; // From Tizen SDK
declare var webapis:any; // From Tizen SDK

import {Helper} from "../Helper";
import {LiteEvent} from "../event/LiteEvent";

export class CompanionService {

    private static channelId: number = 104;

    private static SAAgent: any = null;
    private static SASocket: any = null;
    private static ProviderAppName: string = "SalzTransportProvider";

    private static readonly onConnect = new LiteEvent<void>();
    public static get connectEvent() { return CompanionService.onConnect.expose(); }

    private static readonly onDisconnect = new LiteEvent<void>();
    public static get disconnectEvent() { return CompanionService.onDisconnect.expose(); }

    static createHTML(log_string: string) {
        Helper.showPopUp(log_string);
    }

    static onerror(err: any) {
        console.log("err [" + err + "]");
        Helper.showPopUp("err [" + err + "]");
    }

    private static agentCallback = {
        onconnect : function(socket: any) {
            CompanionService.SASocket = socket;
            // CompanionService.createHTML("HelloAccessory Connection established with RemotePeer");

            CompanionService.onConnect.trigger();

            CompanionService.SASocket.setSocketStatusListener(function(reason: any){
                console.log("Service connection lost, Reason : [" + reason + "]");
                CompanionService.disconnect();
            });
            CompanionService.SASocket.setDataReceiveListener(CompanionService.onreceive);
        },
        onerror : onerror
    };

    private static peerAgentFindCallback = {
        onpeeragentfound : function(peerAgent: any) {
            try {
                if (peerAgent.appName == CompanionService.ProviderAppName) {
                    CompanionService.SAAgent.setServiceConnectionListener(CompanionService.agentCallback);
                    CompanionService.SAAgent.requestServiceConnection(peerAgent);
                } else {
                    CompanionService.createHTML("Not expected app!! : " + peerAgent.appName);
                }
            } catch(err) {
                console.log("exception [" + err.name + "] msg[" + err.message + "]");
                Helper.showPopUp("exception [" + err.name + "] msg[" + err.message + "]");
            }
        },
        onerror : onerror
    };

    static onsuccess(agents: any) {
        try {
            if (agents.length > 0) {
                CompanionService.SAAgent = agents[0];

                CompanionService.SAAgent.setPeerAgentFindListener(CompanionService.peerAgentFindCallback);
                CompanionService.SAAgent.findPeerAgents();
            } else {
                CompanionService.createHTML("Not found SAAgent!!");
                Helper.showPopUp("Not found SAAgent!!");
            }
        } catch(err) {
            console.log("exception [" + err.name + "] msg[" + err.message + "]");
            Helper.showPopUp(err.name + "msg: " + err.message);
        }
    }

    static connect() {
        // CompanionService.createHTML('I will connect now!');
        if (CompanionService.SASocket) {
            CompanionService.createHTML('Already connected!');
            CompanionService.onConnect.trigger();
            return false;
        }
        try {
            webapis.sa.requestSAAgent(CompanionService.onsuccess, function (err: any) {
                console.log("err [" + err.name + "] msg[" + err.message + "]");
                Helper.showPopUp(err.name + "msg: " + err.message);
            });
        } catch(err) {
            console.log("exception [" + err.name + "] msg[" + err.message + "]");
            Helper.showPopUp(err.name + "msg: " + err.message);
        }
    }

    static disconnect() {
        try {
            if (CompanionService.SASocket != null) {
                CompanionService.SASocket.close();
                CompanionService.SASocket = null;
                CompanionService.createHTML("closeConnection");
                CompanionService.onDisconnect.trigger();
            }
        } catch(err) {
            console.log("exception [" + err.name + "] msg[" + err.message + "]");
        }
    }

    static onreceive(channelId: any, response: string) {
        try {
            // Helper.showPopUp("got location", 1000);
            const json = JSON.parse(response);
            const type = json.type;
            const data = json.data;
            if (CompanionService.listener[type]) {
                // Helper.showPopUp("Call listener for type " + type, 1000);
                CompanionService.listener[type](data);
            } else {
                Helper.showPopUp("Unhandled message of type " + type, 1000);
            }
        } catch (e) {
            Helper.showPopUp("onreceive failed <br>" + e, 3000);
            setTimeout(() => {
                Helper.showPopUp(response);
            }, 2000)
        }
    }

    static listener: any = {};
    static onMessage(key: string, callback: Function) {
        CompanionService.listener[key] = callback
    }

    static send(type: string, data: string = "") {
        try {
            if (CompanionService.SASocket == null) {
                Helper.showPopUp("No Phone connection.");
                return;
            }
            const request = JSON.stringify({type: type, data: data});
            CompanionService.SASocket.sendData(CompanionService.channelId, request);
        } catch(err) {
            console.log("exception [" + err.name + "] msg[" + err.message + "]");
            Helper.showPopUp("exception [" + err.name + "] msg[" + err.message + "]");
        }
    }
}