import { User } from "../models/User"

export const canRead = (user: User): boolean => {
    const allowed = ['admin', 'student', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

export const canEdit = (user: User): boolean => {
  const allowed = ['admin']
  return this.checkAuthorization(user, allowed)
}

export const canDelete = (user: User): boolean => {
  const allowed = ['admin']
  return this.checkAuthorization(user, allowed)
}

// determines if user has matching role
const  checkAuthorization = (user: User, allowedRoles: string[]): boolean => {
  if (!user) return false
  for (const role of allowedRoles) {
    if ( user.roles[role] ) {
      return true
    }
  }
  return false
}
