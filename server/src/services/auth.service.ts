import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, PublicUser } from '../models/user.model';
import { RegisterDto, LoginDto } from '../validators/auth.validator';
import { config } from '../config';

let users: User[] = [];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function toPublic(user: User): PublicUser {
  return { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
}

export const authService = {
  async register(dto: RegisterDto): Promise<{ user: PublicUser; token: string }> {
    const exists = users.find(u => u.email === dto.email);
    if (exists) throw new Error('EMAIL_TAKEN');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user: User = { id: generateId(), email: dto.email, name: dto.name, passwordHash, createdAt: new Date().toISOString() };
    users.push(user);
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '7d' });
    return { user: toPublic(user), token };
  },

  async login(dto: LoginDto): Promise<{ user: PublicUser; token: string }> {
    const user = users.find(u => u.email === dto.email);
    if (!user) throw new Error('INVALID_CREDENTIALS');
    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new Error('INVALID_CREDENTIALS');
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '7d' });
    return { user: toPublic(user), token };
  },

  getById(id: string): PublicUser | undefined {
    const user = users.find(u => u.id === id);
    return user ? toPublic(user) : undefined;
  },
};
