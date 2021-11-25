//https://github.com/RicoSuter/NSwag/issues/3383

import {AIForgedConfig} from "./AIForgedConfig";

export interface IAIForgedBase {
    getBaseUrl(constUrl: string, baseUrl?: string) : string;
}

export class AIForgedBase implements IAIForgedBase {
    
    private _configuration: AIForgedConfig;

    constructor(configuration: AIForgedConfig) {
        this._configuration = configuration;
    }

    getBaseUrl(constUrl: string, baseUrl?: string) : string
    {
        return baseUrl ?? this._configuration.Url ?? constUrl;
    }

    protected transformOptions(options: RequestInit) {
        //console.log("HTTP call, options: " + JSON.stringify(options));
        options.headers = {
            ...options.headers,
            "X-API-KEY": this._configuration.getAuthorization()
            //Authorization: this._configuration.getAuthorization(),
          };

        return Promise.resolve(options);
    }

    protected transformResult(url: string, response: Response, processor: (response: Response) => any) {
        // TODO: Return own result or throw exception to change default processing behavior, 
        // or call processor function to run the default processing logic
        //console.log("Service call: " + url);
        return processor(response); 
    }   
}
