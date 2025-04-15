import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'projectinfo' })
export class Projectinfo {
@PrimaryGeneratedColumn()
  id: number;
  @Column()
  fullName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  projectname: string;
  @Column()
  projectdescription: string;
  @Column()
  projectmanager: string;

}
