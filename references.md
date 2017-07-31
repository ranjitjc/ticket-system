# .netCore

http://asp.net-hacker.rocks/2016/08/08/setup-angular2-typescript-aspnetcore-in-visualstudio.html
https://github.com/JuergenGutsch/angular2-aspnetcore-vs

http://asp.net-hacker.rocks/2016/09/19/aspnetcore-and-angular2-using-dotnetcli-and-vscode.html
https://github.com/JuergenGutsch/angular2-aspnetcore



https://www.syncfusion.com/kb/7062/getting-started-with-angular-2-in-asp-net-core-with-typescript-using-visual-studio-2015

https://github.com/MarkPieszak/aspnetcore-angular2-universal

## https://github.com/FabianGosebrink/ASPNET-Core-Angular2-SignalR-Typescript

https://github.com/FabianGosebrink/ASPNET-Core-Angular2-Workshop/tree/master/end/Client

https://github.com/asadsahi/AspNetCoreSpa

https://github.com/damienbod/Angular2WebpackVisualStudio

https://github.com/fpetru/angular2-aspnetcore-webapi-part1

http://www.ryansouthgate.com/2016/10/19/angular2-aspnet-core-mvc/

http://www.qappdesign.com/getting-started-with-angular2-with-aspnet-core-webapi-build-notebook-app/

https://www.youtube.com/watch?v=OLJvkcfBrKA

http://www.ryadel.com/en/asp-net-core-angular-2-book-valerio-de-sanctis/
https://github.com/PacktPublishing/ASPdotNET-Core-and-Angular-2

http://www.mithunvp.com/building-asp-net-core-mvc-angular2-visual-studio/

https://devblog.dymel.pl/2016/09/08/aspnet-core-with-angular2-tutorial/

https://github.com/mdymel/AspNetCoreAngular2

## Webapi

https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api
## https://github.com/aspnet/Docs/tree/master/aspnetcore/tutorials
https://code.msdn.microsoft.com/ASPNET-Web-API-JavaScript-d0d64dd7/sourcecode?fileId=63598&pathId=352866761

https://www.asp.net/aspnet/samples/aspnet-web-api

https://hgminerva.wordpress.com/2016/05/26/having-problem-with-pre-flight-cors-request-with-your-angular-2-app-and-web-api-2/
https://github.com/hgminerva/WebPos/blob/master/ISWebPOS/Controllers/AccountController.cs


# Angular 2
https://angular.io/

https://johnpapa.net/introducing-angular-modules-root-module/

https://github.com/DeborahK/Angular2-ReactiveForms


https://github.com/auth0-blog/angular2-the-new-horizon-sample

https://github.com/codeschool/WatchUsBuild-Angular2Final

https://github.com/Lemoncode/angular2-sample-app/tree/master/05%20Form%20Validation

## https://github.com/SSWConsulting/enterprise-musicstore-ui-angular2

https://github.com/cornflourblue/angular2-jwt-authentication-example

## https://github.com/DanWahlin/Angular-RESTfulService

# Material2
https://material.angular.io/guides
## https://material.io/icons/

## https://github.com/angular/material2

https://github.com/jelbourn/material2-app

## https://github.com/angular/material2/tree/master/src/lib/dialog

## https://material.angular.io/components/component/snack-bar

https://www.youtube.com/watch?v=TWX_dNEzT7o

https://www.towfeek.se/2016/10/12/angular-2-0-2-released-guide-on-how-to-scaffold-an-app-with-material2-using-angular-cli-in-minutes/
https://github.com/ajtowf/ng2_play/blob/master/src/app/about/about.component.ts
## https://www.youtube.com/watch?v=ngkVXUCBozc&list=PLw5h0DiJ-9PAQoJnJOM_m49VBOGessM34&index=14


# Typescript

https://www.typescriptlang.org/docs/handbook/basic-types.html

https://basarat.gitbooks.io/typescript/content/docs/types/ambient/variables.html

# CQRS

https://github.com/jbogard/ContosoUniversityCore

http://codeopinion.com/fat-controller-cqrs-diet-simple-command/
https://www.youtube.com/watch?v=icyvKTuZkzE



# EventStore
https://www.youtube.com/watch?v=0q8BLmv4P88

https://www.youtube.com/watch?v=Q0Bz-O67_nI


# nginx
http://www.nikola-breznjak.com/blog/javascript/nodejs/using-nginx-as-a-reverse-proxy-in-front-of-your-node-js-application/

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

https://gist.github.com/learncodeacademy/ebba574fc3f438c851ae

# Polymer
https://github.com/robdodson/contacts-app
https://github.com/LostInBrittany/polymer-beers
https://github.com/tur-nr/polymer-redux/tree/master/demo
https://github.com/MediaMath/strand
https://github.com/vaadin/vaadin-grid
https://github.com/handsontable/hot-table
https://github.com/caleblloyd/polymer-wedding

## https://github.com/vaadin/angular2-polymer-quickstart

https://github.com/JohnGorter?tab=repositories
https://github.com/krzysu/polymer-shopping-cart/tree/master/components
https://github.com/pubnub/pubnub-polymer

## https://github.com/vaadin-marcus/polymer-spring-boot



## What is difference between declarations, providers and import in NgModule

http://stackoverflow.com/questions/39062930/what-is-difference-between-declarations-providers-and-import-in-ngmodule
### imports 
makes the exported declarations of other modules available in the current module
### declarations 
are to make directives (including components and pipes) from the current module available to other directives in the current module. Selectors of directives, components or pipes are only matched against the HTML if they are declared or imported.
### providers 
are to make services and values known to DI. They are added to the root scope and they are injected to other services or directives that have them as dependency.
A special case for providers are lazy loaded modules that get their own child injector. providers of a lazy loaded module are only provided to this lazy loaded module by default (not the whole application as it is with other mdoules).

For more details about modules see also https://angular.io/docs/ts/latest/guide/ngmodule.html

### exports
makes the components, directives, and pipes available in modules that add this module to imports.  exports can also be used to re-export modules such as CommonModule and FormsModule, which is often done in shared modules.
### entryComponents 
registers components for offline compilation so that they can be used with ViewContainerRef.createComponent(). Components used in router configurations are added implicitely.

### TypeScript imports
import ... from 'foo/bar' (alsoindex.ts`) are for TypeScript imports. You need these whenever you use an identifier in a typescript file that is declared in another typescript file.

imports in @NgModule() and TypeScript imports are entirely different concepts.

## Theme
https://www.materialpalette.com/


## SignalR
https://radu-matei.github.io/blog/aspnet-core-mvc-signalr/
Add a NuGet.config file
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="AspNetCore" value="https://dotnet.myget.org/F/aspnetcore-ci-dev/api/v3/index.json" />
    <add key="NuGet" value="https://api.nuget.org/v3/index.json" />
  </packageSources>
</configuration>


## Flex Playground
https://demo.agektmr.com/flexbox/