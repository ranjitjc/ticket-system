// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export enum AuthType{
  WINDOWS =0,
  FORMS=1
}

export const environment = {
  authType : AuthType.WINDOWS,
  production: false,
  realTimeURL : 'http://localhost:5501/signalr',
  apiURL : 'http://localhost:5501/api/'
};
