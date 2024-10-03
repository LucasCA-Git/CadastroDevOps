import { AppDataSource } from "../config/database";
import { User } from "../model/User";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(name: string, email: string, phone: string, password: string) {
    const user = this.userRepository.create({ name, email, phone, password });
    await this.userRepository.save(user);
    return user;
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user; // Retorna o usuário encontrado
  }

  async updateUser(id: number, userData: Partial<User>) {
    const result = await this.userRepository.update(id, userData);
    if (result.affected === 0) {
      return null; // Se não afetou nenhuma linha, retorna null
    }
    return this.getUserById(id); // Retorna o usuário atualizado
  }

  async deleteUser(id: number) {
    const deleteResult = await this.userRepository.delete(id);
    return deleteResult.affected !== undefined && deleteResult.affected! > 0; // Retorna true se o usuário foi deletado, caso contrário, false
  }
}
