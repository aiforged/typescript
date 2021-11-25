
import * as xxx from 'node-fetch';

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
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
        return xxx.default(<xxx.RequestInfo>url, <xxx.RequestInit>init);
    }
    
}