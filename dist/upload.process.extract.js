import { AIForgedConfig, AIForgedHttp } from "./AIForgedConfig";
import { SystemClient, AccountClient, ProjectClient, DocumentClient, ServicesClient, ParametersClient, UsageType, DocumentStatus } from "./AIForgedSDK";
import Enumerable from 'linq';
console.log("Start");
var serverUrl = "https://portal.aiforged.com";
//get this API Key from aiforged front end at User Profile \ Sign-in Options \ API Keys
var apikey = "";
var http = new AIForgedHttp();
var config = new AIForgedConfig(serverUrl);
config.setAuthToken(apikey);
var sysclnt = new SystemClient(config, undefined, http);
var accclnt = new AccountClient(config, undefined, http);
var prjclnt = new ProjectClient(config, undefined, http);
var svcclnt = new ServicesClient(config, undefined, http);
var parclnt = new ParametersClient(config, undefined, http);
var docclnt = new DocumentClient(config, undefined, http);
var projectId = 80;
var serviceId = 42784;
var user = await accclnt.getCurrentUser(null);
console.log(`Hi ${user.fullName}, welcome to AIForged`);
var projects = await prjclnt.getByUser(user.id, null);
console.log(`You have ${projects.length} projects`);
var project = Enumerable
    .from(projects)
    .where(p => p.id == projectId)
    .orderByDescending(p => p.id)
    .first();
console.log(`First project ${project.id} ${project.name}`);
var services = await prjclnt.getServices(user.id, project.id, null, null, null);
console.log(`You have ${services.length} services linked to project ${project.name}`);
var service = Enumerable
    .from(services)
    .first(s => s.id == serviceId);
var filedata = [
    { "filename1": "data" },
    { "filename2": "data" },
];
var uploadeddocs = await docclnt.upload(service.id, user.id, project.id, null, DocumentStatus.Received, UsageType.Inbox, null, null, null, null, null, null, undefined, null, filedata);
var uploadeddocids = Enumerable
    .from(uploadeddocs)
    .select(d => d.id)
    .toArray();
var processedresults = await svcclnt.process(user.id, project.id, service.id, uploadeddocids, false, false, false, false, false, false, null, false, null);
processedresults.forEach(r => {
});
console.log("Done");
//# sourceMappingURL=upload.process.extract.js.map