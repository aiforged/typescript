import { AIForgedConfig, AIForgedHttp } from "./AIForgedConfig";
import { SystemClient, AccountClient, ProjectClient, DocumentClient, ServicesClient, ParametersClient, UsageType, SortField, SortDirection } from "./AIForgedSDK";
console.log("Start");
var serverUrl = "https://portal.aiforged.com";
//get this API Key from aiforged front end at User Profile \ Sign-in Options \ API Keys
var apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ2NzkyOWU4LTI5YjAtNGE3ZS1hY2IwLWM4NWE2MGE2NjJjYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ2b2RhY29tIiwibmJmIjoxNjUxNzUwOTIyLCJleHAiOjE2ODMyODY5MjIsImlzcyI6ImFpZm9yZ2VkIGFwaWtleSIsImF1ZCI6ImFpZm9yZ2VkIn0.JGbUlnuPfEdUGodv-AzwhcptgHXfxYE0XE3OUGWQziM";
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
            try {
                console.log(`      Document ${doc.id} ${doc.filename} uploaded on ${doc.dtc}`);
                var extract = await parclnt.extract(doc.id, null);
                extract?.forEach(e => {
                    console.log(`         Field: ${e.name} Value: ${e.value}`);
                });
            }
            catch (ex) {
                console.log(ex, `         Error Getting Document ${doc.id} ${doc.filename}`);
            }
        });
        await Promise.all(docspromises);
    });
    await Promise.all(servicespromises);
});
await Promise.all(projectpromises);
console.log("Done");
//# sourceMappingURL=index.js.map