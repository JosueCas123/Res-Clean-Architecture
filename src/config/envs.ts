import 'dotenv/config'
import * as env from 'env-var'


export const envs = {
    //MongoDB
    PORT: env.get('PORT').required().asIntPositive(),
    PUBLIC_PATH: env.get('PUBLIC_PATH').required().asString(),

}
