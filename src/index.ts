
import {AIForgedConfig, AIForgedHttp} from "./AIForgedConfig.js";
import {SystemClient, AccountClient, ProjectClient, DocumentClient, ServicesClient, ParametersClient, UsageType, SortField, SortDirection, DocumentStatus} from "./AIForgedSDK.js";
import Enumerable from 'linq'

console.log("Start")

var serverUrl:string = "https://dev.aiforged.com";
var apikey:string = "<get this from aiforged front end>";

var http: AIForgedHttp = new AIForgedHttp();
var config: AIForgedConfig = new AIForgedConfig(serverUrl);
config.setAuthToken(apikey);

var sysclnt: SystemClient = new SystemClient(config, undefined, http );
var accclnt: AccountClient = new AccountClient(config, undefined, http);
var prjclnt: ProjectClient = new ProjectClient(config, undefined, http);
var svcclnt: ServicesClient = new ServicesClient(config, undefined, http);
var parclnt: ParametersClient = new ParametersClient(config, undefined, http);
var docclnt: DocumentClient = new DocumentClient(config, undefined, http);

var sysdate = await sysclnt.getSystemDate(null);
console.log("AIForged System date is " + sysdate)

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

        var docs = await docclnt.getExtended(user.id, 
            project.id,
            service.id,
            UsageType.Inbox,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            5,//pageSize
            SortField.Date,
            SortDirection.Descending,
            null,
            null,
            null,
            null,
            null,
            null,
            null);

        const docspromises = docs.map(async (doc) => {
        
            console.log(`      Document ${doc.id} ${doc.filename} uploaded on ${doc.dtc}`);

            var extract = await parclnt.extract(doc.id, null);
            extract?.forEach(e => 
            {
                console.log(`         Field: ${e.name} Value: ${e.value}`);    
            });            
        });
        await Promise.all(docspromises);  
        
    });

    await Promise.all(servicespromises);  
    
  });

await Promise.all(projectpromises);  


console.log("Done")