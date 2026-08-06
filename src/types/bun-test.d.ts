declare module "bun:test" {
  type Matchers = {
    toEqual(expected: unknown): void;
    toStartWith(expected: string): void;
  };

  export function expect(value: unknown): Matchers;
  export function test(
    name: string,
    callback: () => void | Promise<void>,
  ): void;
}
