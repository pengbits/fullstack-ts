export default interface EnvType {
  PGUSER?: string,
  PGPASSWORD?: string,
  PGHOST?: string,
  PGPORT?: string,
  PROD?: boolean,
  DEV?: boolean,
  TESTING?: boolean
}