import { makeAutoObservable } from "mobx"

export class Zone {
    loading = new Process()
    reloading = new Process()
    submitting = new Process()

    constructor() {
        makeAutoObservable(this);
    }
}

export class Process {
    protected pending = 0

    constructor() {
        makeAutoObservable(this);
    }

    start = () => {
        this.pending++;
    }

    end = () => {
        this.pending--;
    }

    get active() {
        return this.pending > 0;
    }
}


export const bindProcess = <T extends (...args: any) => any>(fn: T, process: Process, async = true) => {
    return wrap({
        fn: fn,
        before: () => process.start(),
        after: () => process.end(),
        async: async
    });
};

export const bindSubmitting = <T extends (...args: any) => any>(fn: T, process: Process, async = true) => {
    const wrapped = wrap({
        fn: fn,
        before: () => process.start(),
        after: () => process.end(),
        async: async
    });

    return ((...args) => {
        if (!process.active) {
            return wrapped(args);
        }
    }) as T;
};

const wrap = <T extends (...args: any) => any>(params: {
    fn: T,
    before?: () => any,
    after?: () => any,
    async?: boolean
}) => {
    const { fn, before, after, async } = params;

    if (async) {
        return async (...args: any) => {
            await before?.();
            try {
                return await fn(...args);
            } finally {
                await after?.();
            }
        };
    }

    return (...args: any) => {
        before?.();
        try {
            return fn(...args);
        } finally {
            after?.();
        }
    }
};