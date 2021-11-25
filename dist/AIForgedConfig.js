import * as xxx from 'node-fetch';
export class AIForgedConfig {
    constructor(url) {
        this.Url = url;
    }
    setAuthToken(token) {
        this._authToken = token;
    }
    getAuthorization() {
        return `${this._authToken}`;
        //return `Bearer ${this._authToken}`;
    }
    ;
}
export class AIForgedHttp {
    fetch(url, init) {
        return xxx.default(url, init);
    }
}
//# sourceMappingURL=AIForgedConfig.js.map