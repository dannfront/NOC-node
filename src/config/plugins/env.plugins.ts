import 'dotenv/config'
import * as envs from 'env-var';


export const env = {
    EMAIL: envs.get('EMAIL').required().asEmailString(),
    PASSWORD_EMAIL: envs.get("PASSWORD_EMAIL").required().asString(),
    PORT: envs.get("PORT").required().asIntPositive(),
    PROD: envs.get("PROD").required().asBool(),
    MONGO_URL:envs.get("MONGO_URL").required().asString(),
    MONGO_DB_NAME:envs.get("MONGO_DB_NAME").required().asString(),
    MONGO_USER:envs.get("MONGO_USER").required().asString(),
    MONGO_PASSWORD:envs.get("MONGO_PASSWORD").required().asString(),
}