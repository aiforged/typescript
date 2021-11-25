dotnet tool list --global
dotnet tool update NSwag.ConsoleCore --global
dotnet tool install --global NSwag.ConsoleCore - -version 13.13.2
nswag run aiforged.nswag


compile with
tsc --traceResolution

run with:
node ./dist/index.js

or combined with
npm start

in index.ts - remember to set apikey:string = "<get this from aiforged front end>"; 
