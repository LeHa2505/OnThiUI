// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  BASE_API_URI: {
    BASE_SALE_CONTRACT_API: 'http://localhost:8899/salescontracts',
    BASE_LETTER_OF_CREDIT_API: 'http://localhost:8899/letterofcredits',
    BASE_INVOICE_API: 'http://localhost:8899/invoices',
    BASE_SERVICE_API: 'http://localhost:8899',
    BASE_SERVICE_ONTHI_API: 'http://localhost:8899/service-onthi/api',
  }, 
  production: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
