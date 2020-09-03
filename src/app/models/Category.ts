import { KeyValuePair, ResourceType } from "./KeyValuePair";
import { Area } from "./ConfigState";

export interface Category extends KeyValuePair {
  parent: string;
  area?: Area;
  resource?: {
    type: ResourceType;
    url: string;
    description: string;
  }
}

