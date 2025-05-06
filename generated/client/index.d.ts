
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Memo
 * 
 */
export type Memo = $Result.DefaultSelection<Prisma.$MemoPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model MemoCategory
 * 
 */
export type MemoCategory = $Result.DefaultSelection<Prisma.$MemoCategoryPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model MemoTag
 * 
 */
export type MemoTag = $Result.DefaultSelection<Prisma.$MemoTagPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memo`: Exposes CRUD operations for the **Memo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memos
    * const memos = await prisma.memo.findMany()
    * ```
    */
  get memo(): Prisma.MemoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memoCategory`: Exposes CRUD operations for the **MemoCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemoCategories
    * const memoCategories = await prisma.memoCategory.findMany()
    * ```
    */
  get memoCategory(): Prisma.MemoCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memoTag`: Exposes CRUD operations for the **MemoTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemoTags
    * const memoTags = await prisma.memoTag.findMany()
    * ```
    */
  get memoTag(): Prisma.MemoTagDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Profile: 'Profile',
    Memo: 'Memo',
    Category: 'Category',
    MemoCategory: 'MemoCategory',
    Tag: 'Tag',
    MemoTag: 'MemoTag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "profile" | "memo" | "category" | "memoCategory" | "tag" | "memoTag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Memo: {
        payload: Prisma.$MemoPayload<ExtArgs>
        fields: Prisma.MemoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          findFirst: {
            args: Prisma.MemoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          findMany: {
            args: Prisma.MemoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>[]
          }
          create: {
            args: Prisma.MemoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          createMany: {
            args: Prisma.MemoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>[]
          }
          delete: {
            args: Prisma.MemoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          update: {
            args: Prisma.MemoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          deleteMany: {
            args: Prisma.MemoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>[]
          }
          upsert: {
            args: Prisma.MemoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          aggregate: {
            args: Prisma.MemoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemo>
          }
          groupBy: {
            args: Prisma.MemoGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemoGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemoCountArgs<ExtArgs>
            result: $Utils.Optional<MemoCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      MemoCategory: {
        payload: Prisma.$MemoCategoryPayload<ExtArgs>
        fields: Prisma.MemoCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemoCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemoCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload>
          }
          findFirst: {
            args: Prisma.MemoCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemoCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload>
          }
          findMany: {
            args: Prisma.MemoCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload>[]
          }
          create: {
            args: Prisma.MemoCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload>
          }
          createMany: {
            args: Prisma.MemoCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemoCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload>[]
          }
          delete: {
            args: Prisma.MemoCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload>
          }
          update: {
            args: Prisma.MemoCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload>
          }
          deleteMany: {
            args: Prisma.MemoCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemoCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemoCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload>[]
          }
          upsert: {
            args: Prisma.MemoCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoCategoryPayload>
          }
          aggregate: {
            args: Prisma.MemoCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemoCategory>
          }
          groupBy: {
            args: Prisma.MemoCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemoCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemoCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<MemoCategoryCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      MemoTag: {
        payload: Prisma.$MemoTagPayload<ExtArgs>
        fields: Prisma.MemoTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemoTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemoTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          findFirst: {
            args: Prisma.MemoTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemoTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          findMany: {
            args: Prisma.MemoTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>[]
          }
          create: {
            args: Prisma.MemoTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          createMany: {
            args: Prisma.MemoTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemoTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>[]
          }
          delete: {
            args: Prisma.MemoTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          update: {
            args: Prisma.MemoTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          deleteMany: {
            args: Prisma.MemoTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemoTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemoTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>[]
          }
          upsert: {
            args: Prisma.MemoTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          aggregate: {
            args: Prisma.MemoTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemoTag>
          }
          groupBy: {
            args: Prisma.MemoTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemoTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemoTagCountArgs<ExtArgs>
            result: $Utils.Optional<MemoTagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    profile?: ProfileOmit
    memo?: MemoOmit
    category?: CategoryOmit
    memoCategory?: MemoCategoryOmit
    tag?: TagOmit
    memoTag?: MemoTagOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    memos: number
    categories: number
    tags: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memos?: boolean | UserCountOutputTypeCountMemosArgs
    categories?: boolean | UserCountOutputTypeCountCategoriesArgs
    tags?: boolean | UserCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMemosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }


  /**
   * Count Type MemoCountOutputType
   */

  export type MemoCountOutputType = {
    category: number
    tags: number
  }

  export type MemoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | MemoCountOutputTypeCountCategoryArgs
    tags?: boolean | MemoCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * MemoCountOutputType without action
   */
  export type MemoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCountOutputType
     */
    select?: MemoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemoCountOutputType without action
   */
  export type MemoCountOutputTypeCountCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoCategoryWhereInput
  }

  /**
   * MemoCountOutputType without action
   */
  export type MemoCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoTagWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    memo_categories: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memo_categories?: boolean | CategoryCountOutputTypeCountMemo_categoriesArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountMemo_categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoCategoryWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    memos: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memos?: boolean | TagCountOutputTypeCountMemosArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountMemosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memos?: boolean | User$memosArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    categories?: boolean | User$categoriesArgs<ExtArgs>
    tags?: boolean | User$tagsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memos?: boolean | User$memosArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    categories?: boolean | User$categoriesArgs<ExtArgs>
    tags?: boolean | User$tagsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      memos: Prisma.$MemoPayload<ExtArgs>[]
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      categories: Prisma.$CategoryPayload<ExtArgs>[]
      tags: Prisma.$TagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memos<T extends User$memosArgs<ExtArgs> = {}>(args?: Subset<T, User$memosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    categories<T extends User$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends User$tagsArgs<ExtArgs> = {}>(args?: Subset<T, User$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.memos
   */
  export type User$memosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    where?: MemoWhereInput
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    cursor?: MemoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoScalarFieldEnum | MemoScalarFieldEnum[]
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User.categories
   */
  export type User$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * User.tags
   */
  export type User$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    avatar: string | null
    user_name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    avatar: string | null
    user_name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    user_id: number
    avatar: number
    user_name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    user_id?: true
    avatar?: true
    user_name?: true
    created_at?: true
    updated_at?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    user_id?: true
    avatar?: true
    user_name?: true
    created_at?: true
    updated_at?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    user_id?: true
    avatar?: true
    user_name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    user_id: string
    avatar: string | null
    user_name: string | null
    created_at: Date
    updated_at: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    avatar?: boolean
    user_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    avatar?: boolean
    user_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    avatar?: boolean
    user_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    user_id?: boolean
    avatar?: boolean
    user_name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "avatar" | "user_name" | "created_at" | "updated_at", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      avatar: string | null
      user_name: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly user_id: FieldRef<"Profile", 'String'>
    readonly avatar: FieldRef<"Profile", 'String'>
    readonly user_name: FieldRef<"Profile", 'String'>
    readonly created_at: FieldRef<"Profile", 'DateTime'>
    readonly updated_at: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Memo
   */

  export type AggregateMemo = {
    _count: MemoCountAggregateOutputType | null
    _min: MemoMinAggregateOutputType | null
    _max: MemoMaxAggregateOutputType | null
  }

  export type MemoMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    content: string | null
    importance: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MemoMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    content: string | null
    importance: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MemoCountAggregateOutputType = {
    id: number
    user_id: number
    title: number
    content: number
    importance: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type MemoMinAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    content?: true
    importance?: true
    created_at?: true
    updated_at?: true
  }

  export type MemoMaxAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    content?: true
    importance?: true
    created_at?: true
    updated_at?: true
  }

  export type MemoCountAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    content?: true
    importance?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type MemoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memo to aggregate.
     */
    where?: MemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memos to fetch.
     */
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memos
    **/
    _count?: true | MemoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemoMaxAggregateInputType
  }

  export type GetMemoAggregateType<T extends MemoAggregateArgs> = {
        [P in keyof T & keyof AggregateMemo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemo[P]>
      : GetScalarType<T[P], AggregateMemo[P]>
  }




  export type MemoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoWhereInput
    orderBy?: MemoOrderByWithAggregationInput | MemoOrderByWithAggregationInput[]
    by: MemoScalarFieldEnum[] | MemoScalarFieldEnum
    having?: MemoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemoCountAggregateInputType | true
    _min?: MemoMinAggregateInputType
    _max?: MemoMaxAggregateInputType
  }

  export type MemoGroupByOutputType = {
    id: string
    user_id: string
    title: string
    content: string
    importance: string
    created_at: Date
    updated_at: Date
    _count: MemoCountAggregateOutputType | null
    _min: MemoMinAggregateOutputType | null
    _max: MemoMaxAggregateOutputType | null
  }

  type GetMemoGroupByPayload<T extends MemoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemoGroupByOutputType[P]>
            : GetScalarType<T[P], MemoGroupByOutputType[P]>
        }
      >
    >


  export type MemoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    importance?: boolean
    created_at?: boolean
    updated_at?: boolean
    category?: boolean | Memo$categoryArgs<ExtArgs>
    tags?: boolean | Memo$tagsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | MemoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memo"]>

  export type MemoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    importance?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memo"]>

  export type MemoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    importance?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memo"]>

  export type MemoSelectScalar = {
    id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    importance?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type MemoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "title" | "content" | "importance" | "created_at" | "updated_at", ExtArgs["result"]["memo"]>
  export type MemoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Memo$categoryArgs<ExtArgs>
    tags?: boolean | Memo$tagsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | MemoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MemoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MemoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Memo"
    objects: {
      category: Prisma.$MemoCategoryPayload<ExtArgs>[]
      tags: Prisma.$MemoTagPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      title: string
      content: string
      importance: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["memo"]>
    composites: {}
  }

  type MemoGetPayload<S extends boolean | null | undefined | MemoDefaultArgs> = $Result.GetResult<Prisma.$MemoPayload, S>

  type MemoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemoCountAggregateInputType | true
    }

  export interface MemoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Memo'], meta: { name: 'Memo' } }
    /**
     * Find zero or one Memo that matches the filter.
     * @param {MemoFindUniqueArgs} args - Arguments to find a Memo
     * @example
     * // Get one Memo
     * const memo = await prisma.memo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemoFindUniqueArgs>(args: SelectSubset<T, MemoFindUniqueArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Memo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemoFindUniqueOrThrowArgs} args - Arguments to find a Memo
     * @example
     * // Get one Memo
     * const memo = await prisma.memo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemoFindUniqueOrThrowArgs>(args: SelectSubset<T, MemoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Memo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoFindFirstArgs} args - Arguments to find a Memo
     * @example
     * // Get one Memo
     * const memo = await prisma.memo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemoFindFirstArgs>(args?: SelectSubset<T, MemoFindFirstArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Memo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoFindFirstOrThrowArgs} args - Arguments to find a Memo
     * @example
     * // Get one Memo
     * const memo = await prisma.memo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemoFindFirstOrThrowArgs>(args?: SelectSubset<T, MemoFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Memos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memos
     * const memos = await prisma.memo.findMany()
     * 
     * // Get first 10 Memos
     * const memos = await prisma.memo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memoWithIdOnly = await prisma.memo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemoFindManyArgs>(args?: SelectSubset<T, MemoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Memo.
     * @param {MemoCreateArgs} args - Arguments to create a Memo.
     * @example
     * // Create one Memo
     * const Memo = await prisma.memo.create({
     *   data: {
     *     // ... data to create a Memo
     *   }
     * })
     * 
     */
    create<T extends MemoCreateArgs>(args: SelectSubset<T, MemoCreateArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Memos.
     * @param {MemoCreateManyArgs} args - Arguments to create many Memos.
     * @example
     * // Create many Memos
     * const memo = await prisma.memo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemoCreateManyArgs>(args?: SelectSubset<T, MemoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Memos and returns the data saved in the database.
     * @param {MemoCreateManyAndReturnArgs} args - Arguments to create many Memos.
     * @example
     * // Create many Memos
     * const memo = await prisma.memo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Memos and only return the `id`
     * const memoWithIdOnly = await prisma.memo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemoCreateManyAndReturnArgs>(args?: SelectSubset<T, MemoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Memo.
     * @param {MemoDeleteArgs} args - Arguments to delete one Memo.
     * @example
     * // Delete one Memo
     * const Memo = await prisma.memo.delete({
     *   where: {
     *     // ... filter to delete one Memo
     *   }
     * })
     * 
     */
    delete<T extends MemoDeleteArgs>(args: SelectSubset<T, MemoDeleteArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Memo.
     * @param {MemoUpdateArgs} args - Arguments to update one Memo.
     * @example
     * // Update one Memo
     * const memo = await prisma.memo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemoUpdateArgs>(args: SelectSubset<T, MemoUpdateArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Memos.
     * @param {MemoDeleteManyArgs} args - Arguments to filter Memos to delete.
     * @example
     * // Delete a few Memos
     * const { count } = await prisma.memo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemoDeleteManyArgs>(args?: SelectSubset<T, MemoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memos
     * const memo = await prisma.memo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemoUpdateManyArgs>(args: SelectSubset<T, MemoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memos and returns the data updated in the database.
     * @param {MemoUpdateManyAndReturnArgs} args - Arguments to update many Memos.
     * @example
     * // Update many Memos
     * const memo = await prisma.memo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Memos and only return the `id`
     * const memoWithIdOnly = await prisma.memo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemoUpdateManyAndReturnArgs>(args: SelectSubset<T, MemoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Memo.
     * @param {MemoUpsertArgs} args - Arguments to update or create a Memo.
     * @example
     * // Update or create a Memo
     * const memo = await prisma.memo.upsert({
     *   create: {
     *     // ... data to create a Memo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Memo we want to update
     *   }
     * })
     */
    upsert<T extends MemoUpsertArgs>(args: SelectSubset<T, MemoUpsertArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Memos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoCountArgs} args - Arguments to filter Memos to count.
     * @example
     * // Count the number of Memos
     * const count = await prisma.memo.count({
     *   where: {
     *     // ... the filter for the Memos we want to count
     *   }
     * })
    **/
    count<T extends MemoCountArgs>(
      args?: Subset<T, MemoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Memo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemoAggregateArgs>(args: Subset<T, MemoAggregateArgs>): Prisma.PrismaPromise<GetMemoAggregateType<T>>

    /**
     * Group by Memo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemoGroupByArgs['orderBy'] }
        : { orderBy?: MemoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Memo model
   */
  readonly fields: MemoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Memo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends Memo$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Memo$categoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends Memo$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Memo$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Memo model
   */
  interface MemoFieldRefs {
    readonly id: FieldRef<"Memo", 'String'>
    readonly user_id: FieldRef<"Memo", 'String'>
    readonly title: FieldRef<"Memo", 'String'>
    readonly content: FieldRef<"Memo", 'String'>
    readonly importance: FieldRef<"Memo", 'String'>
    readonly created_at: FieldRef<"Memo", 'DateTime'>
    readonly updated_at: FieldRef<"Memo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Memo findUnique
   */
  export type MemoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter, which Memo to fetch.
     */
    where: MemoWhereUniqueInput
  }

  /**
   * Memo findUniqueOrThrow
   */
  export type MemoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter, which Memo to fetch.
     */
    where: MemoWhereUniqueInput
  }

  /**
   * Memo findFirst
   */
  export type MemoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter, which Memo to fetch.
     */
    where?: MemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memos to fetch.
     */
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memos.
     */
    cursor?: MemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memos.
     */
    distinct?: MemoScalarFieldEnum | MemoScalarFieldEnum[]
  }

  /**
   * Memo findFirstOrThrow
   */
  export type MemoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter, which Memo to fetch.
     */
    where?: MemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memos to fetch.
     */
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memos.
     */
    cursor?: MemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memos.
     */
    distinct?: MemoScalarFieldEnum | MemoScalarFieldEnum[]
  }

  /**
   * Memo findMany
   */
  export type MemoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter, which Memos to fetch.
     */
    where?: MemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memos to fetch.
     */
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memos.
     */
    cursor?: MemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memos.
     */
    skip?: number
    distinct?: MemoScalarFieldEnum | MemoScalarFieldEnum[]
  }

  /**
   * Memo create
   */
  export type MemoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * The data needed to create a Memo.
     */
    data: XOR<MemoCreateInput, MemoUncheckedCreateInput>
  }

  /**
   * Memo createMany
   */
  export type MemoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Memos.
     */
    data: MemoCreateManyInput | MemoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Memo createManyAndReturn
   */
  export type MemoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * The data used to create many Memos.
     */
    data: MemoCreateManyInput | MemoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Memo update
   */
  export type MemoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * The data needed to update a Memo.
     */
    data: XOR<MemoUpdateInput, MemoUncheckedUpdateInput>
    /**
     * Choose, which Memo to update.
     */
    where: MemoWhereUniqueInput
  }

  /**
   * Memo updateMany
   */
  export type MemoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Memos.
     */
    data: XOR<MemoUpdateManyMutationInput, MemoUncheckedUpdateManyInput>
    /**
     * Filter which Memos to update
     */
    where?: MemoWhereInput
    /**
     * Limit how many Memos to update.
     */
    limit?: number
  }

  /**
   * Memo updateManyAndReturn
   */
  export type MemoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * The data used to update Memos.
     */
    data: XOR<MemoUpdateManyMutationInput, MemoUncheckedUpdateManyInput>
    /**
     * Filter which Memos to update
     */
    where?: MemoWhereInput
    /**
     * Limit how many Memos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Memo upsert
   */
  export type MemoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * The filter to search for the Memo to update in case it exists.
     */
    where: MemoWhereUniqueInput
    /**
     * In case the Memo found by the `where` argument doesn't exist, create a new Memo with this data.
     */
    create: XOR<MemoCreateInput, MemoUncheckedCreateInput>
    /**
     * In case the Memo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemoUpdateInput, MemoUncheckedUpdateInput>
  }

  /**
   * Memo delete
   */
  export type MemoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter which Memo to delete.
     */
    where: MemoWhereUniqueInput
  }

  /**
   * Memo deleteMany
   */
  export type MemoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memos to delete
     */
    where?: MemoWhereInput
    /**
     * Limit how many Memos to delete.
     */
    limit?: number
  }

  /**
   * Memo.category
   */
  export type Memo$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    where?: MemoCategoryWhereInput
    orderBy?: MemoCategoryOrderByWithRelationInput | MemoCategoryOrderByWithRelationInput[]
    cursor?: MemoCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoCategoryScalarFieldEnum | MemoCategoryScalarFieldEnum[]
  }

  /**
   * Memo.tags
   */
  export type Memo$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    where?: MemoTagWhereInput
    orderBy?: MemoTagOrderByWithRelationInput | MemoTagOrderByWithRelationInput[]
    cursor?: MemoTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoTagScalarFieldEnum | MemoTagScalarFieldEnum[]
  }

  /**
   * Memo without action
   */
  export type MemoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    user_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    user_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    user_id: string
    created_at: Date
    updated_at: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    memo_categories?: boolean | Category$memo_categoriesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "user_id" | "created_at" | "updated_at", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    memo_categories?: boolean | Category$memo_categoriesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      memo_categories: Prisma.$MemoCategoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      user_id: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    memo_categories<T extends Category$memo_categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Category$memo_categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
    readonly user_id: FieldRef<"Category", 'String'>
    readonly created_at: FieldRef<"Category", 'DateTime'>
    readonly updated_at: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.memo_categories
   */
  export type Category$memo_categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    where?: MemoCategoryWhereInput
    orderBy?: MemoCategoryOrderByWithRelationInput | MemoCategoryOrderByWithRelationInput[]
    cursor?: MemoCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoCategoryScalarFieldEnum | MemoCategoryScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model MemoCategory
   */

  export type AggregateMemoCategory = {
    _count: MemoCategoryCountAggregateOutputType | null
    _avg: MemoCategoryAvgAggregateOutputType | null
    _sum: MemoCategorySumAggregateOutputType | null
    _min: MemoCategoryMinAggregateOutputType | null
    _max: MemoCategoryMaxAggregateOutputType | null
  }

  export type MemoCategoryAvgAggregateOutputType = {
    category_id: number | null
  }

  export type MemoCategorySumAggregateOutputType = {
    category_id: number | null
  }

  export type MemoCategoryMinAggregateOutputType = {
    memo_id: string | null
    category_id: number | null
  }

  export type MemoCategoryMaxAggregateOutputType = {
    memo_id: string | null
    category_id: number | null
  }

  export type MemoCategoryCountAggregateOutputType = {
    memo_id: number
    category_id: number
    _all: number
  }


  export type MemoCategoryAvgAggregateInputType = {
    category_id?: true
  }

  export type MemoCategorySumAggregateInputType = {
    category_id?: true
  }

  export type MemoCategoryMinAggregateInputType = {
    memo_id?: true
    category_id?: true
  }

  export type MemoCategoryMaxAggregateInputType = {
    memo_id?: true
    category_id?: true
  }

  export type MemoCategoryCountAggregateInputType = {
    memo_id?: true
    category_id?: true
    _all?: true
  }

  export type MemoCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemoCategory to aggregate.
     */
    where?: MemoCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoCategories to fetch.
     */
    orderBy?: MemoCategoryOrderByWithRelationInput | MemoCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemoCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemoCategories
    **/
    _count?: true | MemoCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemoCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemoCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemoCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemoCategoryMaxAggregateInputType
  }

  export type GetMemoCategoryAggregateType<T extends MemoCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateMemoCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemoCategory[P]>
      : GetScalarType<T[P], AggregateMemoCategory[P]>
  }




  export type MemoCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoCategoryWhereInput
    orderBy?: MemoCategoryOrderByWithAggregationInput | MemoCategoryOrderByWithAggregationInput[]
    by: MemoCategoryScalarFieldEnum[] | MemoCategoryScalarFieldEnum
    having?: MemoCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemoCategoryCountAggregateInputType | true
    _avg?: MemoCategoryAvgAggregateInputType
    _sum?: MemoCategorySumAggregateInputType
    _min?: MemoCategoryMinAggregateInputType
    _max?: MemoCategoryMaxAggregateInputType
  }

  export type MemoCategoryGroupByOutputType = {
    memo_id: string
    category_id: number
    _count: MemoCategoryCountAggregateOutputType | null
    _avg: MemoCategoryAvgAggregateOutputType | null
    _sum: MemoCategorySumAggregateOutputType | null
    _min: MemoCategoryMinAggregateOutputType | null
    _max: MemoCategoryMaxAggregateOutputType | null
  }

  type GetMemoCategoryGroupByPayload<T extends MemoCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemoCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemoCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemoCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], MemoCategoryGroupByOutputType[P]>
        }
      >
    >


  export type MemoCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    memo_id?: boolean
    category_id?: boolean
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoCategory"]>

  export type MemoCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    memo_id?: boolean
    category_id?: boolean
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoCategory"]>

  export type MemoCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    memo_id?: boolean
    category_id?: boolean
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoCategory"]>

  export type MemoCategorySelectScalar = {
    memo_id?: boolean
    category_id?: boolean
  }

  export type MemoCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"memo_id" | "category_id", ExtArgs["result"]["memoCategory"]>
  export type MemoCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type MemoCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type MemoCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $MemoCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemoCategory"
    objects: {
      memo: Prisma.$MemoPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      memo_id: string
      category_id: number
    }, ExtArgs["result"]["memoCategory"]>
    composites: {}
  }

  type MemoCategoryGetPayload<S extends boolean | null | undefined | MemoCategoryDefaultArgs> = $Result.GetResult<Prisma.$MemoCategoryPayload, S>

  type MemoCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemoCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemoCategoryCountAggregateInputType | true
    }

  export interface MemoCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemoCategory'], meta: { name: 'MemoCategory' } }
    /**
     * Find zero or one MemoCategory that matches the filter.
     * @param {MemoCategoryFindUniqueArgs} args - Arguments to find a MemoCategory
     * @example
     * // Get one MemoCategory
     * const memoCategory = await prisma.memoCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemoCategoryFindUniqueArgs>(args: SelectSubset<T, MemoCategoryFindUniqueArgs<ExtArgs>>): Prisma__MemoCategoryClient<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemoCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemoCategoryFindUniqueOrThrowArgs} args - Arguments to find a MemoCategory
     * @example
     * // Get one MemoCategory
     * const memoCategory = await prisma.memoCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemoCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, MemoCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemoCategoryClient<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemoCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoCategoryFindFirstArgs} args - Arguments to find a MemoCategory
     * @example
     * // Get one MemoCategory
     * const memoCategory = await prisma.memoCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemoCategoryFindFirstArgs>(args?: SelectSubset<T, MemoCategoryFindFirstArgs<ExtArgs>>): Prisma__MemoCategoryClient<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemoCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoCategoryFindFirstOrThrowArgs} args - Arguments to find a MemoCategory
     * @example
     * // Get one MemoCategory
     * const memoCategory = await prisma.memoCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemoCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, MemoCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemoCategoryClient<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemoCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemoCategories
     * const memoCategories = await prisma.memoCategory.findMany()
     * 
     * // Get first 10 MemoCategories
     * const memoCategories = await prisma.memoCategory.findMany({ take: 10 })
     * 
     * // Only select the `memo_id`
     * const memoCategoryWithMemo_idOnly = await prisma.memoCategory.findMany({ select: { memo_id: true } })
     * 
     */
    findMany<T extends MemoCategoryFindManyArgs>(args?: SelectSubset<T, MemoCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemoCategory.
     * @param {MemoCategoryCreateArgs} args - Arguments to create a MemoCategory.
     * @example
     * // Create one MemoCategory
     * const MemoCategory = await prisma.memoCategory.create({
     *   data: {
     *     // ... data to create a MemoCategory
     *   }
     * })
     * 
     */
    create<T extends MemoCategoryCreateArgs>(args: SelectSubset<T, MemoCategoryCreateArgs<ExtArgs>>): Prisma__MemoCategoryClient<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemoCategories.
     * @param {MemoCategoryCreateManyArgs} args - Arguments to create many MemoCategories.
     * @example
     * // Create many MemoCategories
     * const memoCategory = await prisma.memoCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemoCategoryCreateManyArgs>(args?: SelectSubset<T, MemoCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemoCategories and returns the data saved in the database.
     * @param {MemoCategoryCreateManyAndReturnArgs} args - Arguments to create many MemoCategories.
     * @example
     * // Create many MemoCategories
     * const memoCategory = await prisma.memoCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemoCategories and only return the `memo_id`
     * const memoCategoryWithMemo_idOnly = await prisma.memoCategory.createManyAndReturn({
     *   select: { memo_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemoCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, MemoCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemoCategory.
     * @param {MemoCategoryDeleteArgs} args - Arguments to delete one MemoCategory.
     * @example
     * // Delete one MemoCategory
     * const MemoCategory = await prisma.memoCategory.delete({
     *   where: {
     *     // ... filter to delete one MemoCategory
     *   }
     * })
     * 
     */
    delete<T extends MemoCategoryDeleteArgs>(args: SelectSubset<T, MemoCategoryDeleteArgs<ExtArgs>>): Prisma__MemoCategoryClient<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemoCategory.
     * @param {MemoCategoryUpdateArgs} args - Arguments to update one MemoCategory.
     * @example
     * // Update one MemoCategory
     * const memoCategory = await prisma.memoCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemoCategoryUpdateArgs>(args: SelectSubset<T, MemoCategoryUpdateArgs<ExtArgs>>): Prisma__MemoCategoryClient<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemoCategories.
     * @param {MemoCategoryDeleteManyArgs} args - Arguments to filter MemoCategories to delete.
     * @example
     * // Delete a few MemoCategories
     * const { count } = await prisma.memoCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemoCategoryDeleteManyArgs>(args?: SelectSubset<T, MemoCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemoCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemoCategories
     * const memoCategory = await prisma.memoCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemoCategoryUpdateManyArgs>(args: SelectSubset<T, MemoCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemoCategories and returns the data updated in the database.
     * @param {MemoCategoryUpdateManyAndReturnArgs} args - Arguments to update many MemoCategories.
     * @example
     * // Update many MemoCategories
     * const memoCategory = await prisma.memoCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemoCategories and only return the `memo_id`
     * const memoCategoryWithMemo_idOnly = await prisma.memoCategory.updateManyAndReturn({
     *   select: { memo_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemoCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, MemoCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemoCategory.
     * @param {MemoCategoryUpsertArgs} args - Arguments to update or create a MemoCategory.
     * @example
     * // Update or create a MemoCategory
     * const memoCategory = await prisma.memoCategory.upsert({
     *   create: {
     *     // ... data to create a MemoCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemoCategory we want to update
     *   }
     * })
     */
    upsert<T extends MemoCategoryUpsertArgs>(args: SelectSubset<T, MemoCategoryUpsertArgs<ExtArgs>>): Prisma__MemoCategoryClient<$Result.GetResult<Prisma.$MemoCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemoCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoCategoryCountArgs} args - Arguments to filter MemoCategories to count.
     * @example
     * // Count the number of MemoCategories
     * const count = await prisma.memoCategory.count({
     *   where: {
     *     // ... the filter for the MemoCategories we want to count
     *   }
     * })
    **/
    count<T extends MemoCategoryCountArgs>(
      args?: Subset<T, MemoCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemoCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemoCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemoCategoryAggregateArgs>(args: Subset<T, MemoCategoryAggregateArgs>): Prisma.PrismaPromise<GetMemoCategoryAggregateType<T>>

    /**
     * Group by MemoCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemoCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemoCategoryGroupByArgs['orderBy'] }
        : { orderBy?: MemoCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemoCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemoCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemoCategory model
   */
  readonly fields: MemoCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemoCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemoCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memo<T extends MemoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemoDefaultArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemoCategory model
   */
  interface MemoCategoryFieldRefs {
    readonly memo_id: FieldRef<"MemoCategory", 'String'>
    readonly category_id: FieldRef<"MemoCategory", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MemoCategory findUnique
   */
  export type MemoCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MemoCategory to fetch.
     */
    where: MemoCategoryWhereUniqueInput
  }

  /**
   * MemoCategory findUniqueOrThrow
   */
  export type MemoCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MemoCategory to fetch.
     */
    where: MemoCategoryWhereUniqueInput
  }

  /**
   * MemoCategory findFirst
   */
  export type MemoCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MemoCategory to fetch.
     */
    where?: MemoCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoCategories to fetch.
     */
    orderBy?: MemoCategoryOrderByWithRelationInput | MemoCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemoCategories.
     */
    cursor?: MemoCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemoCategories.
     */
    distinct?: MemoCategoryScalarFieldEnum | MemoCategoryScalarFieldEnum[]
  }

  /**
   * MemoCategory findFirstOrThrow
   */
  export type MemoCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MemoCategory to fetch.
     */
    where?: MemoCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoCategories to fetch.
     */
    orderBy?: MemoCategoryOrderByWithRelationInput | MemoCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemoCategories.
     */
    cursor?: MemoCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemoCategories.
     */
    distinct?: MemoCategoryScalarFieldEnum | MemoCategoryScalarFieldEnum[]
  }

  /**
   * MemoCategory findMany
   */
  export type MemoCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    /**
     * Filter, which MemoCategories to fetch.
     */
    where?: MemoCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoCategories to fetch.
     */
    orderBy?: MemoCategoryOrderByWithRelationInput | MemoCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemoCategories.
     */
    cursor?: MemoCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoCategories.
     */
    skip?: number
    distinct?: MemoCategoryScalarFieldEnum | MemoCategoryScalarFieldEnum[]
  }

  /**
   * MemoCategory create
   */
  export type MemoCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a MemoCategory.
     */
    data: XOR<MemoCategoryCreateInput, MemoCategoryUncheckedCreateInput>
  }

  /**
   * MemoCategory createMany
   */
  export type MemoCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemoCategories.
     */
    data: MemoCategoryCreateManyInput | MemoCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemoCategory createManyAndReturn
   */
  export type MemoCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many MemoCategories.
     */
    data: MemoCategoryCreateManyInput | MemoCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemoCategory update
   */
  export type MemoCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a MemoCategory.
     */
    data: XOR<MemoCategoryUpdateInput, MemoCategoryUncheckedUpdateInput>
    /**
     * Choose, which MemoCategory to update.
     */
    where: MemoCategoryWhereUniqueInput
  }

  /**
   * MemoCategory updateMany
   */
  export type MemoCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemoCategories.
     */
    data: XOR<MemoCategoryUpdateManyMutationInput, MemoCategoryUncheckedUpdateManyInput>
    /**
     * Filter which MemoCategories to update
     */
    where?: MemoCategoryWhereInput
    /**
     * Limit how many MemoCategories to update.
     */
    limit?: number
  }

  /**
   * MemoCategory updateManyAndReturn
   */
  export type MemoCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * The data used to update MemoCategories.
     */
    data: XOR<MemoCategoryUpdateManyMutationInput, MemoCategoryUncheckedUpdateManyInput>
    /**
     * Filter which MemoCategories to update
     */
    where?: MemoCategoryWhereInput
    /**
     * Limit how many MemoCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemoCategory upsert
   */
  export type MemoCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the MemoCategory to update in case it exists.
     */
    where: MemoCategoryWhereUniqueInput
    /**
     * In case the MemoCategory found by the `where` argument doesn't exist, create a new MemoCategory with this data.
     */
    create: XOR<MemoCategoryCreateInput, MemoCategoryUncheckedCreateInput>
    /**
     * In case the MemoCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemoCategoryUpdateInput, MemoCategoryUncheckedUpdateInput>
  }

  /**
   * MemoCategory delete
   */
  export type MemoCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
    /**
     * Filter which MemoCategory to delete.
     */
    where: MemoCategoryWhereUniqueInput
  }

  /**
   * MemoCategory deleteMany
   */
  export type MemoCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemoCategories to delete
     */
    where?: MemoCategoryWhereInput
    /**
     * Limit how many MemoCategories to delete.
     */
    limit?: number
  }

  /**
   * MemoCategory without action
   */
  export type MemoCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoCategory
     */
    select?: MemoCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoCategory
     */
    omit?: MemoCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    name: string | null
    user_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    name: string | null
    user_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: number
    name: string
    user_id: string
    created_at: Date
    updated_at: Date
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    memos?: boolean | Tag$memosArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "user_id" | "created_at" | "updated_at", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memos?: boolean | Tag$memosArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      memos: Prisma.$MemoTagPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      user_id: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memos<T extends Tag$memosArgs<ExtArgs> = {}>(args?: Subset<T, Tag$memosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'Int'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly user_id: FieldRef<"Tag", 'String'>
    readonly created_at: FieldRef<"Tag", 'DateTime'>
    readonly updated_at: FieldRef<"Tag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.memos
   */
  export type Tag$memosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    where?: MemoTagWhereInput
    orderBy?: MemoTagOrderByWithRelationInput | MemoTagOrderByWithRelationInput[]
    cursor?: MemoTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoTagScalarFieldEnum | MemoTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model MemoTag
   */

  export type AggregateMemoTag = {
    _count: MemoTagCountAggregateOutputType | null
    _avg: MemoTagAvgAggregateOutputType | null
    _sum: MemoTagSumAggregateOutputType | null
    _min: MemoTagMinAggregateOutputType | null
    _max: MemoTagMaxAggregateOutputType | null
  }

  export type MemoTagAvgAggregateOutputType = {
    tag_id: number | null
  }

  export type MemoTagSumAggregateOutputType = {
    tag_id: number | null
  }

  export type MemoTagMinAggregateOutputType = {
    memo_id: string | null
    tag_id: number | null
  }

  export type MemoTagMaxAggregateOutputType = {
    memo_id: string | null
    tag_id: number | null
  }

  export type MemoTagCountAggregateOutputType = {
    memo_id: number
    tag_id: number
    _all: number
  }


  export type MemoTagAvgAggregateInputType = {
    tag_id?: true
  }

  export type MemoTagSumAggregateInputType = {
    tag_id?: true
  }

  export type MemoTagMinAggregateInputType = {
    memo_id?: true
    tag_id?: true
  }

  export type MemoTagMaxAggregateInputType = {
    memo_id?: true
    tag_id?: true
  }

  export type MemoTagCountAggregateInputType = {
    memo_id?: true
    tag_id?: true
    _all?: true
  }

  export type MemoTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemoTag to aggregate.
     */
    where?: MemoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoTags to fetch.
     */
    orderBy?: MemoTagOrderByWithRelationInput | MemoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemoTags
    **/
    _count?: true | MemoTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemoTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemoTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemoTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemoTagMaxAggregateInputType
  }

  export type GetMemoTagAggregateType<T extends MemoTagAggregateArgs> = {
        [P in keyof T & keyof AggregateMemoTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemoTag[P]>
      : GetScalarType<T[P], AggregateMemoTag[P]>
  }




  export type MemoTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoTagWhereInput
    orderBy?: MemoTagOrderByWithAggregationInput | MemoTagOrderByWithAggregationInput[]
    by: MemoTagScalarFieldEnum[] | MemoTagScalarFieldEnum
    having?: MemoTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemoTagCountAggregateInputType | true
    _avg?: MemoTagAvgAggregateInputType
    _sum?: MemoTagSumAggregateInputType
    _min?: MemoTagMinAggregateInputType
    _max?: MemoTagMaxAggregateInputType
  }

  export type MemoTagGroupByOutputType = {
    memo_id: string
    tag_id: number
    _count: MemoTagCountAggregateOutputType | null
    _avg: MemoTagAvgAggregateOutputType | null
    _sum: MemoTagSumAggregateOutputType | null
    _min: MemoTagMinAggregateOutputType | null
    _max: MemoTagMaxAggregateOutputType | null
  }

  type GetMemoTagGroupByPayload<T extends MemoTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemoTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemoTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemoTagGroupByOutputType[P]>
            : GetScalarType<T[P], MemoTagGroupByOutputType[P]>
        }
      >
    >


  export type MemoTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    memo_id?: boolean
    tag_id?: boolean
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoTag"]>

  export type MemoTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    memo_id?: boolean
    tag_id?: boolean
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoTag"]>

  export type MemoTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    memo_id?: boolean
    tag_id?: boolean
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoTag"]>

  export type MemoTagSelectScalar = {
    memo_id?: boolean
    tag_id?: boolean
  }

  export type MemoTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"memo_id" | "tag_id", ExtArgs["result"]["memoTag"]>
  export type MemoTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type MemoTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type MemoTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memo?: boolean | MemoDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $MemoTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemoTag"
    objects: {
      memo: Prisma.$MemoPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      memo_id: string
      tag_id: number
    }, ExtArgs["result"]["memoTag"]>
    composites: {}
  }

  type MemoTagGetPayload<S extends boolean | null | undefined | MemoTagDefaultArgs> = $Result.GetResult<Prisma.$MemoTagPayload, S>

  type MemoTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemoTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemoTagCountAggregateInputType | true
    }

  export interface MemoTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemoTag'], meta: { name: 'MemoTag' } }
    /**
     * Find zero or one MemoTag that matches the filter.
     * @param {MemoTagFindUniqueArgs} args - Arguments to find a MemoTag
     * @example
     * // Get one MemoTag
     * const memoTag = await prisma.memoTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemoTagFindUniqueArgs>(args: SelectSubset<T, MemoTagFindUniqueArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemoTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemoTagFindUniqueOrThrowArgs} args - Arguments to find a MemoTag
     * @example
     * // Get one MemoTag
     * const memoTag = await prisma.memoTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemoTagFindUniqueOrThrowArgs>(args: SelectSubset<T, MemoTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemoTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagFindFirstArgs} args - Arguments to find a MemoTag
     * @example
     * // Get one MemoTag
     * const memoTag = await prisma.memoTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemoTagFindFirstArgs>(args?: SelectSubset<T, MemoTagFindFirstArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemoTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagFindFirstOrThrowArgs} args - Arguments to find a MemoTag
     * @example
     * // Get one MemoTag
     * const memoTag = await prisma.memoTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemoTagFindFirstOrThrowArgs>(args?: SelectSubset<T, MemoTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemoTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemoTags
     * const memoTags = await prisma.memoTag.findMany()
     * 
     * // Get first 10 MemoTags
     * const memoTags = await prisma.memoTag.findMany({ take: 10 })
     * 
     * // Only select the `memo_id`
     * const memoTagWithMemo_idOnly = await prisma.memoTag.findMany({ select: { memo_id: true } })
     * 
     */
    findMany<T extends MemoTagFindManyArgs>(args?: SelectSubset<T, MemoTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemoTag.
     * @param {MemoTagCreateArgs} args - Arguments to create a MemoTag.
     * @example
     * // Create one MemoTag
     * const MemoTag = await prisma.memoTag.create({
     *   data: {
     *     // ... data to create a MemoTag
     *   }
     * })
     * 
     */
    create<T extends MemoTagCreateArgs>(args: SelectSubset<T, MemoTagCreateArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemoTags.
     * @param {MemoTagCreateManyArgs} args - Arguments to create many MemoTags.
     * @example
     * // Create many MemoTags
     * const memoTag = await prisma.memoTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemoTagCreateManyArgs>(args?: SelectSubset<T, MemoTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemoTags and returns the data saved in the database.
     * @param {MemoTagCreateManyAndReturnArgs} args - Arguments to create many MemoTags.
     * @example
     * // Create many MemoTags
     * const memoTag = await prisma.memoTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemoTags and only return the `memo_id`
     * const memoTagWithMemo_idOnly = await prisma.memoTag.createManyAndReturn({
     *   select: { memo_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemoTagCreateManyAndReturnArgs>(args?: SelectSubset<T, MemoTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemoTag.
     * @param {MemoTagDeleteArgs} args - Arguments to delete one MemoTag.
     * @example
     * // Delete one MemoTag
     * const MemoTag = await prisma.memoTag.delete({
     *   where: {
     *     // ... filter to delete one MemoTag
     *   }
     * })
     * 
     */
    delete<T extends MemoTagDeleteArgs>(args: SelectSubset<T, MemoTagDeleteArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemoTag.
     * @param {MemoTagUpdateArgs} args - Arguments to update one MemoTag.
     * @example
     * // Update one MemoTag
     * const memoTag = await prisma.memoTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemoTagUpdateArgs>(args: SelectSubset<T, MemoTagUpdateArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemoTags.
     * @param {MemoTagDeleteManyArgs} args - Arguments to filter MemoTags to delete.
     * @example
     * // Delete a few MemoTags
     * const { count } = await prisma.memoTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemoTagDeleteManyArgs>(args?: SelectSubset<T, MemoTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemoTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemoTags
     * const memoTag = await prisma.memoTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemoTagUpdateManyArgs>(args: SelectSubset<T, MemoTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemoTags and returns the data updated in the database.
     * @param {MemoTagUpdateManyAndReturnArgs} args - Arguments to update many MemoTags.
     * @example
     * // Update many MemoTags
     * const memoTag = await prisma.memoTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemoTags and only return the `memo_id`
     * const memoTagWithMemo_idOnly = await prisma.memoTag.updateManyAndReturn({
     *   select: { memo_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemoTagUpdateManyAndReturnArgs>(args: SelectSubset<T, MemoTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemoTag.
     * @param {MemoTagUpsertArgs} args - Arguments to update or create a MemoTag.
     * @example
     * // Update or create a MemoTag
     * const memoTag = await prisma.memoTag.upsert({
     *   create: {
     *     // ... data to create a MemoTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemoTag we want to update
     *   }
     * })
     */
    upsert<T extends MemoTagUpsertArgs>(args: SelectSubset<T, MemoTagUpsertArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemoTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagCountArgs} args - Arguments to filter MemoTags to count.
     * @example
     * // Count the number of MemoTags
     * const count = await prisma.memoTag.count({
     *   where: {
     *     // ... the filter for the MemoTags we want to count
     *   }
     * })
    **/
    count<T extends MemoTagCountArgs>(
      args?: Subset<T, MemoTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemoTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemoTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemoTagAggregateArgs>(args: Subset<T, MemoTagAggregateArgs>): Prisma.PrismaPromise<GetMemoTagAggregateType<T>>

    /**
     * Group by MemoTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemoTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemoTagGroupByArgs['orderBy'] }
        : { orderBy?: MemoTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemoTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemoTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemoTag model
   */
  readonly fields: MemoTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemoTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemoTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memo<T extends MemoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemoDefaultArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemoTag model
   */
  interface MemoTagFieldRefs {
    readonly memo_id: FieldRef<"MemoTag", 'String'>
    readonly tag_id: FieldRef<"MemoTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MemoTag findUnique
   */
  export type MemoTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoTag to fetch.
     */
    where: MemoTagWhereUniqueInput
  }

  /**
   * MemoTag findUniqueOrThrow
   */
  export type MemoTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoTag to fetch.
     */
    where: MemoTagWhereUniqueInput
  }

  /**
   * MemoTag findFirst
   */
  export type MemoTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoTag to fetch.
     */
    where?: MemoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoTags to fetch.
     */
    orderBy?: MemoTagOrderByWithRelationInput | MemoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemoTags.
     */
    cursor?: MemoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemoTags.
     */
    distinct?: MemoTagScalarFieldEnum | MemoTagScalarFieldEnum[]
  }

  /**
   * MemoTag findFirstOrThrow
   */
  export type MemoTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoTag to fetch.
     */
    where?: MemoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoTags to fetch.
     */
    orderBy?: MemoTagOrderByWithRelationInput | MemoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemoTags.
     */
    cursor?: MemoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemoTags.
     */
    distinct?: MemoTagScalarFieldEnum | MemoTagScalarFieldEnum[]
  }

  /**
   * MemoTag findMany
   */
  export type MemoTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoTags to fetch.
     */
    where?: MemoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoTags to fetch.
     */
    orderBy?: MemoTagOrderByWithRelationInput | MemoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemoTags.
     */
    cursor?: MemoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoTags.
     */
    skip?: number
    distinct?: MemoTagScalarFieldEnum | MemoTagScalarFieldEnum[]
  }

  /**
   * MemoTag create
   */
  export type MemoTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * The data needed to create a MemoTag.
     */
    data: XOR<MemoTagCreateInput, MemoTagUncheckedCreateInput>
  }

  /**
   * MemoTag createMany
   */
  export type MemoTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemoTags.
     */
    data: MemoTagCreateManyInput | MemoTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemoTag createManyAndReturn
   */
  export type MemoTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * The data used to create many MemoTags.
     */
    data: MemoTagCreateManyInput | MemoTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemoTag update
   */
  export type MemoTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * The data needed to update a MemoTag.
     */
    data: XOR<MemoTagUpdateInput, MemoTagUncheckedUpdateInput>
    /**
     * Choose, which MemoTag to update.
     */
    where: MemoTagWhereUniqueInput
  }

  /**
   * MemoTag updateMany
   */
  export type MemoTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemoTags.
     */
    data: XOR<MemoTagUpdateManyMutationInput, MemoTagUncheckedUpdateManyInput>
    /**
     * Filter which MemoTags to update
     */
    where?: MemoTagWhereInput
    /**
     * Limit how many MemoTags to update.
     */
    limit?: number
  }

  /**
   * MemoTag updateManyAndReturn
   */
  export type MemoTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * The data used to update MemoTags.
     */
    data: XOR<MemoTagUpdateManyMutationInput, MemoTagUncheckedUpdateManyInput>
    /**
     * Filter which MemoTags to update
     */
    where?: MemoTagWhereInput
    /**
     * Limit how many MemoTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemoTag upsert
   */
  export type MemoTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * The filter to search for the MemoTag to update in case it exists.
     */
    where: MemoTagWhereUniqueInput
    /**
     * In case the MemoTag found by the `where` argument doesn't exist, create a new MemoTag with this data.
     */
    create: XOR<MemoTagCreateInput, MemoTagUncheckedCreateInput>
    /**
     * In case the MemoTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemoTagUpdateInput, MemoTagUncheckedUpdateInput>
  }

  /**
   * MemoTag delete
   */
  export type MemoTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter which MemoTag to delete.
     */
    where: MemoTagWhereUniqueInput
  }

  /**
   * MemoTag deleteMany
   */
  export type MemoTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemoTags to delete
     */
    where?: MemoTagWhereInput
    /**
     * Limit how many MemoTags to delete.
     */
    limit?: number
  }

  /**
   * MemoTag without action
   */
  export type MemoTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    avatar: 'avatar',
    user_name: 'user_name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const MemoScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    title: 'title',
    content: 'content',
    importance: 'importance',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type MemoScalarFieldEnum = (typeof MemoScalarFieldEnum)[keyof typeof MemoScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    user_id: 'user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const MemoCategoryScalarFieldEnum: {
    memo_id: 'memo_id',
    category_id: 'category_id'
  };

  export type MemoCategoryScalarFieldEnum = (typeof MemoCategoryScalarFieldEnum)[keyof typeof MemoCategoryScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    user_id: 'user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const MemoTagScalarFieldEnum: {
    memo_id: 'memo_id',
    tag_id: 'tag_id'
  };

  export type MemoTagScalarFieldEnum = (typeof MemoTagScalarFieldEnum)[keyof typeof MemoTagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    memos?: MemoListRelationFilter
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    categories?: CategoryListRelationFilter
    tags?: TagListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    memos?: MemoOrderByRelationAggregateInput
    profile?: ProfileOrderByWithRelationInput
    categories?: CategoryOrderByRelationAggregateInput
    tags?: TagOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    memos?: MemoListRelationFilter
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    categories?: CategoryListRelationFilter
    tags?: TagListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: UuidFilter<"Profile"> | string
    user_id?: UuidFilter<"Profile"> | string
    avatar?: StringNullableFilter<"Profile"> | string | null
    user_name?: StringNullableFilter<"Profile"> | string | null
    created_at?: DateTimeFilter<"Profile"> | Date | string
    updated_at?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    avatar?: SortOrderInput | SortOrder
    user_name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    user_name?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    avatar?: StringNullableFilter<"Profile"> | string | null
    created_at?: DateTimeFilter<"Profile"> | Date | string
    updated_at?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "user_id" | "user_name">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    avatar?: SortOrderInput | SortOrder
    user_name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Profile"> | string
    user_id?: UuidWithAggregatesFilter<"Profile"> | string
    avatar?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    user_name?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type MemoWhereInput = {
    AND?: MemoWhereInput | MemoWhereInput[]
    OR?: MemoWhereInput[]
    NOT?: MemoWhereInput | MemoWhereInput[]
    id?: UuidFilter<"Memo"> | string
    user_id?: UuidFilter<"Memo"> | string
    title?: StringFilter<"Memo"> | string
    content?: StringFilter<"Memo"> | string
    importance?: StringFilter<"Memo"> | string
    created_at?: DateTimeFilter<"Memo"> | Date | string
    updated_at?: DateTimeFilter<"Memo"> | Date | string
    category?: MemoCategoryListRelationFilter
    tags?: MemoTagListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MemoOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    importance?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category?: MemoCategoryOrderByRelationAggregateInput
    tags?: MemoTagOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type MemoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MemoWhereInput | MemoWhereInput[]
    OR?: MemoWhereInput[]
    NOT?: MemoWhereInput | MemoWhereInput[]
    user_id?: UuidFilter<"Memo"> | string
    title?: StringFilter<"Memo"> | string
    content?: StringFilter<"Memo"> | string
    importance?: StringFilter<"Memo"> | string
    created_at?: DateTimeFilter<"Memo"> | Date | string
    updated_at?: DateTimeFilter<"Memo"> | Date | string
    category?: MemoCategoryListRelationFilter
    tags?: MemoTagListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MemoOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    importance?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: MemoCountOrderByAggregateInput
    _max?: MemoMaxOrderByAggregateInput
    _min?: MemoMinOrderByAggregateInput
  }

  export type MemoScalarWhereWithAggregatesInput = {
    AND?: MemoScalarWhereWithAggregatesInput | MemoScalarWhereWithAggregatesInput[]
    OR?: MemoScalarWhereWithAggregatesInput[]
    NOT?: MemoScalarWhereWithAggregatesInput | MemoScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Memo"> | string
    user_id?: UuidWithAggregatesFilter<"Memo"> | string
    title?: StringWithAggregatesFilter<"Memo"> | string
    content?: StringWithAggregatesFilter<"Memo"> | string
    importance?: StringWithAggregatesFilter<"Memo"> | string
    created_at?: DateTimeWithAggregatesFilter<"Memo"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Memo"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    user_id?: UuidFilter<"Category"> | string
    created_at?: DateTimeFilter<"Category"> | Date | string
    updated_at?: DateTimeFilter<"Category"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    memo_categories?: MemoCategoryListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    memo_categories?: MemoCategoryOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id_name?: CategoryUser_idNameCompoundUniqueInput
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    user_id?: UuidFilter<"Category"> | string
    created_at?: DateTimeFilter<"Category"> | Date | string
    updated_at?: DateTimeFilter<"Category"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    memo_categories?: MemoCategoryListRelationFilter
  }, "id" | "user_id_name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
    user_id?: UuidWithAggregatesFilter<"Category"> | string
    created_at?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type MemoCategoryWhereInput = {
    AND?: MemoCategoryWhereInput | MemoCategoryWhereInput[]
    OR?: MemoCategoryWhereInput[]
    NOT?: MemoCategoryWhereInput | MemoCategoryWhereInput[]
    memo_id?: UuidFilter<"MemoCategory"> | string
    category_id?: IntFilter<"MemoCategory"> | number
    memo?: XOR<MemoScalarRelationFilter, MemoWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type MemoCategoryOrderByWithRelationInput = {
    memo_id?: SortOrder
    category_id?: SortOrder
    memo?: MemoOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type MemoCategoryWhereUniqueInput = Prisma.AtLeast<{
    memo_id_category_id?: MemoCategoryMemo_idCategory_idCompoundUniqueInput
    AND?: MemoCategoryWhereInput | MemoCategoryWhereInput[]
    OR?: MemoCategoryWhereInput[]
    NOT?: MemoCategoryWhereInput | MemoCategoryWhereInput[]
    memo_id?: UuidFilter<"MemoCategory"> | string
    category_id?: IntFilter<"MemoCategory"> | number
    memo?: XOR<MemoScalarRelationFilter, MemoWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "memo_id_category_id">

  export type MemoCategoryOrderByWithAggregationInput = {
    memo_id?: SortOrder
    category_id?: SortOrder
    _count?: MemoCategoryCountOrderByAggregateInput
    _avg?: MemoCategoryAvgOrderByAggregateInput
    _max?: MemoCategoryMaxOrderByAggregateInput
    _min?: MemoCategoryMinOrderByAggregateInput
    _sum?: MemoCategorySumOrderByAggregateInput
  }

  export type MemoCategoryScalarWhereWithAggregatesInput = {
    AND?: MemoCategoryScalarWhereWithAggregatesInput | MemoCategoryScalarWhereWithAggregatesInput[]
    OR?: MemoCategoryScalarWhereWithAggregatesInput[]
    NOT?: MemoCategoryScalarWhereWithAggregatesInput | MemoCategoryScalarWhereWithAggregatesInput[]
    memo_id?: UuidWithAggregatesFilter<"MemoCategory"> | string
    category_id?: IntWithAggregatesFilter<"MemoCategory"> | number
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
    user_id?: UuidFilter<"Tag"> | string
    created_at?: DateTimeFilter<"Tag"> | Date | string
    updated_at?: DateTimeFilter<"Tag"> | Date | string
    memos?: MemoTagListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    memos?: MemoTagOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    user_id_name?: TagUser_idNameCompoundUniqueInput
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    user_id?: UuidFilter<"Tag"> | string
    created_at?: DateTimeFilter<"Tag"> | Date | string
    updated_at?: DateTimeFilter<"Tag"> | Date | string
    memos?: MemoTagListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "name" | "user_id_name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _avg?: TagAvgOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
    _sum?: TagSumOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tag"> | number
    name?: StringWithAggregatesFilter<"Tag"> | string
    user_id?: UuidWithAggregatesFilter<"Tag"> | string
    created_at?: DateTimeWithAggregatesFilter<"Tag"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Tag"> | Date | string
  }

  export type MemoTagWhereInput = {
    AND?: MemoTagWhereInput | MemoTagWhereInput[]
    OR?: MemoTagWhereInput[]
    NOT?: MemoTagWhereInput | MemoTagWhereInput[]
    memo_id?: UuidFilter<"MemoTag"> | string
    tag_id?: IntFilter<"MemoTag"> | number
    memo?: XOR<MemoScalarRelationFilter, MemoWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type MemoTagOrderByWithRelationInput = {
    memo_id?: SortOrder
    tag_id?: SortOrder
    memo?: MemoOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type MemoTagWhereUniqueInput = Prisma.AtLeast<{
    memo_id_tag_id?: MemoTagMemo_idTag_idCompoundUniqueInput
    AND?: MemoTagWhereInput | MemoTagWhereInput[]
    OR?: MemoTagWhereInput[]
    NOT?: MemoTagWhereInput | MemoTagWhereInput[]
    memo_id?: UuidFilter<"MemoTag"> | string
    tag_id?: IntFilter<"MemoTag"> | number
    memo?: XOR<MemoScalarRelationFilter, MemoWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "memo_id_tag_id">

  export type MemoTagOrderByWithAggregationInput = {
    memo_id?: SortOrder
    tag_id?: SortOrder
    _count?: MemoTagCountOrderByAggregateInput
    _avg?: MemoTagAvgOrderByAggregateInput
    _max?: MemoTagMaxOrderByAggregateInput
    _min?: MemoTagMinOrderByAggregateInput
    _sum?: MemoTagSumOrderByAggregateInput
  }

  export type MemoTagScalarWhereWithAggregatesInput = {
    AND?: MemoTagScalarWhereWithAggregatesInput | MemoTagScalarWhereWithAggregatesInput[]
    OR?: MemoTagScalarWhereWithAggregatesInput[]
    NOT?: MemoTagScalarWhereWithAggregatesInput | MemoTagScalarWhereWithAggregatesInput[]
    memo_id?: UuidWithAggregatesFilter<"MemoTag"> | string
    tag_id?: IntWithAggregatesFilter<"MemoTag"> | number
  }

  export type UserCreateInput = {
    id: string
    memos?: MemoCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    tags?: TagCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    memos?: MemoUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    tags?: TagUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memos?: MemoUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    categories?: CategoryUpdateManyWithoutUserNestedInput
    tags?: TagUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memos?: MemoUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    tags?: TagUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type ProfileCreateInput = {
    id?: string
    avatar?: string | null
    user_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    user_id: string
    avatar?: string | null
    user_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateManyInput = {
    id?: string
    user_id: string
    avatar?: string | null
    user_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoCreateInput = {
    id?: string
    title: string
    content: string
    importance: string
    created_at?: Date | string
    updated_at?: Date | string
    category?: MemoCategoryCreateNestedManyWithoutMemoInput
    tags?: MemoTagCreateNestedManyWithoutMemoInput
    user: UserCreateNestedOneWithoutMemosInput
  }

  export type MemoUncheckedCreateInput = {
    id?: string
    user_id: string
    title: string
    content: string
    importance: string
    created_at?: Date | string
    updated_at?: Date | string
    category?: MemoCategoryUncheckedCreateNestedManyWithoutMemoInput
    tags?: MemoTagUncheckedCreateNestedManyWithoutMemoInput
  }

  export type MemoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: MemoCategoryUpdateManyWithoutMemoNestedInput
    tags?: MemoTagUpdateManyWithoutMemoNestedInput
    user?: UserUpdateOneRequiredWithoutMemosNestedInput
  }

  export type MemoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: MemoCategoryUncheckedUpdateManyWithoutMemoNestedInput
    tags?: MemoTagUncheckedUpdateManyWithoutMemoNestedInput
  }

  export type MemoCreateManyInput = {
    id?: string
    user_id: string
    title: string
    content: string
    importance: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MemoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutCategoriesInput
    memo_categories?: MemoCategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string
    memo_categories?: MemoCategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCategoriesNestedInput
    memo_categories?: MemoCategoryUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    memo_categories?: MemoCategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoCategoryCreateInput = {
    memo: MemoCreateNestedOneWithoutCategoryInput
    category: CategoryCreateNestedOneWithoutMemo_categoriesInput
  }

  export type MemoCategoryUncheckedCreateInput = {
    memo_id: string
    category_id: number
  }

  export type MemoCategoryUpdateInput = {
    memo?: MemoUpdateOneRequiredWithoutCategoryNestedInput
    category?: CategoryUpdateOneRequiredWithoutMemo_categoriesNestedInput
  }

  export type MemoCategoryUncheckedUpdateInput = {
    memo_id?: StringFieldUpdateOperationsInput | string
    category_id?: IntFieldUpdateOperationsInput | number
  }

  export type MemoCategoryCreateManyInput = {
    memo_id: string
    category_id: number
  }

  export type MemoCategoryUpdateManyMutationInput = {

  }

  export type MemoCategoryUncheckedUpdateManyInput = {
    memo_id?: StringFieldUpdateOperationsInput | string
    category_id?: IntFieldUpdateOperationsInput | number
  }

  export type TagCreateInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    memos?: MemoTagCreateNestedManyWithoutTagInput
    user: UserCreateNestedOneWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    name: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string
    memos?: MemoTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    memos?: MemoTagUpdateManyWithoutTagNestedInput
    user?: UserUpdateOneRequiredWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    memos?: MemoTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: number
    name: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoTagCreateInput = {
    memo: MemoCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutMemosInput
  }

  export type MemoTagUncheckedCreateInput = {
    memo_id: string
    tag_id: number
  }

  export type MemoTagUpdateInput = {
    memo?: MemoUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutMemosNestedInput
  }

  export type MemoTagUncheckedUpdateInput = {
    memo_id?: StringFieldUpdateOperationsInput | string
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type MemoTagCreateManyInput = {
    memo_id: string
    tag_id: number
  }

  export type MemoTagUpdateManyMutationInput = {

  }

  export type MemoTagUncheckedUpdateManyInput = {
    memo_id?: StringFieldUpdateOperationsInput | string
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type MemoListRelationFilter = {
    every?: MemoWhereInput
    some?: MemoWhereInput
    none?: MemoWhereInput
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type MemoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    avatar?: SortOrder
    user_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    avatar?: SortOrder
    user_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    avatar?: SortOrder
    user_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type MemoCategoryListRelationFilter = {
    every?: MemoCategoryWhereInput
    some?: MemoCategoryWhereInput
    none?: MemoCategoryWhereInput
  }

  export type MemoTagListRelationFilter = {
    every?: MemoTagWhereInput
    some?: MemoTagWhereInput
    none?: MemoTagWhereInput
  }

  export type MemoCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemoTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemoCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    importance?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MemoMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    importance?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MemoMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    importance?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CategoryUser_idNameCompoundUniqueInput = {
    user_id: string
    name: string
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type MemoScalarRelationFilter = {
    is?: MemoWhereInput
    isNot?: MemoWhereInput
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type MemoCategoryMemo_idCategory_idCompoundUniqueInput = {
    memo_id: string
    category_id: number
  }

  export type MemoCategoryCountOrderByAggregateInput = {
    memo_id?: SortOrder
    category_id?: SortOrder
  }

  export type MemoCategoryAvgOrderByAggregateInput = {
    category_id?: SortOrder
  }

  export type MemoCategoryMaxOrderByAggregateInput = {
    memo_id?: SortOrder
    category_id?: SortOrder
  }

  export type MemoCategoryMinOrderByAggregateInput = {
    memo_id?: SortOrder
    category_id?: SortOrder
  }

  export type MemoCategorySumOrderByAggregateInput = {
    category_id?: SortOrder
  }

  export type TagUser_idNameCompoundUniqueInput = {
    user_id: string
    name: string
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type MemoTagMemo_idTag_idCompoundUniqueInput = {
    memo_id: string
    tag_id: number
  }

  export type MemoTagCountOrderByAggregateInput = {
    memo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type MemoTagAvgOrderByAggregateInput = {
    tag_id?: SortOrder
  }

  export type MemoTagMaxOrderByAggregateInput = {
    memo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type MemoTagMinOrderByAggregateInput = {
    memo_id?: SortOrder
    tag_id?: SortOrder
  }

  export type MemoTagSumOrderByAggregateInput = {
    tag_id?: SortOrder
  }

  export type MemoCreateNestedManyWithoutUserInput = {
    create?: XOR<MemoCreateWithoutUserInput, MemoUncheckedCreateWithoutUserInput> | MemoCreateWithoutUserInput[] | MemoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutUserInput | MemoCreateOrConnectWithoutUserInput[]
    createMany?: MemoCreateManyUserInputEnvelope
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type CategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type TagCreateNestedManyWithoutUserInput = {
    create?: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput> | TagCreateWithoutUserInput[] | TagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TagCreateOrConnectWithoutUserInput | TagCreateOrConnectWithoutUserInput[]
    createMany?: TagCreateManyUserInputEnvelope
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type MemoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MemoCreateWithoutUserInput, MemoUncheckedCreateWithoutUserInput> | MemoCreateWithoutUserInput[] | MemoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutUserInput | MemoCreateOrConnectWithoutUserInput[]
    createMany?: MemoCreateManyUserInputEnvelope
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type CategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type TagUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput> | TagCreateWithoutUserInput[] | TagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TagCreateOrConnectWithoutUserInput | TagCreateOrConnectWithoutUserInput[]
    createMany?: TagCreateManyUserInputEnvelope
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type MemoUpdateManyWithoutUserNestedInput = {
    create?: XOR<MemoCreateWithoutUserInput, MemoUncheckedCreateWithoutUserInput> | MemoCreateWithoutUserInput[] | MemoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutUserInput | MemoCreateOrConnectWithoutUserInput[]
    upsert?: MemoUpsertWithWhereUniqueWithoutUserInput | MemoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MemoCreateManyUserInputEnvelope
    set?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    disconnect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    delete?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    update?: MemoUpdateWithWhereUniqueWithoutUserInput | MemoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MemoUpdateManyWithWhereWithoutUserInput | MemoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MemoScalarWhereInput | MemoScalarWhereInput[]
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type CategoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutUserInput | CategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutUserInput | CategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutUserInput | CategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type TagUpdateManyWithoutUserNestedInput = {
    create?: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput> | TagCreateWithoutUserInput[] | TagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TagCreateOrConnectWithoutUserInput | TagCreateOrConnectWithoutUserInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutUserInput | TagUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TagCreateManyUserInputEnvelope
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutUserInput | TagUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TagUpdateManyWithWhereWithoutUserInput | TagUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type MemoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MemoCreateWithoutUserInput, MemoUncheckedCreateWithoutUserInput> | MemoCreateWithoutUserInput[] | MemoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutUserInput | MemoCreateOrConnectWithoutUserInput[]
    upsert?: MemoUpsertWithWhereUniqueWithoutUserInput | MemoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MemoCreateManyUserInputEnvelope
    set?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    disconnect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    delete?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    update?: MemoUpdateWithWhereUniqueWithoutUserInput | MemoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MemoUpdateManyWithWhereWithoutUserInput | MemoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MemoScalarWhereInput | MemoScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type CategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutUserInput | CategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutUserInput | CategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutUserInput | CategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type TagUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput> | TagCreateWithoutUserInput[] | TagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TagCreateOrConnectWithoutUserInput | TagCreateOrConnectWithoutUserInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutUserInput | TagUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TagCreateManyUserInputEnvelope
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutUserInput | TagUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TagUpdateManyWithWhereWithoutUserInput | TagUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type MemoCategoryCreateNestedManyWithoutMemoInput = {
    create?: XOR<MemoCategoryCreateWithoutMemoInput, MemoCategoryUncheckedCreateWithoutMemoInput> | MemoCategoryCreateWithoutMemoInput[] | MemoCategoryUncheckedCreateWithoutMemoInput[]
    connectOrCreate?: MemoCategoryCreateOrConnectWithoutMemoInput | MemoCategoryCreateOrConnectWithoutMemoInput[]
    createMany?: MemoCategoryCreateManyMemoInputEnvelope
    connect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
  }

  export type MemoTagCreateNestedManyWithoutMemoInput = {
    create?: XOR<MemoTagCreateWithoutMemoInput, MemoTagUncheckedCreateWithoutMemoInput> | MemoTagCreateWithoutMemoInput[] | MemoTagUncheckedCreateWithoutMemoInput[]
    connectOrCreate?: MemoTagCreateOrConnectWithoutMemoInput | MemoTagCreateOrConnectWithoutMemoInput[]
    createMany?: MemoTagCreateManyMemoInputEnvelope
    connect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutMemosInput = {
    create?: XOR<UserCreateWithoutMemosInput, UserUncheckedCreateWithoutMemosInput>
    connectOrCreate?: UserCreateOrConnectWithoutMemosInput
    connect?: UserWhereUniqueInput
  }

  export type MemoCategoryUncheckedCreateNestedManyWithoutMemoInput = {
    create?: XOR<MemoCategoryCreateWithoutMemoInput, MemoCategoryUncheckedCreateWithoutMemoInput> | MemoCategoryCreateWithoutMemoInput[] | MemoCategoryUncheckedCreateWithoutMemoInput[]
    connectOrCreate?: MemoCategoryCreateOrConnectWithoutMemoInput | MemoCategoryCreateOrConnectWithoutMemoInput[]
    createMany?: MemoCategoryCreateManyMemoInputEnvelope
    connect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
  }

  export type MemoTagUncheckedCreateNestedManyWithoutMemoInput = {
    create?: XOR<MemoTagCreateWithoutMemoInput, MemoTagUncheckedCreateWithoutMemoInput> | MemoTagCreateWithoutMemoInput[] | MemoTagUncheckedCreateWithoutMemoInput[]
    connectOrCreate?: MemoTagCreateOrConnectWithoutMemoInput | MemoTagCreateOrConnectWithoutMemoInput[]
    createMany?: MemoTagCreateManyMemoInputEnvelope
    connect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
  }

  export type MemoCategoryUpdateManyWithoutMemoNestedInput = {
    create?: XOR<MemoCategoryCreateWithoutMemoInput, MemoCategoryUncheckedCreateWithoutMemoInput> | MemoCategoryCreateWithoutMemoInput[] | MemoCategoryUncheckedCreateWithoutMemoInput[]
    connectOrCreate?: MemoCategoryCreateOrConnectWithoutMemoInput | MemoCategoryCreateOrConnectWithoutMemoInput[]
    upsert?: MemoCategoryUpsertWithWhereUniqueWithoutMemoInput | MemoCategoryUpsertWithWhereUniqueWithoutMemoInput[]
    createMany?: MemoCategoryCreateManyMemoInputEnvelope
    set?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    disconnect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    delete?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    connect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    update?: MemoCategoryUpdateWithWhereUniqueWithoutMemoInput | MemoCategoryUpdateWithWhereUniqueWithoutMemoInput[]
    updateMany?: MemoCategoryUpdateManyWithWhereWithoutMemoInput | MemoCategoryUpdateManyWithWhereWithoutMemoInput[]
    deleteMany?: MemoCategoryScalarWhereInput | MemoCategoryScalarWhereInput[]
  }

  export type MemoTagUpdateManyWithoutMemoNestedInput = {
    create?: XOR<MemoTagCreateWithoutMemoInput, MemoTagUncheckedCreateWithoutMemoInput> | MemoTagCreateWithoutMemoInput[] | MemoTagUncheckedCreateWithoutMemoInput[]
    connectOrCreate?: MemoTagCreateOrConnectWithoutMemoInput | MemoTagCreateOrConnectWithoutMemoInput[]
    upsert?: MemoTagUpsertWithWhereUniqueWithoutMemoInput | MemoTagUpsertWithWhereUniqueWithoutMemoInput[]
    createMany?: MemoTagCreateManyMemoInputEnvelope
    set?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    disconnect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    delete?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    connect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    update?: MemoTagUpdateWithWhereUniqueWithoutMemoInput | MemoTagUpdateWithWhereUniqueWithoutMemoInput[]
    updateMany?: MemoTagUpdateManyWithWhereWithoutMemoInput | MemoTagUpdateManyWithWhereWithoutMemoInput[]
    deleteMany?: MemoTagScalarWhereInput | MemoTagScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutMemosNestedInput = {
    create?: XOR<UserCreateWithoutMemosInput, UserUncheckedCreateWithoutMemosInput>
    connectOrCreate?: UserCreateOrConnectWithoutMemosInput
    upsert?: UserUpsertWithoutMemosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMemosInput, UserUpdateWithoutMemosInput>, UserUncheckedUpdateWithoutMemosInput>
  }

  export type MemoCategoryUncheckedUpdateManyWithoutMemoNestedInput = {
    create?: XOR<MemoCategoryCreateWithoutMemoInput, MemoCategoryUncheckedCreateWithoutMemoInput> | MemoCategoryCreateWithoutMemoInput[] | MemoCategoryUncheckedCreateWithoutMemoInput[]
    connectOrCreate?: MemoCategoryCreateOrConnectWithoutMemoInput | MemoCategoryCreateOrConnectWithoutMemoInput[]
    upsert?: MemoCategoryUpsertWithWhereUniqueWithoutMemoInput | MemoCategoryUpsertWithWhereUniqueWithoutMemoInput[]
    createMany?: MemoCategoryCreateManyMemoInputEnvelope
    set?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    disconnect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    delete?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    connect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    update?: MemoCategoryUpdateWithWhereUniqueWithoutMemoInput | MemoCategoryUpdateWithWhereUniqueWithoutMemoInput[]
    updateMany?: MemoCategoryUpdateManyWithWhereWithoutMemoInput | MemoCategoryUpdateManyWithWhereWithoutMemoInput[]
    deleteMany?: MemoCategoryScalarWhereInput | MemoCategoryScalarWhereInput[]
  }

  export type MemoTagUncheckedUpdateManyWithoutMemoNestedInput = {
    create?: XOR<MemoTagCreateWithoutMemoInput, MemoTagUncheckedCreateWithoutMemoInput> | MemoTagCreateWithoutMemoInput[] | MemoTagUncheckedCreateWithoutMemoInput[]
    connectOrCreate?: MemoTagCreateOrConnectWithoutMemoInput | MemoTagCreateOrConnectWithoutMemoInput[]
    upsert?: MemoTagUpsertWithWhereUniqueWithoutMemoInput | MemoTagUpsertWithWhereUniqueWithoutMemoInput[]
    createMany?: MemoTagCreateManyMemoInputEnvelope
    set?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    disconnect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    delete?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    connect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    update?: MemoTagUpdateWithWhereUniqueWithoutMemoInput | MemoTagUpdateWithWhereUniqueWithoutMemoInput[]
    updateMany?: MemoTagUpdateManyWithWhereWithoutMemoInput | MemoTagUpdateManyWithWhereWithoutMemoInput[]
    deleteMany?: MemoTagScalarWhereInput | MemoTagScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    connect?: UserWhereUniqueInput
  }

  export type MemoCategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<MemoCategoryCreateWithoutCategoryInput, MemoCategoryUncheckedCreateWithoutCategoryInput> | MemoCategoryCreateWithoutCategoryInput[] | MemoCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MemoCategoryCreateOrConnectWithoutCategoryInput | MemoCategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: MemoCategoryCreateManyCategoryInputEnvelope
    connect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
  }

  export type MemoCategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<MemoCategoryCreateWithoutCategoryInput, MemoCategoryUncheckedCreateWithoutCategoryInput> | MemoCategoryCreateWithoutCategoryInput[] | MemoCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MemoCategoryCreateOrConnectWithoutCategoryInput | MemoCategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: MemoCategoryCreateManyCategoryInputEnvelope
    connect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    upsert?: UserUpsertWithoutCategoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCategoriesInput, UserUpdateWithoutCategoriesInput>, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type MemoCategoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<MemoCategoryCreateWithoutCategoryInput, MemoCategoryUncheckedCreateWithoutCategoryInput> | MemoCategoryCreateWithoutCategoryInput[] | MemoCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MemoCategoryCreateOrConnectWithoutCategoryInput | MemoCategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: MemoCategoryUpsertWithWhereUniqueWithoutCategoryInput | MemoCategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: MemoCategoryCreateManyCategoryInputEnvelope
    set?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    disconnect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    delete?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    connect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    update?: MemoCategoryUpdateWithWhereUniqueWithoutCategoryInput | MemoCategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: MemoCategoryUpdateManyWithWhereWithoutCategoryInput | MemoCategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: MemoCategoryScalarWhereInput | MemoCategoryScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MemoCategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<MemoCategoryCreateWithoutCategoryInput, MemoCategoryUncheckedCreateWithoutCategoryInput> | MemoCategoryCreateWithoutCategoryInput[] | MemoCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MemoCategoryCreateOrConnectWithoutCategoryInput | MemoCategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: MemoCategoryUpsertWithWhereUniqueWithoutCategoryInput | MemoCategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: MemoCategoryCreateManyCategoryInputEnvelope
    set?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    disconnect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    delete?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    connect?: MemoCategoryWhereUniqueInput | MemoCategoryWhereUniqueInput[]
    update?: MemoCategoryUpdateWithWhereUniqueWithoutCategoryInput | MemoCategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: MemoCategoryUpdateManyWithWhereWithoutCategoryInput | MemoCategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: MemoCategoryScalarWhereInput | MemoCategoryScalarWhereInput[]
  }

  export type MemoCreateNestedOneWithoutCategoryInput = {
    create?: XOR<MemoCreateWithoutCategoryInput, MemoUncheckedCreateWithoutCategoryInput>
    connectOrCreate?: MemoCreateOrConnectWithoutCategoryInput
    connect?: MemoWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutMemo_categoriesInput = {
    create?: XOR<CategoryCreateWithoutMemo_categoriesInput, CategoryUncheckedCreateWithoutMemo_categoriesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutMemo_categoriesInput
    connect?: CategoryWhereUniqueInput
  }

  export type MemoUpdateOneRequiredWithoutCategoryNestedInput = {
    create?: XOR<MemoCreateWithoutCategoryInput, MemoUncheckedCreateWithoutCategoryInput>
    connectOrCreate?: MemoCreateOrConnectWithoutCategoryInput
    upsert?: MemoUpsertWithoutCategoryInput
    connect?: MemoWhereUniqueInput
    update?: XOR<XOR<MemoUpdateToOneWithWhereWithoutCategoryInput, MemoUpdateWithoutCategoryInput>, MemoUncheckedUpdateWithoutCategoryInput>
  }

  export type CategoryUpdateOneRequiredWithoutMemo_categoriesNestedInput = {
    create?: XOR<CategoryCreateWithoutMemo_categoriesInput, CategoryUncheckedCreateWithoutMemo_categoriesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutMemo_categoriesInput
    upsert?: CategoryUpsertWithoutMemo_categoriesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutMemo_categoriesInput, CategoryUpdateWithoutMemo_categoriesInput>, CategoryUncheckedUpdateWithoutMemo_categoriesInput>
  }

  export type MemoTagCreateNestedManyWithoutTagInput = {
    create?: XOR<MemoTagCreateWithoutTagInput, MemoTagUncheckedCreateWithoutTagInput> | MemoTagCreateWithoutTagInput[] | MemoTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoTagCreateOrConnectWithoutTagInput | MemoTagCreateOrConnectWithoutTagInput[]
    createMany?: MemoTagCreateManyTagInputEnvelope
    connect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutTagsInput = {
    create?: XOR<UserCreateWithoutTagsInput, UserUncheckedCreateWithoutTagsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTagsInput
    connect?: UserWhereUniqueInput
  }

  export type MemoTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<MemoTagCreateWithoutTagInput, MemoTagUncheckedCreateWithoutTagInput> | MemoTagCreateWithoutTagInput[] | MemoTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoTagCreateOrConnectWithoutTagInput | MemoTagCreateOrConnectWithoutTagInput[]
    createMany?: MemoTagCreateManyTagInputEnvelope
    connect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
  }

  export type MemoTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<MemoTagCreateWithoutTagInput, MemoTagUncheckedCreateWithoutTagInput> | MemoTagCreateWithoutTagInput[] | MemoTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoTagCreateOrConnectWithoutTagInput | MemoTagCreateOrConnectWithoutTagInput[]
    upsert?: MemoTagUpsertWithWhereUniqueWithoutTagInput | MemoTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: MemoTagCreateManyTagInputEnvelope
    set?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    disconnect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    delete?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    connect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    update?: MemoTagUpdateWithWhereUniqueWithoutTagInput | MemoTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: MemoTagUpdateManyWithWhereWithoutTagInput | MemoTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: MemoTagScalarWhereInput | MemoTagScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<UserCreateWithoutTagsInput, UserUncheckedCreateWithoutTagsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTagsInput
    upsert?: UserUpsertWithoutTagsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTagsInput, UserUpdateWithoutTagsInput>, UserUncheckedUpdateWithoutTagsInput>
  }

  export type MemoTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<MemoTagCreateWithoutTagInput, MemoTagUncheckedCreateWithoutTagInput> | MemoTagCreateWithoutTagInput[] | MemoTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoTagCreateOrConnectWithoutTagInput | MemoTagCreateOrConnectWithoutTagInput[]
    upsert?: MemoTagUpsertWithWhereUniqueWithoutTagInput | MemoTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: MemoTagCreateManyTagInputEnvelope
    set?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    disconnect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    delete?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    connect?: MemoTagWhereUniqueInput | MemoTagWhereUniqueInput[]
    update?: MemoTagUpdateWithWhereUniqueWithoutTagInput | MemoTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: MemoTagUpdateManyWithWhereWithoutTagInput | MemoTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: MemoTagScalarWhereInput | MemoTagScalarWhereInput[]
  }

  export type MemoCreateNestedOneWithoutTagsInput = {
    create?: XOR<MemoCreateWithoutTagsInput, MemoUncheckedCreateWithoutTagsInput>
    connectOrCreate?: MemoCreateOrConnectWithoutTagsInput
    connect?: MemoWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutMemosInput = {
    create?: XOR<TagCreateWithoutMemosInput, TagUncheckedCreateWithoutMemosInput>
    connectOrCreate?: TagCreateOrConnectWithoutMemosInput
    connect?: TagWhereUniqueInput
  }

  export type MemoUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<MemoCreateWithoutTagsInput, MemoUncheckedCreateWithoutTagsInput>
    connectOrCreate?: MemoCreateOrConnectWithoutTagsInput
    upsert?: MemoUpsertWithoutTagsInput
    connect?: MemoWhereUniqueInput
    update?: XOR<XOR<MemoUpdateToOneWithWhereWithoutTagsInput, MemoUpdateWithoutTagsInput>, MemoUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutMemosNestedInput = {
    create?: XOR<TagCreateWithoutMemosInput, TagUncheckedCreateWithoutMemosInput>
    connectOrCreate?: TagCreateOrConnectWithoutMemosInput
    upsert?: TagUpsertWithoutMemosInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutMemosInput, TagUpdateWithoutMemosInput>, TagUncheckedUpdateWithoutMemosInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type MemoCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    importance: string
    created_at?: Date | string
    updated_at?: Date | string
    category?: MemoCategoryCreateNestedManyWithoutMemoInput
    tags?: MemoTagCreateNestedManyWithoutMemoInput
  }

  export type MemoUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    importance: string
    created_at?: Date | string
    updated_at?: Date | string
    category?: MemoCategoryUncheckedCreateNestedManyWithoutMemoInput
    tags?: MemoTagUncheckedCreateNestedManyWithoutMemoInput
  }

  export type MemoCreateOrConnectWithoutUserInput = {
    where: MemoWhereUniqueInput
    create: XOR<MemoCreateWithoutUserInput, MemoUncheckedCreateWithoutUserInput>
  }

  export type MemoCreateManyUserInputEnvelope = {
    data: MemoCreateManyUserInput | MemoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProfileCreateWithoutUserInput = {
    id?: string
    avatar?: string | null
    user_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    avatar?: string | null
    user_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type CategoryCreateWithoutUserInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    memo_categories?: MemoCategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    memo_categories?: MemoCategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutUserInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryCreateManyUserInputEnvelope = {
    data: CategoryCreateManyUserInput | CategoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TagCreateWithoutUserInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    memos?: MemoTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    memos?: MemoTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutUserInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput>
  }

  export type TagCreateManyUserInputEnvelope = {
    data: TagCreateManyUserInput | TagCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MemoUpsertWithWhereUniqueWithoutUserInput = {
    where: MemoWhereUniqueInput
    update: XOR<MemoUpdateWithoutUserInput, MemoUncheckedUpdateWithoutUserInput>
    create: XOR<MemoCreateWithoutUserInput, MemoUncheckedCreateWithoutUserInput>
  }

  export type MemoUpdateWithWhereUniqueWithoutUserInput = {
    where: MemoWhereUniqueInput
    data: XOR<MemoUpdateWithoutUserInput, MemoUncheckedUpdateWithoutUserInput>
  }

  export type MemoUpdateManyWithWhereWithoutUserInput = {
    where: MemoScalarWhereInput
    data: XOR<MemoUpdateManyMutationInput, MemoUncheckedUpdateManyWithoutUserInput>
  }

  export type MemoScalarWhereInput = {
    AND?: MemoScalarWhereInput | MemoScalarWhereInput[]
    OR?: MemoScalarWhereInput[]
    NOT?: MemoScalarWhereInput | MemoScalarWhereInput[]
    id?: UuidFilter<"Memo"> | string
    user_id?: UuidFilter<"Memo"> | string
    title?: StringFilter<"Memo"> | string
    content?: StringFilter<"Memo"> | string
    importance?: StringFilter<"Memo"> | string
    created_at?: DateTimeFilter<"Memo"> | Date | string
    updated_at?: DateTimeFilter<"Memo"> | Date | string
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    user_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
  }

  export type CategoryUpdateManyWithWhereWithoutUserInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutUserInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    user_id?: UuidFilter<"Category"> | string
    created_at?: DateTimeFilter<"Category"> | Date | string
    updated_at?: DateTimeFilter<"Category"> | Date | string
  }

  export type TagUpsertWithWhereUniqueWithoutUserInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutUserInput, TagUncheckedUpdateWithoutUserInput>
    create: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput>
  }

  export type TagUpdateWithWhereUniqueWithoutUserInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutUserInput, TagUncheckedUpdateWithoutUserInput>
  }

  export type TagUpdateManyWithWhereWithoutUserInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutUserInput>
  }

  export type TagScalarWhereInput = {
    AND?: TagScalarWhereInput | TagScalarWhereInput[]
    OR?: TagScalarWhereInput[]
    NOT?: TagScalarWhereInput | TagScalarWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
    user_id?: UuidFilter<"Tag"> | string
    created_at?: DateTimeFilter<"Tag"> | Date | string
    updated_at?: DateTimeFilter<"Tag"> | Date | string
  }

  export type UserCreateWithoutProfileInput = {
    id: string
    memos?: MemoCreateNestedManyWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    tags?: TagCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id: string
    memos?: MemoUncheckedCreateNestedManyWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    tags?: TagUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    memos?: MemoUpdateManyWithoutUserNestedInput
    categories?: CategoryUpdateManyWithoutUserNestedInput
    tags?: TagUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    memos?: MemoUncheckedUpdateManyWithoutUserNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    tags?: TagUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MemoCategoryCreateWithoutMemoInput = {
    category: CategoryCreateNestedOneWithoutMemo_categoriesInput
  }

  export type MemoCategoryUncheckedCreateWithoutMemoInput = {
    category_id: number
  }

  export type MemoCategoryCreateOrConnectWithoutMemoInput = {
    where: MemoCategoryWhereUniqueInput
    create: XOR<MemoCategoryCreateWithoutMemoInput, MemoCategoryUncheckedCreateWithoutMemoInput>
  }

  export type MemoCategoryCreateManyMemoInputEnvelope = {
    data: MemoCategoryCreateManyMemoInput | MemoCategoryCreateManyMemoInput[]
    skipDuplicates?: boolean
  }

  export type MemoTagCreateWithoutMemoInput = {
    tag: TagCreateNestedOneWithoutMemosInput
  }

  export type MemoTagUncheckedCreateWithoutMemoInput = {
    tag_id: number
  }

  export type MemoTagCreateOrConnectWithoutMemoInput = {
    where: MemoTagWhereUniqueInput
    create: XOR<MemoTagCreateWithoutMemoInput, MemoTagUncheckedCreateWithoutMemoInput>
  }

  export type MemoTagCreateManyMemoInputEnvelope = {
    data: MemoTagCreateManyMemoInput | MemoTagCreateManyMemoInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutMemosInput = {
    id: string
    profile?: ProfileCreateNestedOneWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
    tags?: TagCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMemosInput = {
    id: string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    tags?: TagUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMemosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMemosInput, UserUncheckedCreateWithoutMemosInput>
  }

  export type MemoCategoryUpsertWithWhereUniqueWithoutMemoInput = {
    where: MemoCategoryWhereUniqueInput
    update: XOR<MemoCategoryUpdateWithoutMemoInput, MemoCategoryUncheckedUpdateWithoutMemoInput>
    create: XOR<MemoCategoryCreateWithoutMemoInput, MemoCategoryUncheckedCreateWithoutMemoInput>
  }

  export type MemoCategoryUpdateWithWhereUniqueWithoutMemoInput = {
    where: MemoCategoryWhereUniqueInput
    data: XOR<MemoCategoryUpdateWithoutMemoInput, MemoCategoryUncheckedUpdateWithoutMemoInput>
  }

  export type MemoCategoryUpdateManyWithWhereWithoutMemoInput = {
    where: MemoCategoryScalarWhereInput
    data: XOR<MemoCategoryUpdateManyMutationInput, MemoCategoryUncheckedUpdateManyWithoutMemoInput>
  }

  export type MemoCategoryScalarWhereInput = {
    AND?: MemoCategoryScalarWhereInput | MemoCategoryScalarWhereInput[]
    OR?: MemoCategoryScalarWhereInput[]
    NOT?: MemoCategoryScalarWhereInput | MemoCategoryScalarWhereInput[]
    memo_id?: UuidFilter<"MemoCategory"> | string
    category_id?: IntFilter<"MemoCategory"> | number
  }

  export type MemoTagUpsertWithWhereUniqueWithoutMemoInput = {
    where: MemoTagWhereUniqueInput
    update: XOR<MemoTagUpdateWithoutMemoInput, MemoTagUncheckedUpdateWithoutMemoInput>
    create: XOR<MemoTagCreateWithoutMemoInput, MemoTagUncheckedCreateWithoutMemoInput>
  }

  export type MemoTagUpdateWithWhereUniqueWithoutMemoInput = {
    where: MemoTagWhereUniqueInput
    data: XOR<MemoTagUpdateWithoutMemoInput, MemoTagUncheckedUpdateWithoutMemoInput>
  }

  export type MemoTagUpdateManyWithWhereWithoutMemoInput = {
    where: MemoTagScalarWhereInput
    data: XOR<MemoTagUpdateManyMutationInput, MemoTagUncheckedUpdateManyWithoutMemoInput>
  }

  export type MemoTagScalarWhereInput = {
    AND?: MemoTagScalarWhereInput | MemoTagScalarWhereInput[]
    OR?: MemoTagScalarWhereInput[]
    NOT?: MemoTagScalarWhereInput | MemoTagScalarWhereInput[]
    memo_id?: UuidFilter<"MemoTag"> | string
    tag_id?: IntFilter<"MemoTag"> | number
  }

  export type UserUpsertWithoutMemosInput = {
    update: XOR<UserUpdateWithoutMemosInput, UserUncheckedUpdateWithoutMemosInput>
    create: XOR<UserCreateWithoutMemosInput, UserUncheckedCreateWithoutMemosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMemosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMemosInput, UserUncheckedUpdateWithoutMemosInput>
  }

  export type UserUpdateWithoutMemosInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    categories?: CategoryUpdateManyWithoutUserNestedInput
    tags?: TagUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMemosInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    tags?: TagUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCategoriesInput = {
    id: string
    memos?: MemoCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    tags?: TagCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCategoriesInput = {
    id: string
    memos?: MemoUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    tags?: TagUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCategoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
  }

  export type MemoCategoryCreateWithoutCategoryInput = {
    memo: MemoCreateNestedOneWithoutCategoryInput
  }

  export type MemoCategoryUncheckedCreateWithoutCategoryInput = {
    memo_id: string
  }

  export type MemoCategoryCreateOrConnectWithoutCategoryInput = {
    where: MemoCategoryWhereUniqueInput
    create: XOR<MemoCategoryCreateWithoutCategoryInput, MemoCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type MemoCategoryCreateManyCategoryInputEnvelope = {
    data: MemoCategoryCreateManyCategoryInput | MemoCategoryCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCategoriesInput = {
    update: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type UserUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    memos?: MemoUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    tags?: TagUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    memos?: MemoUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    tags?: TagUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MemoCategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: MemoCategoryWhereUniqueInput
    update: XOR<MemoCategoryUpdateWithoutCategoryInput, MemoCategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<MemoCategoryCreateWithoutCategoryInput, MemoCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type MemoCategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: MemoCategoryWhereUniqueInput
    data: XOR<MemoCategoryUpdateWithoutCategoryInput, MemoCategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type MemoCategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: MemoCategoryScalarWhereInput
    data: XOR<MemoCategoryUpdateManyMutationInput, MemoCategoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type MemoCreateWithoutCategoryInput = {
    id?: string
    title: string
    content: string
    importance: string
    created_at?: Date | string
    updated_at?: Date | string
    tags?: MemoTagCreateNestedManyWithoutMemoInput
    user: UserCreateNestedOneWithoutMemosInput
  }

  export type MemoUncheckedCreateWithoutCategoryInput = {
    id?: string
    user_id: string
    title: string
    content: string
    importance: string
    created_at?: Date | string
    updated_at?: Date | string
    tags?: MemoTagUncheckedCreateNestedManyWithoutMemoInput
  }

  export type MemoCreateOrConnectWithoutCategoryInput = {
    where: MemoWhereUniqueInput
    create: XOR<MemoCreateWithoutCategoryInput, MemoUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryCreateWithoutMemo_categoriesInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateWithoutMemo_categoriesInput = {
    id?: number
    name: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CategoryCreateOrConnectWithoutMemo_categoriesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutMemo_categoriesInput, CategoryUncheckedCreateWithoutMemo_categoriesInput>
  }

  export type MemoUpsertWithoutCategoryInput = {
    update: XOR<MemoUpdateWithoutCategoryInput, MemoUncheckedUpdateWithoutCategoryInput>
    create: XOR<MemoCreateWithoutCategoryInput, MemoUncheckedCreateWithoutCategoryInput>
    where?: MemoWhereInput
  }

  export type MemoUpdateToOneWithWhereWithoutCategoryInput = {
    where?: MemoWhereInput
    data: XOR<MemoUpdateWithoutCategoryInput, MemoUncheckedUpdateWithoutCategoryInput>
  }

  export type MemoUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: MemoTagUpdateManyWithoutMemoNestedInput
    user?: UserUpdateOneRequiredWithoutMemosNestedInput
  }

  export type MemoUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: MemoTagUncheckedUpdateManyWithoutMemoNestedInput
  }

  export type CategoryUpsertWithoutMemo_categoriesInput = {
    update: XOR<CategoryUpdateWithoutMemo_categoriesInput, CategoryUncheckedUpdateWithoutMemo_categoriesInput>
    create: XOR<CategoryCreateWithoutMemo_categoriesInput, CategoryUncheckedCreateWithoutMemo_categoriesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutMemo_categoriesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutMemo_categoriesInput, CategoryUncheckedUpdateWithoutMemo_categoriesInput>
  }

  export type CategoryUpdateWithoutMemo_categoriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateWithoutMemo_categoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoTagCreateWithoutTagInput = {
    memo: MemoCreateNestedOneWithoutTagsInput
  }

  export type MemoTagUncheckedCreateWithoutTagInput = {
    memo_id: string
  }

  export type MemoTagCreateOrConnectWithoutTagInput = {
    where: MemoTagWhereUniqueInput
    create: XOR<MemoTagCreateWithoutTagInput, MemoTagUncheckedCreateWithoutTagInput>
  }

  export type MemoTagCreateManyTagInputEnvelope = {
    data: MemoTagCreateManyTagInput | MemoTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutTagsInput = {
    id: string
    memos?: MemoCreateNestedManyWithoutUserInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    categories?: CategoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTagsInput = {
    id: string
    memos?: MemoUncheckedCreateNestedManyWithoutUserInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTagsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTagsInput, UserUncheckedCreateWithoutTagsInput>
  }

  export type MemoTagUpsertWithWhereUniqueWithoutTagInput = {
    where: MemoTagWhereUniqueInput
    update: XOR<MemoTagUpdateWithoutTagInput, MemoTagUncheckedUpdateWithoutTagInput>
    create: XOR<MemoTagCreateWithoutTagInput, MemoTagUncheckedCreateWithoutTagInput>
  }

  export type MemoTagUpdateWithWhereUniqueWithoutTagInput = {
    where: MemoTagWhereUniqueInput
    data: XOR<MemoTagUpdateWithoutTagInput, MemoTagUncheckedUpdateWithoutTagInput>
  }

  export type MemoTagUpdateManyWithWhereWithoutTagInput = {
    where: MemoTagScalarWhereInput
    data: XOR<MemoTagUpdateManyMutationInput, MemoTagUncheckedUpdateManyWithoutTagInput>
  }

  export type UserUpsertWithoutTagsInput = {
    update: XOR<UserUpdateWithoutTagsInput, UserUncheckedUpdateWithoutTagsInput>
    create: XOR<UserCreateWithoutTagsInput, UserUncheckedCreateWithoutTagsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTagsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTagsInput, UserUncheckedUpdateWithoutTagsInput>
  }

  export type UserUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    memos?: MemoUpdateManyWithoutUserNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    categories?: CategoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    memos?: MemoUncheckedUpdateManyWithoutUserNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MemoCreateWithoutTagsInput = {
    id?: string
    title: string
    content: string
    importance: string
    created_at?: Date | string
    updated_at?: Date | string
    category?: MemoCategoryCreateNestedManyWithoutMemoInput
    user: UserCreateNestedOneWithoutMemosInput
  }

  export type MemoUncheckedCreateWithoutTagsInput = {
    id?: string
    user_id: string
    title: string
    content: string
    importance: string
    created_at?: Date | string
    updated_at?: Date | string
    category?: MemoCategoryUncheckedCreateNestedManyWithoutMemoInput
  }

  export type MemoCreateOrConnectWithoutTagsInput = {
    where: MemoWhereUniqueInput
    create: XOR<MemoCreateWithoutTagsInput, MemoUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutMemosInput = {
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutTagsInput
  }

  export type TagUncheckedCreateWithoutMemosInput = {
    id?: number
    name: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TagCreateOrConnectWithoutMemosInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutMemosInput, TagUncheckedCreateWithoutMemosInput>
  }

  export type MemoUpsertWithoutTagsInput = {
    update: XOR<MemoUpdateWithoutTagsInput, MemoUncheckedUpdateWithoutTagsInput>
    create: XOR<MemoCreateWithoutTagsInput, MemoUncheckedCreateWithoutTagsInput>
    where?: MemoWhereInput
  }

  export type MemoUpdateToOneWithWhereWithoutTagsInput = {
    where?: MemoWhereInput
    data: XOR<MemoUpdateWithoutTagsInput, MemoUncheckedUpdateWithoutTagsInput>
  }

  export type MemoUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: MemoCategoryUpdateManyWithoutMemoNestedInput
    user?: UserUpdateOneRequiredWithoutMemosNestedInput
  }

  export type MemoUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: MemoCategoryUncheckedUpdateManyWithoutMemoNestedInput
  }

  export type TagUpsertWithoutMemosInput = {
    update: XOR<TagUpdateWithoutMemosInput, TagUncheckedUpdateWithoutMemosInput>
    create: XOR<TagCreateWithoutMemosInput, TagUncheckedCreateWithoutMemosInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutMemosInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutMemosInput, TagUncheckedUpdateWithoutMemosInput>
  }

  export type TagUpdateWithoutMemosInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateWithoutMemosInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoCreateManyUserInput = {
    id?: string
    title: string
    content: string
    importance: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CategoryCreateManyUserInput = {
    id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TagCreateManyUserInput = {
    id?: number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MemoUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: MemoCategoryUpdateManyWithoutMemoNestedInput
    tags?: MemoTagUpdateManyWithoutMemoNestedInput
  }

  export type MemoUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: MemoCategoryUncheckedUpdateManyWithoutMemoNestedInput
    tags?: MemoTagUncheckedUpdateManyWithoutMemoNestedInput
  }

  export type MemoUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    importance?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    memo_categories?: MemoCategoryUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    memo_categories?: MemoCategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    memos?: MemoTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    memos?: MemoTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoCategoryCreateManyMemoInput = {
    category_id: number
  }

  export type MemoTagCreateManyMemoInput = {
    tag_id: number
  }

  export type MemoCategoryUpdateWithoutMemoInput = {
    category?: CategoryUpdateOneRequiredWithoutMemo_categoriesNestedInput
  }

  export type MemoCategoryUncheckedUpdateWithoutMemoInput = {
    category_id?: IntFieldUpdateOperationsInput | number
  }

  export type MemoCategoryUncheckedUpdateManyWithoutMemoInput = {
    category_id?: IntFieldUpdateOperationsInput | number
  }

  export type MemoTagUpdateWithoutMemoInput = {
    tag?: TagUpdateOneRequiredWithoutMemosNestedInput
  }

  export type MemoTagUncheckedUpdateWithoutMemoInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type MemoTagUncheckedUpdateManyWithoutMemoInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type MemoCategoryCreateManyCategoryInput = {
    memo_id: string
  }

  export type MemoCategoryUpdateWithoutCategoryInput = {
    memo?: MemoUpdateOneRequiredWithoutCategoryNestedInput
  }

  export type MemoCategoryUncheckedUpdateWithoutCategoryInput = {
    memo_id?: StringFieldUpdateOperationsInput | string
  }

  export type MemoCategoryUncheckedUpdateManyWithoutCategoryInput = {
    memo_id?: StringFieldUpdateOperationsInput | string
  }

  export type MemoTagCreateManyTagInput = {
    memo_id: string
  }

  export type MemoTagUpdateWithoutTagInput = {
    memo?: MemoUpdateOneRequiredWithoutTagsNestedInput
  }

  export type MemoTagUncheckedUpdateWithoutTagInput = {
    memo_id?: StringFieldUpdateOperationsInput | string
  }

  export type MemoTagUncheckedUpdateManyWithoutTagInput = {
    memo_id?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}