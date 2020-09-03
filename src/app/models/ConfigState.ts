import { User } from './User';
export enum Area {
  Islamic = 'islamic',
  GeneralKnowledge = 'general-knowledge'
}

export interface ConfigState {
  area: Area;
  user: User;
  isAuthenticated: boolean;
}
