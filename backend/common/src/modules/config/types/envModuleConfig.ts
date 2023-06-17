import { Dictionary } from 'src/common';

export interface EnvModuleConfig<T> {
	isGlobal?: boolean;
	factory: (raw: Dictionary<string>) => T | null;
}
