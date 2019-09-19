export namespace TypeGuard {

    // https://dev.to/krumpet/generic-type-guard-in-typescript-258l
    export type Constructor<T> = { new(...args: any[]): T };

    export const typeGuard = <T>(o: any, className: Constructor<T>): o is T => {
        return o instanceof className;
    };
}
