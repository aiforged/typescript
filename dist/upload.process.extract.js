import { AIForgedConfig, AIForgedHttp } from "./AIForgedConfig.js";
import { SystemClient, AccountClient, ProjectClient, DocumentClient, ServicesClient, ParametersClient, UsageType, DocumentStatus } from "./AIForgedSDK.js";
import Enumerable from 'linq';
console.log("Start");
var projectId = 80;
var serviceId = 42784;
//var apikey:string = "<get this from aiforged front end>";
var apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjdlNmJmMDk0LWM0OWEtNGVhZC1iZjAyLTFjYTg0YjA0NzFkMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJkZW1vIiwibmJmIjoxNjM3Nzg3NDU1LCJleHAiOjE2NjkzMjM0NTUsImlzcyI6ImFpZm9yZ2VkIGFwaWtleSIsImF1ZCI6ImFpZm9yZ2VkIn0.a3Mg04u9AQO7xgIkFUgHkwwY0akE4bSKqq-KrtCEJpI";
var http = new AIForgedHttp();
var config = new AIForgedConfig("https://dev.aiforged.com");
config.setAuthToken(apikey);
var sysclnt = new SystemClient(config, undefined, http);
var accclnt = new AccountClient(config, undefined, http);
var prjclnt = new ProjectClient(config, undefined, http);
var svcclnt = new ServicesClient(config, undefined, http);
var parclnt = new ParametersClient(config, undefined, http);
var docclnt = new DocumentClient(config, undefined, http);
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
var uploadeddocs = await docclnt.upload(service.id, user.id, project.id, null, DocumentStatus.Received, UsageType.Inbox, null, null, filedata);
var uploadeddocids = Enumerable
    .from(uploadeddocs)
    .select(d => d.id)
    .toArray();
var processedresults = await svcclnt.process(user.id, project.id, service.id, uploadeddocids, false, false, false, false, false, false, null, null);
processedresults.forEach(r => {
});
console.log("Done");
//# sourceMappingURL=upload.process.extract.js.map