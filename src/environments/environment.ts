// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  BASE_API_URI: {
    BASE_SALE_CONTRACT_API: 'https://b4lc-testv2.onrender.com/salescontracts',
    BASE_LETTER_OF_CREDIT_API: 'https://b4lc-testv2.onrender.com/letterofcredits',
    BASE_INVOICE_API: 'https://b4lc-testv2.onrender.com/invoices',
    BASE_SERVICE_API: 'https://b4lc-testv2.onrender.com',
    BASE_SERVICE_TEST_API: 'https://b4lc-testv2.onrender.com',
  },
  // BASE_API_URI: {
  //   BASE_SALE_CONTRACT_API: 'http://localhost:3000/salescontracts',
  //   BASE_LETTER_OF_CREDIT_API: 'http://localhost:3000/letterofcredits',
  //   BASE_INVOICE_API: 'http://localhost:3000/invoices',
  //   BASE_SERVICE_API: 'http://localhost:3000',
  //   BASE_SERVICE_TEST_API: 'http://localhost:3000',
  // }, 
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
