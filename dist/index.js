import { AIForgedConfig, AIForgedHttp } from "./AIForgedConfig.js";
import { SystemClient, AccountClient, ProjectClient, DocumentClient, ServicesClient, ParametersClient, UsageType, SortField, SortDirection } from "./AIForgedSDK.js";
console.log("Start");
var serverUrl = "https://local.aiforged.com";
//var apikey:string = "<get this from aiforged front end>";
var apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjdlNmJmMDk0LWM0OWEtNGVhZC1iZjAyLTFjYTg0YjA0NzFkMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJkZW1vIiwibmJmIjoxNjM3Nzg3NDU1LCJleHAiOjE2NjkzMjM0NTUsImlzcyI6ImFpZm9yZ2VkIGFwaWtleSIsImF1ZCI6ImFpZm9yZ2VkIn0.a3Mg04u9AQO7xgIkFUgHkwwY0akE4bSKqq-KrtCEJpI";
var http = new AIForgedHttp();
var config = new AIForgedConfig(serverUrl);
config.setAuthToken(apikey);
var sysclnt = new SystemClient(config, undefined, http);
var accclnt = new AccountClient(config, undefined, http);
var prjclnt = new ProjectClient(config, undefined, http);
var svcclnt = new ServicesClient(config, undefined, http);
var parclnt = new ParametersClient(config, undefined, http);
var docclnt = new DocumentClient(config, undefined, http);
var sysdate = await sysclnt.getSystemDate(null);
console.log("AIForged System date is " + sysdate);
var enumdata = await sysclnt.getEnumData(null);
console.log("AIForged Enum Data is " + enumdata.length);
var user = await accclnt.getCurrentUser(null);
console.log(`Hi ${user.fullName}, welcome to AIForged`);
var projects = await prjclnt.getByUser(user.id, null);
console.log(`You have ${projects.length} projects`);
const projectpromises = projects.map(async (project) => {
    console.log(`Project ${project.id} ${project.name}`);
    var services = await prjclnt.getServices(user.id, project.id, null, null, null);
    console.log(`You have ${services.length} services linked to project ${project.name}`);
    const servicespromises = services.map(async (service) => {
        console.log(`   Service ${service.id} ${service.name} created on ${service.dtc}`);
        var docs = await docclnt.getExtended(user.id, project.id, service.id, UsageType.Inbox, null, null, null, null, null, null, null, null, null, 5, //pageSize
        SortField.Date, SortDirection.Descending, null, null, null, null, null, null, null);
        const docspromises = docs.map(async (doc) => {
            console.log(`      Document ${doc.id} ${doc.filename} uploaded on ${doc.dtc}`);
            var extract = await parclnt.extract(doc.id, null);
            extract?.forEach(e => {
                console.log(`         Field: ${e.name} Value: ${e.value}`);
            });
        });
        await Promise.all(docspromises);
    });
    await Promise.all(servicespromises);
});
await Promise.all(projectpromises);
console.log("Done");
//# sourceMappingURL=index.js.map