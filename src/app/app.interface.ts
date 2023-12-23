export interface NestedObjType {
  id: string;
  name: string;
  children: NestedObjType[];
}

export interface NestedObjExpandType {
  id: string;
  name: string;
  parentId?: string;
  expanded: boolean;
  hasChild: boolean;
  children: NestedObjExpandType[];
}

export interface FlatObjType {
  id: string;
  name: string;
  parentId?: string;
  expanded: boolean;
  hasChild: boolean;
  level: number;
}
