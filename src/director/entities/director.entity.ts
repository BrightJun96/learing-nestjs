import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "../../movie/entities/movie.entity";
import { BaseTable } from "../../shared/base-table";

@Entity()
export class Director extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  // 이름
  @Column()
  name: string;

  // 생일
  @Column()
  dob: Date;

  // 국적
  @Column()
  nationality: string;

  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];
}
