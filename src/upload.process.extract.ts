
import {AIForgedConfig, AIForgedHttp} from "./AIForgedConfig.js";
import {SystemClient, AccountClient, ProjectClient, DocumentClient, ServicesClient, ParametersClient, UsageType, SortField, SortDirection, DocumentStatus} from "./AIForgedSDK.js";
import Enumerable from 'linq'

console.log("Start")

var projectId:number = 80;
var serviceId:number = 42784;
var apikey:string = "<get this from aiforged front end>";

var http: AIForgedHttp = new AIForgedHttp();
var config: AIForgedConfig = new AIForgedConfig("https://dev.aiforged.com");
config.setAuthToken(apikey);

var sysclnt: SystemClient = new SystemClient(config, undefined, http );
var accclnt: AccountClient = new AccountClient(config, undefined, http);
var prjclnt: ProjectClient = new ProjectClient(config, undefined, http);
var svcclnt: ServicesClient = new ServicesClient(config, undefined, http);
var parclnt: ParametersClient = new ParametersClient(config, undefined, http);
var docclnt: DocumentClient = new DocumentClient(config, undefined, http);

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

var filedata: any[] = [ 
    {"filename1": "data" },
    {"filename2": "data" },
];

var uploadeddocs = await docclnt.upload(service.id, 
    user.id,
    project.id,
    null,
    DocumentStatus.Received,
    UsageType.Inbox,
    null,
    null,
    filedata);

var uploadeddocids:number[] = Enumerable
    .from(uploadeddocs)
    .select(d => <number>d.id)
    .toArray();

var processedresults = await svcclnt.process(user.id, project.id, service.id, uploadeddocids,
    false,
    false,
    false,
    false,
    false,
    false,
    null,
    null);

processedresults.forEach(r => 
{
    
});

console.log("Done")