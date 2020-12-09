import { ENVIRONMENT_DEFAULTS, Environment } from './environment.model';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --prod` then `environment.prod.ts` will be used instead.
// The list of which configuration maps to which file can be found in `angular.json`.

export const environment: Environment = {
  ...ENVIRONMENT_DEFAULTS,
  mockServerAPI: false,

  /* INTERSHOP COMMERCE MANAGEMENT REST API CONFIGURATION */
  icmBaseURL: 'https://jxdemoserver6.intershop.de',
  theme: 'shark',
};
