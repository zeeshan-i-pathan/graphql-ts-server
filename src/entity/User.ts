import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity, BeforeInsert } from "typeorm"
import * as bcrypt from 'bcryptjs' 
@Entity()
export class User extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    bcryptPasssword() {
        let hashedPassword = bcrypt.hashSync(this.password, 10);
        this.password = hashedPassword;
    }
}
