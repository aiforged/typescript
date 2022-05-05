const importDynamic = new Function('modulePath', 'return import(modulePath)');
const module = await importDynamic('node-fetch');
export class AIForgedConfig {
    Url;
    _authToken;
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
    fetch = async (...args) => {
        return module.default(...args);
    };
}
//# sourceMappingURL=AIForgedConfig.js.map