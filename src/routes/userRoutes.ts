// routes/userRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// Função para lidar com o contexto e tratar erros
const wrapAsync = (fn: (req: Request, res: Response) => Promise<Response>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res).catch(next);
    };
  };

// Rotas de usuário
router.post("/users", wrapAsync(userController.createUser.bind(userController))); 
router.get("/users", wrapAsync(userController.getAllUsers.bind(userController)));
router.get("/users/:id", wrapAsync(userController.getUserById.bind(userController)));
router.put("/users/:id", wrapAsync(userController.updateUser.bind(userController)));
router.delete("/users/:id", wrapAsync(userController.deleteUser.bind(userController)));

export default router;
