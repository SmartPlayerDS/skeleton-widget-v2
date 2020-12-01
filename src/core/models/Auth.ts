export class Auth {
    private _token: string
    private _host: string
    private _deviceId: string

    constructor(token: string, host: string, deviceId: string) {
        this._token = token;
        this._host = host;
        this._deviceId = deviceId;
    }
}