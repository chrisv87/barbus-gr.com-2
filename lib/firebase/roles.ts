export type UserRole = "client" | "employee" | "admin" | "promoter";

export const ROLES = {
  CLIENT: "client" as const,
  EMPLOYEE: "employee" as const,
  ADMIN: "admin" as const,
  PROMOTER: "promoter" as const,
};

export const ROLE_LEVELS = {
  [ROLES.CLIENT]: 1,
  [ROLES.PROMOTER]: 2,
  [ROLES.EMPLOYEE]: 3,
  [ROLES.ADMIN]: 4,
};

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_LEVELS[userRole] >= ROLE_LEVELS[requiredRole];
}

export function canAccessRole(userRole: UserRole, targetRole: UserRole): boolean {
  return ROLE_LEVELS[userRole] > ROLE_LEVELS[targetRole];
}