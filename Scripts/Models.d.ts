declare namespace Server.Controllers.Todo {
    export interface Entry {
        id: number,
        value: string,
        complete: boolean,
    }
}