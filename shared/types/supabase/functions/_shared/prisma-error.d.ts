export declare class PrismaError extends Error {
    constructor(error: unknown, message?: string);
}
export type PrismaErrorType = {
    type: 'known' | 'init' | 'validation' | 'unknown' | 'panic';
    code?: string;
    message: string;
    target?: string[] | null;
};
export declare const prismaErrorHandler: (error: PrismaError) => PrismaErrorType;
