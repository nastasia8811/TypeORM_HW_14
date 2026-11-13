import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User.ts'

@Entity('newsposts')
export class Newspost {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 50 })
  title!: string

  @Column({ type: 'varchar', length: 256 })
  text!: string

  @Column({ type: 'varchar' })
  genre!: string

  @Column({ type: 'boolean', default: false })
  isPrivate!: boolean

  @CreateDateColumn()
  createDate!: Date

  @ManyToOne(() => User, { nullable: false })
  author!: User
}
