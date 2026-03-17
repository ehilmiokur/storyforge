export type ScriptStatus = 'idea' | 'draft' | 'final' | 'recorded';

export interface Scene {
  id: string;
  scriptId: string;
  title: string;
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Script {
  id: string;
  title: string;
  status: ScriptStatus;
  scenes: Scene[];
  createdAt: string;
  updatedAt: string;
}
