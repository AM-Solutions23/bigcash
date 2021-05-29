export interface InitResponse {
    color: string;
    message: string;
    result: boolean;
}
export interface ArgsInterface {
    type:string;
    name:string;
    route?:string;
    entity?:string;
    controller?:string;
    entity_options?:string
}