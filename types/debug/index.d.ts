declare module "debug" {
  type Debugger = {
    (formatter: unknown, ...args: unknown[]): void;
    enabled: boolean;
    namespace: string;
    extend(namespace: string, delimiter?: string): Debugger;
  };

  type DebugFactory = {
    (namespace: string): Debugger;
    enable(namespaces: string): void;
    disable(): string;
    enabled(namespaces: string): boolean;
  };

  const debug: DebugFactory;
  export = debug;
}
