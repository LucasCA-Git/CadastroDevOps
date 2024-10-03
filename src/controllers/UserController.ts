// controllers/UserController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    // Lógica para criar um usuário
    const { name, email, phone, password } = req.body;
    const user = await this.userService.createUser(name, email, phone, password);
    return res.status(201).json(user);
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = await this.userService.getAllUsers();
    return res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const user = await this.userService.getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const updatedUser = await this.userService.updateUser(Number(req.params.id), req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(updatedUser);
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const result = await this.userService.deleteUser(Number(req.params.id));
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(204).send();
  }
}
