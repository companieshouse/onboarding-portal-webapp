import dotenv = require('dotenv');
dotenv.config();

/**
 * Gets an environment variable. If the env var is not set and a default value is not
 * provided, then it is assumed it is a mandatory requirement and an error will be
 * thrown.
 */

const getEnvironmentVariable = (key: string, mandatory: boolean): string => {
    const value: string = process.env[key] || "";

    if (!value && mandatory) {
        throw new Error(`Please set the environment variable "${key}"`);
    }

    return value as string;
};

export const CMS_API_URL = getEnvironmentVariable("CMS_API_URL", false);

export const PATH_PREFIX = getEnvironmentVariable("PATH_PREFIX", false);

export const MOCK_API_RESPONSES = getEnvironmentVariable("MOCK_API_RESPONSES", true);

export const NODE_ENV = getEnvironmentVariable("NODE_ENV", false);