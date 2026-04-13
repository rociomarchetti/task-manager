import { User } from '@shared/models';

export const getUserInitials = (user: User): string => {
  const firstInitial = user?.name?.trim()?.charAt(0) || '';
  const lastInitial = user?.lastName?.trim()?.charAt(0) || '';

  return (firstInitial + lastInitial).toUpperCase();
};
