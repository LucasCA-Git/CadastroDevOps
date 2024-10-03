import { AppDataSource } from '../config/database';
import { User } from '../model/User';

async function adicionarUsuarios() {
    await AppDataSource.initialize();

    // Criação dos Usuários
    const usuarios = [
        { email: 'joao.silva@gmail.com', name: 'João Silva', phone: '11987654321', password: 'senha123' },
        { email: 'maria.souza@gmail.com', name: 'Maria Souza', phone: '21987654321', password: 'senha456' },
        { email: 'pedro.almeida@gmail.com', name: 'Pedro Almeida', phone: '31987654321', password: 'senha789' },
        { email: 'ana.oliveira@gmail.com', name: 'Ana Oliveira', phone: '41987654321', password: 'senha101' },
        { email: 'lucas.martins@gmail.com', name: 'Lucas Martins', phone: '51987654321', password: 'senha102' },
        { email: 'carla.santos@gmail.com', name: 'Carla Santos', phone: '61987654321', password: 'senha103' },
        { email: 'fernando.pereira@gmail.com', name: 'Fernando Pereira', phone: '71987654321', password: 'senha104' },
        { email: 'julia.martins@gmail.com', name: 'Julia Martins', phone: '81987654321', password: 'senha105' },
        { email: 'renato.rodrigues@gmail.com', name: 'Renato Rodrigues', phone: '91987654321', password: 'senha106' },
        { email: 'patricia.lima@gmail.com', name: 'Patrícia Lima', phone: '02987654321', password: 'senha107' },
    ];

    for (const usuarioData of usuarios) {
        const usuario = new User();
        usuario.email = usuarioData.email;
        usuario.name = usuarioData.name;
        usuario.phone = usuarioData.phone;
        usuario.password = usuarioData.password;
        
        await AppDataSource.getRepository(User).save(usuario);
    }

    console.log('Usuários adicionados com sucesso!');
}

adicionarUsuarios();
