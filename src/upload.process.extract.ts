
import {AIForgedConfig, AIForgedHttp} from "./AIForgedConfig";
import {SystemClient, AccountClient, ProjectClient, DocumentClient, ServicesClient, ParametersClient, UsageType, SortField, SortDirection, DocumentStatus} from "./AIForgedSDK";
import Enumerable from 'linq'
import { File } from "node-fetch";

console.log("Start")

var serverUrl:string = "https://portal.aiforged.com";
//get this API Key from aiforged front end at User Profile \ Sign-in Options \ API Keys
var apikey:string = "";

var http: AIForgedHttp = new AIForgedHttp();
var config: AIForgedConfig = new AIForgedConfig(serverUrl);
config.setAuthToken(apikey);

var sysclnt: SystemClient = new SystemClient(config, undefined, http );
var accclnt: AccountClient = new AccountClient(config, undefined, http);
var prjclnt: ProjectClient = new ProjectClient(config, undefined, http);
var svcclnt: ServicesClient = new ServicesClient(config, undefined, http);
var parclnt: ParametersClient = new ParametersClient(config, undefined, http);
var docclnt: DocumentClient = new DocumentClient(config, undefined, http);

var projectId:number = 192;
var serviceId:number = 48072;

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

const mimetype = 'text/plain'
var files: File[] = [ 
    new File([new Uint8Array([ 97, 98, 99 ])], "text1.txt", { type: mimetype }),
    new File([new Uint8Array([ 97, 98, 99 ])], "text1.txt", { type: mimetype }),    
];

var uploadeddocs = await docclnt.upload(service.id,
    user.id,
    project.id,
    null,
    DocumentStatus.Received,
    UsageType.Inbox,
    null,
    null,
    null,
    null,
    null,
    null,
    undefined,
    null,
    files);

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
    false,
    null);

processedresults.forEach(r => 
{
    
});

console.log("Done")