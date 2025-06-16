// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //*******************Local server


  BASE_API_URL: 'http://68.178.167.242/nominalrollapi/api/',
  APIURL: 'http://68.178.167.242/nominalrollapi',
  // Report_Path: 'http://192.168.29.234/sunlord/PDFJobInspection/',

  // BASE_API_URL: 'http://localhost:5265/api/',
  // APIURL: 'http://localhost:5265/',
  Report_Path: 'http://192.168.29.234/sunlord/PDFJobInspection/',

  // BASE_API_URL: 'http://192.168.0.77/SunLoardCoreV8Svc/api/',
  // APIURL: 'http://192.168.0.77/SunLoardCoreV8Svc',
  // Report_Path: 'http://192.168.0.77/SunLoardCoreV8Svc/PDFJobInspection/',

  // BASE_API_URL: 'http://182.77.63.44/SunLoardCoreV8Svc/api/',
  // APIURL: 'http://182.77.63.44/SunLoardCoreV8Svc',
  // Report_Path: 'http://182.77.63.44/SunLoardCoreV8Svc/PDFJobInspection/',



  //*******************182.77.63.44 Production server*********************
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  BASE_API_URL_static: 'http://182.77.63.44/SunLoardCoreV8Svc/api/',
  APIURL_static: 'http://182.77.63.44/SunLoardCoreV8Svc',
  Report_Path_static: 'http://182.77.63.44/SunLoardCoreV8Svc/PDFJobInspection/',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
