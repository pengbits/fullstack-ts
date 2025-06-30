import {readFileSync} from 'fs'
import path from 'path'
import EnvType from './types/Env'
const isProd = process.env.NODE_ENV == "production"

// setup env vars since dotenv doesn't want to work in our ts-node environment
function parseConfig():EnvType {
  const configPath = path.join(__dirname, !isProd ? '.env.local' : '.env.prod')
  console.log(`|env| isProd:${isProd} config:${configPath}`)
  const configData = readFileSync(configPath , {encoding:'utf8', flag:'r'})
  let env_:any = {}
  env_.PROD = isProd
  env_.DEV = !isProd
  configData.split("\n").map(line => {
      const [key,val] = line.split('=')
      process.env[key] = val // no effect in ts-node environment
      env_[key] = val
  })
  return env_
}

let env_:EnvType;
function bootstrap():EnvType{
  if(!env_) {
    console.log('|env| env object null, bootstrapping')
    env_ = parseConfig()
  }
  return env_
}
export default bootstrap 