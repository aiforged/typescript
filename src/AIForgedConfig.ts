
import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';

const importDynamic = new Function('modulePath', 'return import(modulePath)');
const module = await importDynamic('node-fetch');

export interface IAIForgedConfig {
    Url : string;
    getAuthorization(): string|undefined;
}

export class AIForgedConfig implements IAIForgedConfig {
    public Url : string;
    private _authToken? : string;

    constructor(url: string) {
        this.Url = url;
    }

    public setAuthToken(token: string) {
        this._authToken = token;
    }

    public getAuthorization(): string {
        return `${this._authToken}`;
        //return `Bearer ${this._authToken}`;
    };

}

export class AIForgedHttp
{    
    fetch = async (...args:any[]) => {        
        return module.default(...args);
    };
}