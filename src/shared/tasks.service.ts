import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { readdir, unlink } from "node:fs/promises";
import { join, parse } from "path";
import { Repository } from "typeorm";
import { Movie } from "../movie/entities/movie.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  // 하루마다 temp 폴더에 있는 파일 삭제
  @Cron("* * 0 * * *")
  async eraseOrphanFiles() {
    // 1.temp 파일을 읽어오셈
    // 2.파일들뒤에 붙어있는 시간가져오셈.
    // 3.가져오 시간과 현재시간과 비교해서 24시간이 지났으면 삭제(Promise.all)

    const files = await readdir(
      join(process.cwd(), "public", "temp"),
    );

    const deleteFiles = files.filter((file) => {
      const fileName = parse(file).name;

      const createdFileDate = parseInt(
        fileName.split("-").at(-1),
      );

      const aDayInMills = 24 * 60 * 60 * 1000;

      return Date.now() - createdFileDate > aDayInMills;
    });

    await Promise.all(
      deleteFiles.map((file) =>
        unlink(join(process.cwd(), "public", "temp", file)),
      ),
    );
  }

  // 1시간마다 좋아요, 싫어요 갱신
  @Cron("* 0 * * * *")
  async updateMovieLikes() {
    await this.movieRepository.query(
      `
          update movie m set "dislikeCount" = (select count(*) from movie_user_like mul where m.id = mul."movieId" and mul."isLike"=false )
          `,
    );

    await this.movieRepository.query(
      `
          update movie m set "likeCount" = (select count(*) from movie_user_like mul where m.id = mul."movieId" and mul."isLike"=true )
          `,
    );
  }
}
