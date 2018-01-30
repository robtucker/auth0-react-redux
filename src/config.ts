// please note that ALL values must be strings
export interface ConfigModel {
    AUTH0_DOMAIN: string
    AUTH0_ID: string
    AUTH0_AUDIENCE: string
}

export const config: ConfigModel = process.env.CONFIG as any
