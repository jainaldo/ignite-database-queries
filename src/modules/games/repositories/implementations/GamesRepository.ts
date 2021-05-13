import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder()
      .where("upper(title) LIKE :param", {
        param: `%${param.toLocaleUpperCase()}%`,
      })
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`
      SELECT count(*) FROM games
    `); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return await this.repository
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .innerJoin(
        "users_games_games",
        "user_games",
        "user_games.usersId=user.id"
      )
      .where("user_games.gamesId=:id", { id })
      .getMany();
    // Complete usando query builder
  }
}
