export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const minLength = (v: string, n: number) => v.trim().length >= n;
export const required = (v: string) => v.trim().length > 0;
