//https://github.com/RicoSuter/NSwag/issues/3383
export class AIForgedBase {
    _configuration;
    constructor(configuration) {
        this._configuration = configuration;
    }
    getBaseUrl(constUrl, baseUrl) {
        return baseUrl ?? this._configuration.Url ?? constUrl;
    }
    transformOptions(options) {
        //console.log("HTTP call, options: " + JSON.stringify(options));
        options.headers = {
            ...options.headers,
            "X-API-KEY": this._configuration.getAuthorization()
            //Authorization: this._configuration.getAuthorization(),
        };
        return Promise.resolve(options);
    }
    transformResult(url, response, processor) {
        // TODO: Return own result or throw exception to change default processing behavior, 
        // or call processor function to run the default processing logic
        //console.log("Service call: " + url);
        return processor(response);
    }
}
//# sourceMappingURL=AIForgedBase.js.map