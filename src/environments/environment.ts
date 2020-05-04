// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userApi: "https://banana-sundae-96116.herokuapp.com/api/user",
  stockApi: "https://protected-brushlands-06858.herokuapp.com/api/stock",
  feedbackApi: "https://ndf-feedback.herokuapp.com/api/v1/",
  nessfeedApi: "https://ndf-newsfeed.herokuapp.com/api/v1/"
};

/*
 * For easier debugging in development  mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
