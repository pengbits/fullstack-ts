import {readFileSync} from 'fs'
import path from 'path'

// mock env vars since dotenv wont work in test environment
export default function(){
  const __dirname = import.meta.dirname;
  const configPath = path.join(__dirname, './src', '.env.local')
  const configData = readFileSync(configPath , {encoding:'utf8', flag:'r'})
  configData.split("\n").map(line => {
      const [key,val] = line.split('=')
      process.env[key] = val
  })
}