const { ENV_VARS } = global;

/**
 * Returns an array containing all environment variables.
 * @return {array} containing { name, value } pairs
 */
export const getVars = () => Object.entries(ENV_VARS).map(([name, value]) => ({ name, value }));

/**
 * Gets current deployment environment.
 * @return {string}
 */
export const getEnvironment = () => ENV_VARS.APP_ENV;
