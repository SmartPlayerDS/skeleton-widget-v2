export interface DatabaseProvider {
    open: (databaseName?: string) => Promise<any>
    declare: (version: string | number) => void
}