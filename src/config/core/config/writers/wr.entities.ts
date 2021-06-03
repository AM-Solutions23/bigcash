
export default class Entities{
    private entity:string;
    private entity_options:any;
    private entity_importers:any;
    constructor(fragments){
        this.entity_options = fragments.entity_options;
        this.entity = fragments.entity;
        this.entity_importers = fragments.entity_importers;
    }
    public EntitiesData(){      
        let data:String = `import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,UpdateDateColumn,OneToMany,ManyToOne} from "typeorm";
${this.entity_importers ? this.entity_importers.join('\n') : ''}

@Entity()
export class ${this.entity} {

    @PrimaryGeneratedColumn()
    id: number;
    `;
if(this.entity_options){
this.entity_options.forEach(option =>{
    if(typeof option === 'string'){
        data+=`
    @Column()
    ${option};

    `
    }else{
        data+=`
    ${option['header']}
    ${option['body']};

    `
    }
    
});
}else{
    data+=`
    @Column()
    column1:string;

    @Column()
    column2:string;
    `
}
data += `
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

} `;
        return data;
    }
}