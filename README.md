# typescript demo
Demo to show how to integrate with AIForged via typescript and node.js

Follow these steps:
1) register on aiforged
2) train an project and service
3) get your api key from aiforged

To run the code
1) change index.ts to use the api key
2) change your project id and service id
3) run with `npm start`

see [Stackoverflow: Cannot find module](https://stackoverflow.com/questions/65384754/error-err-module-not-found-cannot-find-module) for information regarding ERR_MODULE_NOT_FOUND

compile with
npx tsc --traceResolution

run with:
node --experimental-specifier-resolution=node --trace-warnings ./dist/index.js

or combined with
npm start
in index.ts - remember to set apikey:string = "<get this from aiforged front end>"; 

to generate the SDK code from swagger
dotnet tool list --global
dotnet tool update NSwag.ConsoleCore --global
dotnet tool install --global NSwag.ConsoleCore --version 13.13.2
cd nswag
nswag run Portal2TS.nswag
