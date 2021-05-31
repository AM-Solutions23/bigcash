
export default class Entities{
    private entity:string;
    private entity_options:string;
    constructor(fragments){
        this.entity_options = fragments.entity_options;
        this.entity = fragments.entity;
    }
    public EntitiesData(){
        let data:String = `import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ${this.entity} {

    @PrimaryGeneratedColumn()
    id: number;
    `;
if(this.entity_options){
    this.entity_options.split(',').forEach(option =>{
        data+=`
        @Column()
        ${option};

        `
    });
}else{
    data+=`
    @Column()
    column1:string;

    @Column()
    column2:string;
    `
}
data += ` } `;
                return data;
    }
}