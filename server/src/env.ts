import {readFileSync} from 'fs'
import path from 'path'
const isProd = process.env.NODE_ENV == "production"

// setup env vars since dotenv doesn't want to work in our ts-node environment
export default () => {
  const configPath = path.join(__dirname, !isProd ? '.env.local' : '.env.prod')
  console.log(`env isProd:${isProd} config:${configPath}`)
  const configData = readFileSync(configPath , {encoding:'utf8', flag:'r'})

  configData.split("\n").map(line => {
      const [key,val] = line.split('=')
      process.env[key] = val
  })
}