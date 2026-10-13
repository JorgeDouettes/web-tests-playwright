export function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variável de ambiente obrigatória não definida: ${name}`);
  }

  return value;
}

export const env = {
  email: requireEnv('CUSTOMER_EMAIL'),
  password: requireEnv('CUSTOMER_PASSWORD'),
};