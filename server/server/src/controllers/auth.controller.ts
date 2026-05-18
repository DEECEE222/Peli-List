import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { AuthRequest } from '../middleware/auth.middleware';

const ts = () => new Date().toISOString();

export async function register(req: Request, res: Response): Promise<void> {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Datos inválidos', details: result.error.flatten(), timestamp: ts() });
    return;
  }
  try {
    const { user, token } = await authService.register(result.data);
    res.status(201).json({ data: { user, token }, timestamp: ts() });
  } catch (err) {
    if (err instanceof Error && err.message === 'EMAIL_TAKEN') {
      res.status(409).json({ error: 'El email ya está registrado', timestamp: ts() });
    } else {
      res.status(500).json({ error: 'Error interno', timestamp: ts() });
    }
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Datos inválidos', details: result.error.flatten(), timestamp: ts() });
    return;
  }
  try {
    const { user, token } = await authService.login(result.data);
    res.json({ data: { user, token }, timestamp: ts() });
  } catch {
    res.status(401).json({ error: 'Email o contraseña incorrectos', timestamp: ts() });
  }
}

export function me(req: AuthRequest, res: Response): void {
  const user = authService.getById(req.userId!);
  if (!user) { res.status(404).json({ error: 'Usuario no encontrado', timestamp: ts() }); return; }
  res.json({ data: user, timestamp: ts() });
}
