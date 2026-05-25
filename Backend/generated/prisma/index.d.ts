
/**
 * Client
**/

import * as runtime from './runtime/client.js';
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
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model GroupMember
 * 
 */
export type GroupMember = $Result.DefaultSelection<Prisma.$GroupMemberPayload>
/**
 * Model DailyChallenge
 * 
 */
export type DailyChallenge = $Result.DefaultSelection<Prisma.$DailyChallengePayload>
/**
 * Model Submission
 * 
 */
export type Submission = $Result.DefaultSelection<Prisma.$SubmissionPayload>
/**
 * Model UserGroupStats
 * 
 */
export type UserGroupStats = $Result.DefaultSelection<Prisma.$UserGroupStatsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ChallengeStatus: {
  WAITING: 'WAITING',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED'
};

export type ChallengeStatus = (typeof ChallengeStatus)[keyof typeof ChallengeStatus]


export const Role: {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type ChallengeStatus = $Enums.ChallengeStatus

export const ChallengeStatus: typeof $Enums.ChallengeStatus

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

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
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupMember`: Exposes CRUD operations for the **GroupMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupMembers
    * const groupMembers = await prisma.groupMember.findMany()
    * ```
    */
  get groupMember(): Prisma.GroupMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyChallenge`: Exposes CRUD operations for the **DailyChallenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyChallenges
    * const dailyChallenges = await prisma.dailyChallenge.findMany()
    * ```
    */
  get dailyChallenge(): Prisma.DailyChallengeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submission`: Exposes CRUD operations for the **Submission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Submissions
    * const submissions = await prisma.submission.findMany()
    * ```
    */
  get submission(): Prisma.SubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userGroupStats`: Exposes CRUD operations for the **UserGroupStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserGroupStats
    * const userGroupStats = await prisma.userGroupStats.findMany()
    * ```
    */
  get userGroupStats(): Prisma.UserGroupStatsDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Group: 'Group',
    GroupMember: 'GroupMember',
    DailyChallenge: 'DailyChallenge',
    Submission: 'Submission',
    UserGroupStats: 'UserGroupStats'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "group" | "groupMember" | "dailyChallenge" | "submission" | "userGroupStats"
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
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      GroupMember: {
        payload: Prisma.$GroupMemberPayload<ExtArgs>
        fields: Prisma.GroupMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          findFirst: {
            args: Prisma.GroupMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          findMany: {
            args: Prisma.GroupMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>[]
          }
          create: {
            args: Prisma.GroupMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          createMany: {
            args: Prisma.GroupMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>[]
          }
          delete: {
            args: Prisma.GroupMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          update: {
            args: Prisma.GroupMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          deleteMany: {
            args: Prisma.GroupMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>[]
          }
          upsert: {
            args: Prisma.GroupMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          aggregate: {
            args: Prisma.GroupMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupMember>
          }
          groupBy: {
            args: Prisma.GroupMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupMemberCountArgs<ExtArgs>
            result: $Utils.Optional<GroupMemberCountAggregateOutputType> | number
          }
        }
      }
      DailyChallenge: {
        payload: Prisma.$DailyChallengePayload<ExtArgs>
        fields: Prisma.DailyChallengeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyChallengeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyChallengeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload>
          }
          findFirst: {
            args: Prisma.DailyChallengeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyChallengeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload>
          }
          findMany: {
            args: Prisma.DailyChallengeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload>[]
          }
          create: {
            args: Prisma.DailyChallengeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload>
          }
          createMany: {
            args: Prisma.DailyChallengeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyChallengeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload>[]
          }
          delete: {
            args: Prisma.DailyChallengeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload>
          }
          update: {
            args: Prisma.DailyChallengeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload>
          }
          deleteMany: {
            args: Prisma.DailyChallengeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyChallengeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyChallengeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload>[]
          }
          upsert: {
            args: Prisma.DailyChallengeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyChallengePayload>
          }
          aggregate: {
            args: Prisma.DailyChallengeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyChallenge>
          }
          groupBy: {
            args: Prisma.DailyChallengeGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyChallengeGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyChallengeCountArgs<ExtArgs>
            result: $Utils.Optional<DailyChallengeCountAggregateOutputType> | number
          }
        }
      }
      Submission: {
        payload: Prisma.$SubmissionPayload<ExtArgs>
        fields: Prisma.SubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findFirst: {
            args: Prisma.SubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findMany: {
            args: Prisma.SubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          create: {
            args: Prisma.SubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          createMany: {
            args: Prisma.SubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          delete: {
            args: Prisma.SubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          update: {
            args: Prisma.SubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          upsert: {
            args: Prisma.SubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          aggregate: {
            args: Prisma.SubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmission>
          }
          groupBy: {
            args: Prisma.SubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionCountAggregateOutputType> | number
          }
        }
      }
      UserGroupStats: {
        payload: Prisma.$UserGroupStatsPayload<ExtArgs>
        fields: Prisma.UserGroupStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserGroupStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserGroupStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload>
          }
          findFirst: {
            args: Prisma.UserGroupStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserGroupStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload>
          }
          findMany: {
            args: Prisma.UserGroupStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload>[]
          }
          create: {
            args: Prisma.UserGroupStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload>
          }
          createMany: {
            args: Prisma.UserGroupStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserGroupStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload>[]
          }
          delete: {
            args: Prisma.UserGroupStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload>
          }
          update: {
            args: Prisma.UserGroupStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload>
          }
          deleteMany: {
            args: Prisma.UserGroupStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserGroupStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserGroupStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload>[]
          }
          upsert: {
            args: Prisma.UserGroupStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupStatsPayload>
          }
          aggregate: {
            args: Prisma.UserGroupStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserGroupStats>
          }
          groupBy: {
            args: Prisma.UserGroupStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserGroupStatsCountArgs<ExtArgs>
            result: $Utils.Optional<UserGroupStatsCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    group?: GroupOmit
    groupMember?: GroupMemberOmit
    dailyChallenge?: DailyChallengeOmit
    submission?: SubmissionOmit
    userGroupStats?: UserGroupStatsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    memberships: number
    submissions: number
    stats: number
    createdChallenges: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    submissions?: boolean | UserCountOutputTypeCountSubmissionsArgs
    stats?: boolean | UserCountOutputTypeCountStatsArgs
    createdChallenges?: boolean | UserCountOutputTypeCountCreatedChallengesArgs
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
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupStatsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyChallengeWhereInput
  }


  /**
   * Count Type GroupCountOutputType
   */

  export type GroupCountOutputType = {
    members: number
    challenges: number
    stats: number
    submissions: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | GroupCountOutputTypeCountMembersArgs
    challenges?: boolean | GroupCountOutputTypeCountChallengesArgs
    stats?: boolean | GroupCountOutputTypeCountStatsArgs
    submissions?: boolean | GroupCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMemberWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyChallengeWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupStatsWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }


  /**
   * Count Type DailyChallengeCountOutputType
   */

  export type DailyChallengeCountOutputType = {
    submissions: number
  }

  export type DailyChallengeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | DailyChallengeCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * DailyChallengeCountOutputType without action
   */
  export type DailyChallengeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallengeCountOutputType
     */
    select?: DailyChallengeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DailyChallengeCountOutputType without action
   */
  export type DailyChallengeCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
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
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
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
    name: string
    email: string
    passwordHash: string
    createdAt: Date
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
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    stats?: boolean | User$statsArgs<ExtArgs>
    createdChallenges?: boolean | User$createdChallengesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    stats?: boolean | User$statsArgs<ExtArgs>
    createdChallenges?: boolean | User$createdChallengesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      memberships: Prisma.$GroupMemberPayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
      stats: Prisma.$UserGroupStatsPayload<ExtArgs>[]
      createdChallenges: Prisma.$DailyChallengePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      createdAt: Date
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
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends User$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stats<T extends User$statsArgs<ExtArgs> = {}>(args?: Subset<T, User$statsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdChallenges<T extends User$createdChallengesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdChallengesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
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
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    where?: GroupMemberWhereInput
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    cursor?: GroupMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupMemberScalarFieldEnum | GroupMemberScalarFieldEnum[]
  }

  /**
   * User.submissions
   */
  export type User$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * User.stats
   */
  export type User$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    where?: UserGroupStatsWhereInput
    orderBy?: UserGroupStatsOrderByWithRelationInput | UserGroupStatsOrderByWithRelationInput[]
    cursor?: UserGroupStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGroupStatsScalarFieldEnum | UserGroupStatsScalarFieldEnum[]
  }

  /**
   * User.createdChallenges
   */
  export type User$createdChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    where?: DailyChallengeWhereInput
    orderBy?: DailyChallengeOrderByWithRelationInput | DailyChallengeOrderByWithRelationInput[]
    cursor?: DailyChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyChallengeScalarFieldEnum | DailyChallengeScalarFieldEnum[]
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
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    name: string | null
    inviteCode: string | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
    inviteCode: string | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    name: number
    inviteCode: number
    createdBy: number
    createdAt: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    name?: true
    inviteCode?: true
    createdBy?: true
    createdAt?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    name?: true
    inviteCode?: true
    createdBy?: true
    createdAt?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    name?: true
    inviteCode?: true
    createdBy?: true
    createdAt?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt: Date
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    inviteCode?: boolean
    createdBy?: boolean
    createdAt?: boolean
    members?: boolean | Group$membersArgs<ExtArgs>
    challenges?: boolean | Group$challengesArgs<ExtArgs>
    stats?: boolean | Group$statsArgs<ExtArgs>
    submissions?: boolean | Group$submissionsArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    inviteCode?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["group"]>

  export type GroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    inviteCode?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["group"]>

  export type GroupSelectScalar = {
    id?: boolean
    name?: boolean
    inviteCode?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }

  export type GroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "inviteCode" | "createdBy" | "createdAt", ExtArgs["result"]["group"]>
  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Group$membersArgs<ExtArgs>
    challenges?: boolean | Group$challengesArgs<ExtArgs>
    stats?: boolean | Group$statsArgs<ExtArgs>
    submissions?: boolean | Group$submissionsArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      members: Prisma.$GroupMemberPayload<ExtArgs>[]
      challenges: Prisma.$DailyChallengePayload<ExtArgs>[]
      stats: Prisma.$UserGroupStatsPayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      inviteCode: string
      createdBy: string
      createdAt: Date
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {GroupCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups and returns the data updated in the database.
     * @param {GroupUpdateManyAndReturnArgs} args - Arguments to update many Groups.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
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
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Group$membersArgs<ExtArgs> = {}>(args?: Subset<T, Group$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    challenges<T extends Group$challengesArgs<ExtArgs> = {}>(args?: Subset<T, Group$challengesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stats<T extends Group$statsArgs<ExtArgs> = {}>(args?: Subset<T, Group$statsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends Group$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Group$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Group model
   */
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'String'>
    readonly name: FieldRef<"Group", 'String'>
    readonly inviteCode: FieldRef<"Group", 'String'>
    readonly createdBy: FieldRef<"Group", 'String'>
    readonly createdAt: FieldRef<"Group", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group createManyAndReturn
   */
  export type GroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group updateManyAndReturn
   */
  export type GroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to delete.
     */
    limit?: number
  }

  /**
   * Group.members
   */
  export type Group$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    where?: GroupMemberWhereInput
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    cursor?: GroupMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupMemberScalarFieldEnum | GroupMemberScalarFieldEnum[]
  }

  /**
   * Group.challenges
   */
  export type Group$challengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    where?: DailyChallengeWhereInput
    orderBy?: DailyChallengeOrderByWithRelationInput | DailyChallengeOrderByWithRelationInput[]
    cursor?: DailyChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyChallengeScalarFieldEnum | DailyChallengeScalarFieldEnum[]
  }

  /**
   * Group.stats
   */
  export type Group$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    where?: UserGroupStatsWhereInput
    orderBy?: UserGroupStatsOrderByWithRelationInput | UserGroupStatsOrderByWithRelationInput[]
    cursor?: UserGroupStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGroupStatsScalarFieldEnum | UserGroupStatsScalarFieldEnum[]
  }

  /**
   * Group.submissions
   */
  export type Group$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model GroupMember
   */

  export type AggregateGroupMember = {
    _count: GroupMemberCountAggregateOutputType | null
    _min: GroupMemberMinAggregateOutputType | null
    _max: GroupMemberMaxAggregateOutputType | null
  }

  export type GroupMemberMinAggregateOutputType = {
    id: string | null
    userId: string | null
    groupId: string | null
    role: $Enums.Role | null
    joinedAt: Date | null
  }

  export type GroupMemberMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    groupId: string | null
    role: $Enums.Role | null
    joinedAt: Date | null
  }

  export type GroupMemberCountAggregateOutputType = {
    id: number
    userId: number
    groupId: number
    role: number
    joinedAt: number
    _all: number
  }


  export type GroupMemberMinAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    role?: true
    joinedAt?: true
  }

  export type GroupMemberMaxAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    role?: true
    joinedAt?: true
  }

  export type GroupMemberCountAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    role?: true
    joinedAt?: true
    _all?: true
  }

  export type GroupMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMember to aggregate.
     */
    where?: GroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMembers to fetch.
     */
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupMembers
    **/
    _count?: true | GroupMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMemberMaxAggregateInputType
  }

  export type GetGroupMemberAggregateType<T extends GroupMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupMember[P]>
      : GetScalarType<T[P], AggregateGroupMember[P]>
  }




  export type GroupMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMemberWhereInput
    orderBy?: GroupMemberOrderByWithAggregationInput | GroupMemberOrderByWithAggregationInput[]
    by: GroupMemberScalarFieldEnum[] | GroupMemberScalarFieldEnum
    having?: GroupMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupMemberCountAggregateInputType | true
    _min?: GroupMemberMinAggregateInputType
    _max?: GroupMemberMaxAggregateInputType
  }

  export type GroupMemberGroupByOutputType = {
    id: string
    userId: string
    groupId: string
    role: $Enums.Role
    joinedAt: Date
    _count: GroupMemberCountAggregateOutputType | null
    _min: GroupMemberMinAggregateOutputType | null
    _max: GroupMemberMaxAggregateOutputType | null
  }

  type GetGroupMemberGroupByPayload<T extends GroupMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupMemberGroupByOutputType[P]>
            : GetScalarType<T[P], GroupMemberGroupByOutputType[P]>
        }
      >
    >


  export type GroupMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    role?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMember"]>

  export type GroupMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    role?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMember"]>

  export type GroupMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    role?: boolean
    joinedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMember"]>

  export type GroupMemberSelectScalar = {
    id?: boolean
    userId?: boolean
    groupId?: boolean
    role?: boolean
    joinedAt?: boolean
  }

  export type GroupMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "groupId" | "role" | "joinedAt", ExtArgs["result"]["groupMember"]>
  export type GroupMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type GroupMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type GroupMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }

  export type $GroupMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupMember"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      group: Prisma.$GroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      groupId: string
      role: $Enums.Role
      joinedAt: Date
    }, ExtArgs["result"]["groupMember"]>
    composites: {}
  }

  type GroupMemberGetPayload<S extends boolean | null | undefined | GroupMemberDefaultArgs> = $Result.GetResult<Prisma.$GroupMemberPayload, S>

  type GroupMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupMemberCountAggregateInputType | true
    }

  export interface GroupMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupMember'], meta: { name: 'GroupMember' } }
    /**
     * Find zero or one GroupMember that matches the filter.
     * @param {GroupMemberFindUniqueArgs} args - Arguments to find a GroupMember
     * @example
     * // Get one GroupMember
     * const groupMember = await prisma.groupMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupMemberFindUniqueArgs>(args: SelectSubset<T, GroupMemberFindUniqueArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupMemberFindUniqueOrThrowArgs} args - Arguments to find a GroupMember
     * @example
     * // Get one GroupMember
     * const groupMember = await prisma.groupMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberFindFirstArgs} args - Arguments to find a GroupMember
     * @example
     * // Get one GroupMember
     * const groupMember = await prisma.groupMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupMemberFindFirstArgs>(args?: SelectSubset<T, GroupMemberFindFirstArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberFindFirstOrThrowArgs} args - Arguments to find a GroupMember
     * @example
     * // Get one GroupMember
     * const groupMember = await prisma.groupMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupMembers
     * const groupMembers = await prisma.groupMember.findMany()
     * 
     * // Get first 10 GroupMembers
     * const groupMembers = await prisma.groupMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupMemberWithIdOnly = await prisma.groupMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupMemberFindManyArgs>(args?: SelectSubset<T, GroupMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupMember.
     * @param {GroupMemberCreateArgs} args - Arguments to create a GroupMember.
     * @example
     * // Create one GroupMember
     * const GroupMember = await prisma.groupMember.create({
     *   data: {
     *     // ... data to create a GroupMember
     *   }
     * })
     * 
     */
    create<T extends GroupMemberCreateArgs>(args: SelectSubset<T, GroupMemberCreateArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupMembers.
     * @param {GroupMemberCreateManyArgs} args - Arguments to create many GroupMembers.
     * @example
     * // Create many GroupMembers
     * const groupMember = await prisma.groupMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupMemberCreateManyArgs>(args?: SelectSubset<T, GroupMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupMembers and returns the data saved in the database.
     * @param {GroupMemberCreateManyAndReturnArgs} args - Arguments to create many GroupMembers.
     * @example
     * // Create many GroupMembers
     * const groupMember = await prisma.groupMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupMembers and only return the `id`
     * const groupMemberWithIdOnly = await prisma.groupMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupMember.
     * @param {GroupMemberDeleteArgs} args - Arguments to delete one GroupMember.
     * @example
     * // Delete one GroupMember
     * const GroupMember = await prisma.groupMember.delete({
     *   where: {
     *     // ... filter to delete one GroupMember
     *   }
     * })
     * 
     */
    delete<T extends GroupMemberDeleteArgs>(args: SelectSubset<T, GroupMemberDeleteArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupMember.
     * @param {GroupMemberUpdateArgs} args - Arguments to update one GroupMember.
     * @example
     * // Update one GroupMember
     * const groupMember = await prisma.groupMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupMemberUpdateArgs>(args: SelectSubset<T, GroupMemberUpdateArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupMembers.
     * @param {GroupMemberDeleteManyArgs} args - Arguments to filter GroupMembers to delete.
     * @example
     * // Delete a few GroupMembers
     * const { count } = await prisma.groupMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupMemberDeleteManyArgs>(args?: SelectSubset<T, GroupMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupMembers
     * const groupMember = await prisma.groupMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupMemberUpdateManyArgs>(args: SelectSubset<T, GroupMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupMembers and returns the data updated in the database.
     * @param {GroupMemberUpdateManyAndReturnArgs} args - Arguments to update many GroupMembers.
     * @example
     * // Update many GroupMembers
     * const groupMember = await prisma.groupMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupMembers and only return the `id`
     * const groupMemberWithIdOnly = await prisma.groupMember.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupMember.
     * @param {GroupMemberUpsertArgs} args - Arguments to update or create a GroupMember.
     * @example
     * // Update or create a GroupMember
     * const groupMember = await prisma.groupMember.upsert({
     *   create: {
     *     // ... data to create a GroupMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupMember we want to update
     *   }
     * })
     */
    upsert<T extends GroupMemberUpsertArgs>(args: SelectSubset<T, GroupMemberUpsertArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberCountArgs} args - Arguments to filter GroupMembers to count.
     * @example
     * // Count the number of GroupMembers
     * const count = await prisma.groupMember.count({
     *   where: {
     *     // ... the filter for the GroupMembers we want to count
     *   }
     * })
    **/
    count<T extends GroupMemberCountArgs>(
      args?: Subset<T, GroupMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupMemberAggregateArgs>(args: Subset<T, GroupMemberAggregateArgs>): Prisma.PrismaPromise<GetGroupMemberAggregateType<T>>

    /**
     * Group by GroupMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberGroupByArgs} args - Group by arguments.
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
      T extends GroupMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupMemberGroupByArgs['orderBy'] }
        : { orderBy?: GroupMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupMember model
   */
  readonly fields: GroupMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the GroupMember model
   */
  interface GroupMemberFieldRefs {
    readonly id: FieldRef<"GroupMember", 'String'>
    readonly userId: FieldRef<"GroupMember", 'String'>
    readonly groupId: FieldRef<"GroupMember", 'String'>
    readonly role: FieldRef<"GroupMember", 'Role'>
    readonly joinedAt: FieldRef<"GroupMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupMember findUnique
   */
  export type GroupMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupMember to fetch.
     */
    where: GroupMemberWhereUniqueInput
  }

  /**
   * GroupMember findUniqueOrThrow
   */
  export type GroupMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupMember to fetch.
     */
    where: GroupMemberWhereUniqueInput
  }

  /**
   * GroupMember findFirst
   */
  export type GroupMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupMember to fetch.
     */
    where?: GroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMembers to fetch.
     */
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMembers.
     */
    cursor?: GroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMembers.
     */
    distinct?: GroupMemberScalarFieldEnum | GroupMemberScalarFieldEnum[]
  }

  /**
   * GroupMember findFirstOrThrow
   */
  export type GroupMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupMember to fetch.
     */
    where?: GroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMembers to fetch.
     */
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMembers.
     */
    cursor?: GroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMembers.
     */
    distinct?: GroupMemberScalarFieldEnum | GroupMemberScalarFieldEnum[]
  }

  /**
   * GroupMember findMany
   */
  export type GroupMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupMembers to fetch.
     */
    where?: GroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMembers to fetch.
     */
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupMembers.
     */
    cursor?: GroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMembers.
     */
    distinct?: GroupMemberScalarFieldEnum | GroupMemberScalarFieldEnum[]
  }

  /**
   * GroupMember create
   */
  export type GroupMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupMember.
     */
    data: XOR<GroupMemberCreateInput, GroupMemberUncheckedCreateInput>
  }

  /**
   * GroupMember createMany
   */
  export type GroupMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupMembers.
     */
    data: GroupMemberCreateManyInput | GroupMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupMember createManyAndReturn
   */
  export type GroupMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * The data used to create many GroupMembers.
     */
    data: GroupMemberCreateManyInput | GroupMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupMember update
   */
  export type GroupMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupMember.
     */
    data: XOR<GroupMemberUpdateInput, GroupMemberUncheckedUpdateInput>
    /**
     * Choose, which GroupMember to update.
     */
    where: GroupMemberWhereUniqueInput
  }

  /**
   * GroupMember updateMany
   */
  export type GroupMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupMembers.
     */
    data: XOR<GroupMemberUpdateManyMutationInput, GroupMemberUncheckedUpdateManyInput>
    /**
     * Filter which GroupMembers to update
     */
    where?: GroupMemberWhereInput
    /**
     * Limit how many GroupMembers to update.
     */
    limit?: number
  }

  /**
   * GroupMember updateManyAndReturn
   */
  export type GroupMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * The data used to update GroupMembers.
     */
    data: XOR<GroupMemberUpdateManyMutationInput, GroupMemberUncheckedUpdateManyInput>
    /**
     * Filter which GroupMembers to update
     */
    where?: GroupMemberWhereInput
    /**
     * Limit how many GroupMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupMember upsert
   */
  export type GroupMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupMember to update in case it exists.
     */
    where: GroupMemberWhereUniqueInput
    /**
     * In case the GroupMember found by the `where` argument doesn't exist, create a new GroupMember with this data.
     */
    create: XOR<GroupMemberCreateInput, GroupMemberUncheckedCreateInput>
    /**
     * In case the GroupMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupMemberUpdateInput, GroupMemberUncheckedUpdateInput>
  }

  /**
   * GroupMember delete
   */
  export type GroupMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter which GroupMember to delete.
     */
    where: GroupMemberWhereUniqueInput
  }

  /**
   * GroupMember deleteMany
   */
  export type GroupMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMembers to delete
     */
    where?: GroupMemberWhereInput
    /**
     * Limit how many GroupMembers to delete.
     */
    limit?: number
  }

  /**
   * GroupMember without action
   */
  export type GroupMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMember
     */
    omit?: GroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
  }


  /**
   * Model DailyChallenge
   */

  export type AggregateDailyChallenge = {
    _count: DailyChallengeCountAggregateOutputType | null
    _min: DailyChallengeMinAggregateOutputType | null
    _max: DailyChallengeMaxAggregateOutputType | null
  }

  export type DailyChallengeMinAggregateOutputType = {
    id: string | null
    groupId: string | null
    createdBy: string | null
    date: Date | null
    problemLink: string | null
    status: $Enums.ChallengeStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyChallengeMaxAggregateOutputType = {
    id: string | null
    groupId: string | null
    createdBy: string | null
    date: Date | null
    problemLink: string | null
    status: $Enums.ChallengeStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyChallengeCountAggregateOutputType = {
    id: number
    groupId: number
    createdBy: number
    date: number
    problemLink: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyChallengeMinAggregateInputType = {
    id?: true
    groupId?: true
    createdBy?: true
    date?: true
    problemLink?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyChallengeMaxAggregateInputType = {
    id?: true
    groupId?: true
    createdBy?: true
    date?: true
    problemLink?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyChallengeCountAggregateInputType = {
    id?: true
    groupId?: true
    createdBy?: true
    date?: true
    problemLink?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyChallengeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyChallenge to aggregate.
     */
    where?: DailyChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyChallenges to fetch.
     */
    orderBy?: DailyChallengeOrderByWithRelationInput | DailyChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyChallenges
    **/
    _count?: true | DailyChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyChallengeMaxAggregateInputType
  }

  export type GetDailyChallengeAggregateType<T extends DailyChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyChallenge[P]>
      : GetScalarType<T[P], AggregateDailyChallenge[P]>
  }




  export type DailyChallengeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyChallengeWhereInput
    orderBy?: DailyChallengeOrderByWithAggregationInput | DailyChallengeOrderByWithAggregationInput[]
    by: DailyChallengeScalarFieldEnum[] | DailyChallengeScalarFieldEnum
    having?: DailyChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyChallengeCountAggregateInputType | true
    _min?: DailyChallengeMinAggregateInputType
    _max?: DailyChallengeMaxAggregateInputType
  }

  export type DailyChallengeGroupByOutputType = {
    id: string
    groupId: string
    createdBy: string | null
    date: Date
    problemLink: string | null
    status: $Enums.ChallengeStatus
    createdAt: Date
    updatedAt: Date
    _count: DailyChallengeCountAggregateOutputType | null
    _min: DailyChallengeMinAggregateOutputType | null
    _max: DailyChallengeMaxAggregateOutputType | null
  }

  type GetDailyChallengeGroupByPayload<T extends DailyChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], DailyChallengeGroupByOutputType[P]>
        }
      >
    >


  export type DailyChallengeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    createdBy?: boolean
    date?: boolean
    problemLink?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
    creator?: boolean | DailyChallenge$creatorArgs<ExtArgs>
    submissions?: boolean | DailyChallenge$submissionsArgs<ExtArgs>
    _count?: boolean | DailyChallengeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyChallenge"]>

  export type DailyChallengeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    createdBy?: boolean
    date?: boolean
    problemLink?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
    creator?: boolean | DailyChallenge$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["dailyChallenge"]>

  export type DailyChallengeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    createdBy?: boolean
    date?: boolean
    problemLink?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
    creator?: boolean | DailyChallenge$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["dailyChallenge"]>

  export type DailyChallengeSelectScalar = {
    id?: boolean
    groupId?: boolean
    createdBy?: boolean
    date?: boolean
    problemLink?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyChallengeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "groupId" | "createdBy" | "date" | "problemLink" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["dailyChallenge"]>
  export type DailyChallengeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
    creator?: boolean | DailyChallenge$creatorArgs<ExtArgs>
    submissions?: boolean | DailyChallenge$submissionsArgs<ExtArgs>
    _count?: boolean | DailyChallengeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DailyChallengeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
    creator?: boolean | DailyChallenge$creatorArgs<ExtArgs>
  }
  export type DailyChallengeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
    creator?: boolean | DailyChallenge$creatorArgs<ExtArgs>
  }

  export type $DailyChallengePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyChallenge"
    objects: {
      group: Prisma.$GroupPayload<ExtArgs>
      creator: Prisma.$UserPayload<ExtArgs> | null
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      groupId: string
      createdBy: string | null
      date: Date
      problemLink: string | null
      status: $Enums.ChallengeStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyChallenge"]>
    composites: {}
  }

  type DailyChallengeGetPayload<S extends boolean | null | undefined | DailyChallengeDefaultArgs> = $Result.GetResult<Prisma.$DailyChallengePayload, S>

  type DailyChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyChallengeCountAggregateInputType | true
    }

  export interface DailyChallengeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyChallenge'], meta: { name: 'DailyChallenge' } }
    /**
     * Find zero or one DailyChallenge that matches the filter.
     * @param {DailyChallengeFindUniqueArgs} args - Arguments to find a DailyChallenge
     * @example
     * // Get one DailyChallenge
     * const dailyChallenge = await prisma.dailyChallenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyChallengeFindUniqueArgs>(args: SelectSubset<T, DailyChallengeFindUniqueArgs<ExtArgs>>): Prisma__DailyChallengeClient<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyChallenge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyChallengeFindUniqueOrThrowArgs} args - Arguments to find a DailyChallenge
     * @example
     * // Get one DailyChallenge
     * const dailyChallenge = await prisma.dailyChallenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyChallengeFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyChallengeClient<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyChallenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyChallengeFindFirstArgs} args - Arguments to find a DailyChallenge
     * @example
     * // Get one DailyChallenge
     * const dailyChallenge = await prisma.dailyChallenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyChallengeFindFirstArgs>(args?: SelectSubset<T, DailyChallengeFindFirstArgs<ExtArgs>>): Prisma__DailyChallengeClient<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyChallenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyChallengeFindFirstOrThrowArgs} args - Arguments to find a DailyChallenge
     * @example
     * // Get one DailyChallenge
     * const dailyChallenge = await prisma.dailyChallenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyChallengeFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyChallengeClient<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyChallenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyChallenges
     * const dailyChallenges = await prisma.dailyChallenge.findMany()
     * 
     * // Get first 10 DailyChallenges
     * const dailyChallenges = await prisma.dailyChallenge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyChallengeWithIdOnly = await prisma.dailyChallenge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyChallengeFindManyArgs>(args?: SelectSubset<T, DailyChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyChallenge.
     * @param {DailyChallengeCreateArgs} args - Arguments to create a DailyChallenge.
     * @example
     * // Create one DailyChallenge
     * const DailyChallenge = await prisma.dailyChallenge.create({
     *   data: {
     *     // ... data to create a DailyChallenge
     *   }
     * })
     * 
     */
    create<T extends DailyChallengeCreateArgs>(args: SelectSubset<T, DailyChallengeCreateArgs<ExtArgs>>): Prisma__DailyChallengeClient<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyChallenges.
     * @param {DailyChallengeCreateManyArgs} args - Arguments to create many DailyChallenges.
     * @example
     * // Create many DailyChallenges
     * const dailyChallenge = await prisma.dailyChallenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyChallengeCreateManyArgs>(args?: SelectSubset<T, DailyChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyChallenges and returns the data saved in the database.
     * @param {DailyChallengeCreateManyAndReturnArgs} args - Arguments to create many DailyChallenges.
     * @example
     * // Create many DailyChallenges
     * const dailyChallenge = await prisma.dailyChallenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyChallenges and only return the `id`
     * const dailyChallengeWithIdOnly = await prisma.dailyChallenge.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyChallengeCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyChallenge.
     * @param {DailyChallengeDeleteArgs} args - Arguments to delete one DailyChallenge.
     * @example
     * // Delete one DailyChallenge
     * const DailyChallenge = await prisma.dailyChallenge.delete({
     *   where: {
     *     // ... filter to delete one DailyChallenge
     *   }
     * })
     * 
     */
    delete<T extends DailyChallengeDeleteArgs>(args: SelectSubset<T, DailyChallengeDeleteArgs<ExtArgs>>): Prisma__DailyChallengeClient<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyChallenge.
     * @param {DailyChallengeUpdateArgs} args - Arguments to update one DailyChallenge.
     * @example
     * // Update one DailyChallenge
     * const dailyChallenge = await prisma.dailyChallenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyChallengeUpdateArgs>(args: SelectSubset<T, DailyChallengeUpdateArgs<ExtArgs>>): Prisma__DailyChallengeClient<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyChallenges.
     * @param {DailyChallengeDeleteManyArgs} args - Arguments to filter DailyChallenges to delete.
     * @example
     * // Delete a few DailyChallenges
     * const { count } = await prisma.dailyChallenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyChallengeDeleteManyArgs>(args?: SelectSubset<T, DailyChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyChallenges
     * const dailyChallenge = await prisma.dailyChallenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyChallengeUpdateManyArgs>(args: SelectSubset<T, DailyChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyChallenges and returns the data updated in the database.
     * @param {DailyChallengeUpdateManyAndReturnArgs} args - Arguments to update many DailyChallenges.
     * @example
     * // Update many DailyChallenges
     * const dailyChallenge = await prisma.dailyChallenge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyChallenges and only return the `id`
     * const dailyChallengeWithIdOnly = await prisma.dailyChallenge.updateManyAndReturn({
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
    updateManyAndReturn<T extends DailyChallengeUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyChallenge.
     * @param {DailyChallengeUpsertArgs} args - Arguments to update or create a DailyChallenge.
     * @example
     * // Update or create a DailyChallenge
     * const dailyChallenge = await prisma.dailyChallenge.upsert({
     *   create: {
     *     // ... data to create a DailyChallenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyChallenge we want to update
     *   }
     * })
     */
    upsert<T extends DailyChallengeUpsertArgs>(args: SelectSubset<T, DailyChallengeUpsertArgs<ExtArgs>>): Prisma__DailyChallengeClient<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyChallengeCountArgs} args - Arguments to filter DailyChallenges to count.
     * @example
     * // Count the number of DailyChallenges
     * const count = await prisma.dailyChallenge.count({
     *   where: {
     *     // ... the filter for the DailyChallenges we want to count
     *   }
     * })
    **/
    count<T extends DailyChallengeCountArgs>(
      args?: Subset<T, DailyChallengeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DailyChallengeAggregateArgs>(args: Subset<T, DailyChallengeAggregateArgs>): Prisma.PrismaPromise<GetDailyChallengeAggregateType<T>>

    /**
     * Group by DailyChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyChallengeGroupByArgs} args - Group by arguments.
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
      T extends DailyChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyChallengeGroupByArgs['orderBy'] }
        : { orderBy?: DailyChallengeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DailyChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyChallenge model
   */
  readonly fields: DailyChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyChallenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyChallengeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creator<T extends DailyChallenge$creatorArgs<ExtArgs> = {}>(args?: Subset<T, DailyChallenge$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    submissions<T extends DailyChallenge$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, DailyChallenge$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the DailyChallenge model
   */
  interface DailyChallengeFieldRefs {
    readonly id: FieldRef<"DailyChallenge", 'String'>
    readonly groupId: FieldRef<"DailyChallenge", 'String'>
    readonly createdBy: FieldRef<"DailyChallenge", 'String'>
    readonly date: FieldRef<"DailyChallenge", 'DateTime'>
    readonly problemLink: FieldRef<"DailyChallenge", 'String'>
    readonly status: FieldRef<"DailyChallenge", 'ChallengeStatus'>
    readonly createdAt: FieldRef<"DailyChallenge", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyChallenge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyChallenge findUnique
   */
  export type DailyChallengeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    /**
     * Filter, which DailyChallenge to fetch.
     */
    where: DailyChallengeWhereUniqueInput
  }

  /**
   * DailyChallenge findUniqueOrThrow
   */
  export type DailyChallengeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    /**
     * Filter, which DailyChallenge to fetch.
     */
    where: DailyChallengeWhereUniqueInput
  }

  /**
   * DailyChallenge findFirst
   */
  export type DailyChallengeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    /**
     * Filter, which DailyChallenge to fetch.
     */
    where?: DailyChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyChallenges to fetch.
     */
    orderBy?: DailyChallengeOrderByWithRelationInput | DailyChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyChallenges.
     */
    cursor?: DailyChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyChallenges.
     */
    distinct?: DailyChallengeScalarFieldEnum | DailyChallengeScalarFieldEnum[]
  }

  /**
   * DailyChallenge findFirstOrThrow
   */
  export type DailyChallengeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    /**
     * Filter, which DailyChallenge to fetch.
     */
    where?: DailyChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyChallenges to fetch.
     */
    orderBy?: DailyChallengeOrderByWithRelationInput | DailyChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyChallenges.
     */
    cursor?: DailyChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyChallenges.
     */
    distinct?: DailyChallengeScalarFieldEnum | DailyChallengeScalarFieldEnum[]
  }

  /**
   * DailyChallenge findMany
   */
  export type DailyChallengeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    /**
     * Filter, which DailyChallenges to fetch.
     */
    where?: DailyChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyChallenges to fetch.
     */
    orderBy?: DailyChallengeOrderByWithRelationInput | DailyChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyChallenges.
     */
    cursor?: DailyChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyChallenges.
     */
    distinct?: DailyChallengeScalarFieldEnum | DailyChallengeScalarFieldEnum[]
  }

  /**
   * DailyChallenge create
   */
  export type DailyChallengeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyChallenge.
     */
    data: XOR<DailyChallengeCreateInput, DailyChallengeUncheckedCreateInput>
  }

  /**
   * DailyChallenge createMany
   */
  export type DailyChallengeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyChallenges.
     */
    data: DailyChallengeCreateManyInput | DailyChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyChallenge createManyAndReturn
   */
  export type DailyChallengeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * The data used to create many DailyChallenges.
     */
    data: DailyChallengeCreateManyInput | DailyChallengeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyChallenge update
   */
  export type DailyChallengeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyChallenge.
     */
    data: XOR<DailyChallengeUpdateInput, DailyChallengeUncheckedUpdateInput>
    /**
     * Choose, which DailyChallenge to update.
     */
    where: DailyChallengeWhereUniqueInput
  }

  /**
   * DailyChallenge updateMany
   */
  export type DailyChallengeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyChallenges.
     */
    data: XOR<DailyChallengeUpdateManyMutationInput, DailyChallengeUncheckedUpdateManyInput>
    /**
     * Filter which DailyChallenges to update
     */
    where?: DailyChallengeWhereInput
    /**
     * Limit how many DailyChallenges to update.
     */
    limit?: number
  }

  /**
   * DailyChallenge updateManyAndReturn
   */
  export type DailyChallengeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * The data used to update DailyChallenges.
     */
    data: XOR<DailyChallengeUpdateManyMutationInput, DailyChallengeUncheckedUpdateManyInput>
    /**
     * Filter which DailyChallenges to update
     */
    where?: DailyChallengeWhereInput
    /**
     * Limit how many DailyChallenges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyChallenge upsert
   */
  export type DailyChallengeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyChallenge to update in case it exists.
     */
    where: DailyChallengeWhereUniqueInput
    /**
     * In case the DailyChallenge found by the `where` argument doesn't exist, create a new DailyChallenge with this data.
     */
    create: XOR<DailyChallengeCreateInput, DailyChallengeUncheckedCreateInput>
    /**
     * In case the DailyChallenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyChallengeUpdateInput, DailyChallengeUncheckedUpdateInput>
  }

  /**
   * DailyChallenge delete
   */
  export type DailyChallengeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
    /**
     * Filter which DailyChallenge to delete.
     */
    where: DailyChallengeWhereUniqueInput
  }

  /**
   * DailyChallenge deleteMany
   */
  export type DailyChallengeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyChallenges to delete
     */
    where?: DailyChallengeWhereInput
    /**
     * Limit how many DailyChallenges to delete.
     */
    limit?: number
  }

  /**
   * DailyChallenge.creator
   */
  export type DailyChallenge$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * DailyChallenge.submissions
   */
  export type DailyChallenge$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * DailyChallenge without action
   */
  export type DailyChallengeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyChallenge
     */
    select?: DailyChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyChallenge
     */
    omit?: DailyChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyChallengeInclude<ExtArgs> | null
  }


  /**
   * Model Submission
   */

  export type AggregateSubmission = {
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  export type SubmissionAvgAggregateOutputType = {
    timeTaken: number | null
  }

  export type SubmissionSumAggregateOutputType = {
    timeTaken: number | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    groupId: string | null
    challengeId: string | null
    solved: boolean | null
    solvedAt: Date | null
    timeTaken: number | null
    createdAt: Date | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    groupId: string | null
    challengeId: string | null
    solved: boolean | null
    solvedAt: Date | null
    timeTaken: number | null
    createdAt: Date | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    userId: number
    groupId: number
    challengeId: number
    solved: number
    solvedAt: number
    timeTaken: number
    createdAt: number
    _all: number
  }


  export type SubmissionAvgAggregateInputType = {
    timeTaken?: true
  }

  export type SubmissionSumAggregateInputType = {
    timeTaken?: true
  }

  export type SubmissionMinAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    challengeId?: true
    solved?: true
    solvedAt?: true
    timeTaken?: true
    createdAt?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    challengeId?: true
    solved?: true
    solvedAt?: true
    timeTaken?: true
    createdAt?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    challengeId?: true
    solved?: true
    solvedAt?: true
    timeTaken?: true
    createdAt?: true
    _all?: true
  }

  export type SubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submission to aggregate.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Submissions
    **/
    _count?: true | SubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionMaxAggregateInputType
  }

  export type GetSubmissionAggregateType<T extends SubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmission[P]>
      : GetScalarType<T[P], AggregateSubmission[P]>
  }




  export type SubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithAggregationInput | SubmissionOrderByWithAggregationInput[]
    by: SubmissionScalarFieldEnum[] | SubmissionScalarFieldEnum
    having?: SubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionCountAggregateInputType | true
    _avg?: SubmissionAvgAggregateInputType
    _sum?: SubmissionSumAggregateInputType
    _min?: SubmissionMinAggregateInputType
    _max?: SubmissionMaxAggregateInputType
  }

  export type SubmissionGroupByOutputType = {
    id: string
    userId: string
    groupId: string
    challengeId: string
    solved: boolean
    solvedAt: Date
    timeTaken: number | null
    createdAt: Date
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  type GetSubmissionGroupByPayload<T extends SubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    challengeId?: boolean
    solved?: boolean
    solvedAt?: boolean
    timeTaken?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    challenge?: boolean | DailyChallengeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    challengeId?: boolean
    solved?: boolean
    solvedAt?: boolean
    timeTaken?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    challenge?: boolean | DailyChallengeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    challengeId?: boolean
    solved?: boolean
    solvedAt?: boolean
    timeTaken?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    challenge?: boolean | DailyChallengeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectScalar = {
    id?: boolean
    userId?: boolean
    groupId?: boolean
    challengeId?: boolean
    solved?: boolean
    solvedAt?: boolean
    timeTaken?: boolean
    createdAt?: boolean
  }

  export type SubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "groupId" | "challengeId" | "solved" | "solvedAt" | "timeTaken" | "createdAt", ExtArgs["result"]["submission"]>
  export type SubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    challenge?: boolean | DailyChallengeDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    challenge?: boolean | DailyChallengeDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    challenge?: boolean | DailyChallengeDefaultArgs<ExtArgs>
  }

  export type $SubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Submission"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      group: Prisma.$GroupPayload<ExtArgs>
      challenge: Prisma.$DailyChallengePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      groupId: string
      challengeId: string
      solved: boolean
      solvedAt: Date
      timeTaken: number | null
      createdAt: Date
    }, ExtArgs["result"]["submission"]>
    composites: {}
  }

  type SubmissionGetPayload<S extends boolean | null | undefined | SubmissionDefaultArgs> = $Result.GetResult<Prisma.$SubmissionPayload, S>

  type SubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmissionCountAggregateInputType | true
    }

  export interface SubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Submission'], meta: { name: 'Submission' } }
    /**
     * Find zero or one Submission that matches the filter.
     * @param {SubmissionFindUniqueArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionFindUniqueArgs>(args: SelectSubset<T, SubmissionFindUniqueArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Submission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmissionFindUniqueOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionFindFirstArgs>(args?: SelectSubset<T, SubmissionFindFirstArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Submissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Submissions
     * const submissions = await prisma.submission.findMany()
     * 
     * // Get first 10 Submissions
     * const submissions = await prisma.submission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionWithIdOnly = await prisma.submission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionFindManyArgs>(args?: SelectSubset<T, SubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Submission.
     * @param {SubmissionCreateArgs} args - Arguments to create a Submission.
     * @example
     * // Create one Submission
     * const Submission = await prisma.submission.create({
     *   data: {
     *     // ... data to create a Submission
     *   }
     * })
     * 
     */
    create<T extends SubmissionCreateArgs>(args: SelectSubset<T, SubmissionCreateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Submissions.
     * @param {SubmissionCreateManyArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionCreateManyArgs>(args?: SelectSubset<T, SubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Submissions and returns the data saved in the database.
     * @param {SubmissionCreateManyAndReturnArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Submission.
     * @param {SubmissionDeleteArgs} args - Arguments to delete one Submission.
     * @example
     * // Delete one Submission
     * const Submission = await prisma.submission.delete({
     *   where: {
     *     // ... filter to delete one Submission
     *   }
     * })
     * 
     */
    delete<T extends SubmissionDeleteArgs>(args: SelectSubset<T, SubmissionDeleteArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Submission.
     * @param {SubmissionUpdateArgs} args - Arguments to update one Submission.
     * @example
     * // Update one Submission
     * const submission = await prisma.submission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionUpdateArgs>(args: SelectSubset<T, SubmissionUpdateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Submissions.
     * @param {SubmissionDeleteManyArgs} args - Arguments to filter Submissions to delete.
     * @example
     * // Delete a few Submissions
     * const { count } = await prisma.submission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionDeleteManyArgs>(args?: SelectSubset<T, SubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionUpdateManyArgs>(args: SelectSubset<T, SubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions and returns the data updated in the database.
     * @param {SubmissionUpdateManyAndReturnArgs} args - Arguments to update many Submissions.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.updateManyAndReturn({
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
    updateManyAndReturn<T extends SubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Submission.
     * @param {SubmissionUpsertArgs} args - Arguments to update or create a Submission.
     * @example
     * // Update or create a Submission
     * const submission = await prisma.submission.upsert({
     *   create: {
     *     // ... data to create a Submission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Submission we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionUpsertArgs>(args: SelectSubset<T, SubmissionUpsertArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionCountArgs} args - Arguments to filter Submissions to count.
     * @example
     * // Count the number of Submissions
     * const count = await prisma.submission.count({
     *   where: {
     *     // ... the filter for the Submissions we want to count
     *   }
     * })
    **/
    count<T extends SubmissionCountArgs>(
      args?: Subset<T, SubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubmissionAggregateArgs>(args: Subset<T, SubmissionAggregateArgs>): Prisma.PrismaPromise<GetSubmissionAggregateType<T>>

    /**
     * Group by Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionGroupByArgs} args - Group by arguments.
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
      T extends SubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Submission model
   */
  readonly fields: SubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Submission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    challenge<T extends DailyChallengeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DailyChallengeDefaultArgs<ExtArgs>>): Prisma__DailyChallengeClient<$Result.GetResult<Prisma.$DailyChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Submission model
   */
  interface SubmissionFieldRefs {
    readonly id: FieldRef<"Submission", 'String'>
    readonly userId: FieldRef<"Submission", 'String'>
    readonly groupId: FieldRef<"Submission", 'String'>
    readonly challengeId: FieldRef<"Submission", 'String'>
    readonly solved: FieldRef<"Submission", 'Boolean'>
    readonly solvedAt: FieldRef<"Submission", 'DateTime'>
    readonly timeTaken: FieldRef<"Submission", 'Int'>
    readonly createdAt: FieldRef<"Submission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Submission findUnique
   */
  export type SubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findUniqueOrThrow
   */
  export type SubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findFirst
   */
  export type SubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findFirstOrThrow
   */
  export type SubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findMany
   */
  export type SubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submissions to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission create
   */
  export type SubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Submission.
     */
    data: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
  }

  /**
   * Submission createMany
   */
  export type SubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Submission createManyAndReturn
   */
  export type SubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission update
   */
  export type SubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Submission.
     */
    data: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
    /**
     * Choose, which Submission to update.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission updateMany
   */
  export type SubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
  }

  /**
   * Submission updateManyAndReturn
   */
  export type SubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission upsert
   */
  export type SubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Submission to update in case it exists.
     */
    where: SubmissionWhereUniqueInput
    /**
     * In case the Submission found by the `where` argument doesn't exist, create a new Submission with this data.
     */
    create: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
    /**
     * In case the Submission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
  }

  /**
   * Submission delete
   */
  export type SubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter which Submission to delete.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission deleteMany
   */
  export type SubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submissions to delete
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to delete.
     */
    limit?: number
  }

  /**
   * Submission without action
   */
  export type SubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
  }


  /**
   * Model UserGroupStats
   */

  export type AggregateUserGroupStats = {
    _count: UserGroupStatsCountAggregateOutputType | null
    _avg: UserGroupStatsAvgAggregateOutputType | null
    _sum: UserGroupStatsSumAggregateOutputType | null
    _min: UserGroupStatsMinAggregateOutputType | null
    _max: UserGroupStatsMaxAggregateOutputType | null
  }

  export type UserGroupStatsAvgAggregateOutputType = {
    currentStreak: number | null
    longestStreak: number | null
    totalSolved: number | null
    last7DaysSolved: number | null
    last30DaysSolved: number | null
    freezeCount: number | null
  }

  export type UserGroupStatsSumAggregateOutputType = {
    currentStreak: number | null
    longestStreak: number | null
    totalSolved: number | null
    last7DaysSolved: number | null
    last30DaysSolved: number | null
    freezeCount: number | null
  }

  export type UserGroupStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    groupId: string | null
    currentStreak: number | null
    longestStreak: number | null
    totalSolved: number | null
    last7DaysSolved: number | null
    last30DaysSolved: number | null
    freezeCount: number | null
    lastSolvedDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserGroupStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    groupId: string | null
    currentStreak: number | null
    longestStreak: number | null
    totalSolved: number | null
    last7DaysSolved: number | null
    last30DaysSolved: number | null
    freezeCount: number | null
    lastSolvedDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserGroupStatsCountAggregateOutputType = {
    id: number
    userId: number
    groupId: number
    currentStreak: number
    longestStreak: number
    totalSolved: number
    last7DaysSolved: number
    last30DaysSolved: number
    freezeCount: number
    lastSolvedDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserGroupStatsAvgAggregateInputType = {
    currentStreak?: true
    longestStreak?: true
    totalSolved?: true
    last7DaysSolved?: true
    last30DaysSolved?: true
    freezeCount?: true
  }

  export type UserGroupStatsSumAggregateInputType = {
    currentStreak?: true
    longestStreak?: true
    totalSolved?: true
    last7DaysSolved?: true
    last30DaysSolved?: true
    freezeCount?: true
  }

  export type UserGroupStatsMinAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    currentStreak?: true
    longestStreak?: true
    totalSolved?: true
    last7DaysSolved?: true
    last30DaysSolved?: true
    freezeCount?: true
    lastSolvedDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserGroupStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    currentStreak?: true
    longestStreak?: true
    totalSolved?: true
    last7DaysSolved?: true
    last30DaysSolved?: true
    freezeCount?: true
    lastSolvedDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserGroupStatsCountAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    currentStreak?: true
    longestStreak?: true
    totalSolved?: true
    last7DaysSolved?: true
    last30DaysSolved?: true
    freezeCount?: true
    lastSolvedDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserGroupStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGroupStats to aggregate.
     */
    where?: UserGroupStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroupStats to fetch.
     */
    orderBy?: UserGroupStatsOrderByWithRelationInput | UserGroupStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserGroupStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroupStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroupStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserGroupStats
    **/
    _count?: true | UserGroupStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserGroupStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserGroupStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserGroupStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserGroupStatsMaxAggregateInputType
  }

  export type GetUserGroupStatsAggregateType<T extends UserGroupStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserGroupStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserGroupStats[P]>
      : GetScalarType<T[P], AggregateUserGroupStats[P]>
  }




  export type UserGroupStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupStatsWhereInput
    orderBy?: UserGroupStatsOrderByWithAggregationInput | UserGroupStatsOrderByWithAggregationInput[]
    by: UserGroupStatsScalarFieldEnum[] | UserGroupStatsScalarFieldEnum
    having?: UserGroupStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserGroupStatsCountAggregateInputType | true
    _avg?: UserGroupStatsAvgAggregateInputType
    _sum?: UserGroupStatsSumAggregateInputType
    _min?: UserGroupStatsMinAggregateInputType
    _max?: UserGroupStatsMaxAggregateInputType
  }

  export type UserGroupStatsGroupByOutputType = {
    id: string
    userId: string
    groupId: string
    currentStreak: number
    longestStreak: number
    totalSolved: number
    last7DaysSolved: number
    last30DaysSolved: number
    freezeCount: number
    lastSolvedDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserGroupStatsCountAggregateOutputType | null
    _avg: UserGroupStatsAvgAggregateOutputType | null
    _sum: UserGroupStatsSumAggregateOutputType | null
    _min: UserGroupStatsMinAggregateOutputType | null
    _max: UserGroupStatsMaxAggregateOutputType | null
  }

  type GetUserGroupStatsGroupByPayload<T extends UserGroupStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupStatsGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupStatsGroupByOutputType[P]>
        }
      >
    >


  export type UserGroupStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    totalSolved?: boolean
    last7DaysSolved?: boolean
    last30DaysSolved?: boolean
    freezeCount?: boolean
    lastSolvedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroupStats"]>

  export type UserGroupStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    totalSolved?: boolean
    last7DaysSolved?: boolean
    last30DaysSolved?: boolean
    freezeCount?: boolean
    lastSolvedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroupStats"]>

  export type UserGroupStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    totalSolved?: boolean
    last7DaysSolved?: boolean
    last30DaysSolved?: boolean
    freezeCount?: boolean
    lastSolvedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroupStats"]>

  export type UserGroupStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    groupId?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    totalSolved?: boolean
    last7DaysSolved?: boolean
    last30DaysSolved?: boolean
    freezeCount?: boolean
    lastSolvedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserGroupStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "groupId" | "currentStreak" | "longestStreak" | "totalSolved" | "last7DaysSolved" | "last30DaysSolved" | "freezeCount" | "lastSolvedDate" | "createdAt" | "updatedAt", ExtArgs["result"]["userGroupStats"]>
  export type UserGroupStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type UserGroupStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type UserGroupStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }

  export type $UserGroupStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserGroupStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      group: Prisma.$GroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      groupId: string
      currentStreak: number
      longestStreak: number
      totalSolved: number
      last7DaysSolved: number
      last30DaysSolved: number
      freezeCount: number
      lastSolvedDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userGroupStats"]>
    composites: {}
  }

  type UserGroupStatsGetPayload<S extends boolean | null | undefined | UserGroupStatsDefaultArgs> = $Result.GetResult<Prisma.$UserGroupStatsPayload, S>

  type UserGroupStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserGroupStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserGroupStatsCountAggregateInputType | true
    }

  export interface UserGroupStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserGroupStats'], meta: { name: 'UserGroupStats' } }
    /**
     * Find zero or one UserGroupStats that matches the filter.
     * @param {UserGroupStatsFindUniqueArgs} args - Arguments to find a UserGroupStats
     * @example
     * // Get one UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserGroupStatsFindUniqueArgs>(args: SelectSubset<T, UserGroupStatsFindUniqueArgs<ExtArgs>>): Prisma__UserGroupStatsClient<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserGroupStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserGroupStatsFindUniqueOrThrowArgs} args - Arguments to find a UserGroupStats
     * @example
     * // Get one UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserGroupStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserGroupStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserGroupStatsClient<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGroupStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupStatsFindFirstArgs} args - Arguments to find a UserGroupStats
     * @example
     * // Get one UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserGroupStatsFindFirstArgs>(args?: SelectSubset<T, UserGroupStatsFindFirstArgs<ExtArgs>>): Prisma__UserGroupStatsClient<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGroupStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupStatsFindFirstOrThrowArgs} args - Arguments to find a UserGroupStats
     * @example
     * // Get one UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserGroupStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserGroupStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserGroupStatsClient<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserGroupStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.findMany()
     * 
     * // Get first 10 UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userGroupStatsWithIdOnly = await prisma.userGroupStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserGroupStatsFindManyArgs>(args?: SelectSubset<T, UserGroupStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserGroupStats.
     * @param {UserGroupStatsCreateArgs} args - Arguments to create a UserGroupStats.
     * @example
     * // Create one UserGroupStats
     * const UserGroupStats = await prisma.userGroupStats.create({
     *   data: {
     *     // ... data to create a UserGroupStats
     *   }
     * })
     * 
     */
    create<T extends UserGroupStatsCreateArgs>(args: SelectSubset<T, UserGroupStatsCreateArgs<ExtArgs>>): Prisma__UserGroupStatsClient<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserGroupStats.
     * @param {UserGroupStatsCreateManyArgs} args - Arguments to create many UserGroupStats.
     * @example
     * // Create many UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserGroupStatsCreateManyArgs>(args?: SelectSubset<T, UserGroupStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserGroupStats and returns the data saved in the database.
     * @param {UserGroupStatsCreateManyAndReturnArgs} args - Arguments to create many UserGroupStats.
     * @example
     * // Create many UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserGroupStats and only return the `id`
     * const userGroupStatsWithIdOnly = await prisma.userGroupStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserGroupStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, UserGroupStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserGroupStats.
     * @param {UserGroupStatsDeleteArgs} args - Arguments to delete one UserGroupStats.
     * @example
     * // Delete one UserGroupStats
     * const UserGroupStats = await prisma.userGroupStats.delete({
     *   where: {
     *     // ... filter to delete one UserGroupStats
     *   }
     * })
     * 
     */
    delete<T extends UserGroupStatsDeleteArgs>(args: SelectSubset<T, UserGroupStatsDeleteArgs<ExtArgs>>): Prisma__UserGroupStatsClient<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserGroupStats.
     * @param {UserGroupStatsUpdateArgs} args - Arguments to update one UserGroupStats.
     * @example
     * // Update one UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserGroupStatsUpdateArgs>(args: SelectSubset<T, UserGroupStatsUpdateArgs<ExtArgs>>): Prisma__UserGroupStatsClient<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserGroupStats.
     * @param {UserGroupStatsDeleteManyArgs} args - Arguments to filter UserGroupStats to delete.
     * @example
     * // Delete a few UserGroupStats
     * const { count } = await prisma.userGroupStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserGroupStatsDeleteManyArgs>(args?: SelectSubset<T, UserGroupStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGroupStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserGroupStatsUpdateManyArgs>(args: SelectSubset<T, UserGroupStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGroupStats and returns the data updated in the database.
     * @param {UserGroupStatsUpdateManyAndReturnArgs} args - Arguments to update many UserGroupStats.
     * @example
     * // Update many UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserGroupStats and only return the `id`
     * const userGroupStatsWithIdOnly = await prisma.userGroupStats.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserGroupStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, UserGroupStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserGroupStats.
     * @param {UserGroupStatsUpsertArgs} args - Arguments to update or create a UserGroupStats.
     * @example
     * // Update or create a UserGroupStats
     * const userGroupStats = await prisma.userGroupStats.upsert({
     *   create: {
     *     // ... data to create a UserGroupStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserGroupStats we want to update
     *   }
     * })
     */
    upsert<T extends UserGroupStatsUpsertArgs>(args: SelectSubset<T, UserGroupStatsUpsertArgs<ExtArgs>>): Prisma__UserGroupStatsClient<$Result.GetResult<Prisma.$UserGroupStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserGroupStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupStatsCountArgs} args - Arguments to filter UserGroupStats to count.
     * @example
     * // Count the number of UserGroupStats
     * const count = await prisma.userGroupStats.count({
     *   where: {
     *     // ... the filter for the UserGroupStats we want to count
     *   }
     * })
    **/
    count<T extends UserGroupStatsCountArgs>(
      args?: Subset<T, UserGroupStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserGroupStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserGroupStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserGroupStatsAggregateArgs>(args: Subset<T, UserGroupStatsAggregateArgs>): Prisma.PrismaPromise<GetUserGroupStatsAggregateType<T>>

    /**
     * Group by UserGroupStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupStatsGroupByArgs} args - Group by arguments.
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
      T extends UserGroupStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupStatsGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupStatsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserGroupStats model
   */
  readonly fields: UserGroupStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserGroupStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserGroupStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserGroupStats model
   */
  interface UserGroupStatsFieldRefs {
    readonly id: FieldRef<"UserGroupStats", 'String'>
    readonly userId: FieldRef<"UserGroupStats", 'String'>
    readonly groupId: FieldRef<"UserGroupStats", 'String'>
    readonly currentStreak: FieldRef<"UserGroupStats", 'Int'>
    readonly longestStreak: FieldRef<"UserGroupStats", 'Int'>
    readonly totalSolved: FieldRef<"UserGroupStats", 'Int'>
    readonly last7DaysSolved: FieldRef<"UserGroupStats", 'Int'>
    readonly last30DaysSolved: FieldRef<"UserGroupStats", 'Int'>
    readonly freezeCount: FieldRef<"UserGroupStats", 'Int'>
    readonly lastSolvedDate: FieldRef<"UserGroupStats", 'DateTime'>
    readonly createdAt: FieldRef<"UserGroupStats", 'DateTime'>
    readonly updatedAt: FieldRef<"UserGroupStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserGroupStats findUnique
   */
  export type UserGroupStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserGroupStats to fetch.
     */
    where: UserGroupStatsWhereUniqueInput
  }

  /**
   * UserGroupStats findUniqueOrThrow
   */
  export type UserGroupStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserGroupStats to fetch.
     */
    where: UserGroupStatsWhereUniqueInput
  }

  /**
   * UserGroupStats findFirst
   */
  export type UserGroupStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserGroupStats to fetch.
     */
    where?: UserGroupStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroupStats to fetch.
     */
    orderBy?: UserGroupStatsOrderByWithRelationInput | UserGroupStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGroupStats.
     */
    cursor?: UserGroupStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroupStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroupStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroupStats.
     */
    distinct?: UserGroupStatsScalarFieldEnum | UserGroupStatsScalarFieldEnum[]
  }

  /**
   * UserGroupStats findFirstOrThrow
   */
  export type UserGroupStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserGroupStats to fetch.
     */
    where?: UserGroupStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroupStats to fetch.
     */
    orderBy?: UserGroupStatsOrderByWithRelationInput | UserGroupStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGroupStats.
     */
    cursor?: UserGroupStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroupStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroupStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroupStats.
     */
    distinct?: UserGroupStatsScalarFieldEnum | UserGroupStatsScalarFieldEnum[]
  }

  /**
   * UserGroupStats findMany
   */
  export type UserGroupStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserGroupStats to fetch.
     */
    where?: UserGroupStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroupStats to fetch.
     */
    orderBy?: UserGroupStatsOrderByWithRelationInput | UserGroupStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserGroupStats.
     */
    cursor?: UserGroupStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroupStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroupStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroupStats.
     */
    distinct?: UserGroupStatsScalarFieldEnum | UserGroupStatsScalarFieldEnum[]
  }

  /**
   * UserGroupStats create
   */
  export type UserGroupStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserGroupStats.
     */
    data: XOR<UserGroupStatsCreateInput, UserGroupStatsUncheckedCreateInput>
  }

  /**
   * UserGroupStats createMany
   */
  export type UserGroupStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserGroupStats.
     */
    data: UserGroupStatsCreateManyInput | UserGroupStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGroupStats createManyAndReturn
   */
  export type UserGroupStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * The data used to create many UserGroupStats.
     */
    data: UserGroupStatsCreateManyInput | UserGroupStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGroupStats update
   */
  export type UserGroupStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserGroupStats.
     */
    data: XOR<UserGroupStatsUpdateInput, UserGroupStatsUncheckedUpdateInput>
    /**
     * Choose, which UserGroupStats to update.
     */
    where: UserGroupStatsWhereUniqueInput
  }

  /**
   * UserGroupStats updateMany
   */
  export type UserGroupStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserGroupStats.
     */
    data: XOR<UserGroupStatsUpdateManyMutationInput, UserGroupStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserGroupStats to update
     */
    where?: UserGroupStatsWhereInput
    /**
     * Limit how many UserGroupStats to update.
     */
    limit?: number
  }

  /**
   * UserGroupStats updateManyAndReturn
   */
  export type UserGroupStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * The data used to update UserGroupStats.
     */
    data: XOR<UserGroupStatsUpdateManyMutationInput, UserGroupStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserGroupStats to update
     */
    where?: UserGroupStatsWhereInput
    /**
     * Limit how many UserGroupStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGroupStats upsert
   */
  export type UserGroupStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserGroupStats to update in case it exists.
     */
    where: UserGroupStatsWhereUniqueInput
    /**
     * In case the UserGroupStats found by the `where` argument doesn't exist, create a new UserGroupStats with this data.
     */
    create: XOR<UserGroupStatsCreateInput, UserGroupStatsUncheckedCreateInput>
    /**
     * In case the UserGroupStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserGroupStatsUpdateInput, UserGroupStatsUncheckedUpdateInput>
  }

  /**
   * UserGroupStats delete
   */
  export type UserGroupStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
    /**
     * Filter which UserGroupStats to delete.
     */
    where: UserGroupStatsWhereUniqueInput
  }

  /**
   * UserGroupStats deleteMany
   */
  export type UserGroupStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGroupStats to delete
     */
    where?: UserGroupStatsWhereInput
    /**
     * Limit how many UserGroupStats to delete.
     */
    limit?: number
  }

  /**
   * UserGroupStats without action
   */
  export type UserGroupStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupStats
     */
    select?: UserGroupStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupStats
     */
    omit?: UserGroupStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupStatsInclude<ExtArgs> | null
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
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    inviteCode: 'inviteCode',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const GroupMemberScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    groupId: 'groupId',
    role: 'role',
    joinedAt: 'joinedAt'
  };

  export type GroupMemberScalarFieldEnum = (typeof GroupMemberScalarFieldEnum)[keyof typeof GroupMemberScalarFieldEnum]


  export const DailyChallengeScalarFieldEnum: {
    id: 'id',
    groupId: 'groupId',
    createdBy: 'createdBy',
    date: 'date',
    problemLink: 'problemLink',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyChallengeScalarFieldEnum = (typeof DailyChallengeScalarFieldEnum)[keyof typeof DailyChallengeScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    groupId: 'groupId',
    challengeId: 'challengeId',
    solved: 'solved',
    solvedAt: 'solvedAt',
    timeTaken: 'timeTaken',
    createdAt: 'createdAt'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const UserGroupStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    groupId: 'groupId',
    currentStreak: 'currentStreak',
    longestStreak: 'longestStreak',
    totalSolved: 'totalSolved',
    last7DaysSolved: 'last7DaysSolved',
    last30DaysSolved: 'last30DaysSolved',
    freezeCount: 'freezeCount',
    lastSolvedDate: 'lastSolvedDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserGroupStatsScalarFieldEnum = (typeof UserGroupStatsScalarFieldEnum)[keyof typeof UserGroupStatsScalarFieldEnum]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'ChallengeStatus'
   */
  export type EnumChallengeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChallengeStatus'>
    


  /**
   * Reference to a field of type 'ChallengeStatus[]'
   */
  export type ListEnumChallengeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChallengeStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    memberships?: GroupMemberListRelationFilter
    submissions?: SubmissionListRelationFilter
    stats?: UserGroupStatsListRelationFilter
    createdChallenges?: DailyChallengeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    memberships?: GroupMemberOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
    stats?: UserGroupStatsOrderByRelationAggregateInput
    createdChallenges?: DailyChallengeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    memberships?: GroupMemberListRelationFilter
    submissions?: SubmissionListRelationFilter
    stats?: UserGroupStatsListRelationFilter
    createdChallenges?: DailyChallengeListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    inviteCode?: StringFilter<"Group"> | string
    createdBy?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    members?: GroupMemberListRelationFilter
    challenges?: DailyChallengeListRelationFilter
    stats?: UserGroupStatsListRelationFilter
    submissions?: SubmissionListRelationFilter
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    inviteCode?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    members?: GroupMemberOrderByRelationAggregateInput
    challenges?: DailyChallengeOrderByRelationAggregateInput
    stats?: UserGroupStatsOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inviteCode?: string
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    name?: StringFilter<"Group"> | string
    createdBy?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    members?: GroupMemberListRelationFilter
    challenges?: DailyChallengeListRelationFilter
    stats?: UserGroupStatsListRelationFilter
    submissions?: SubmissionListRelationFilter
  }, "id" | "inviteCode">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    inviteCode?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Group"> | string
    name?: StringWithAggregatesFilter<"Group"> | string
    inviteCode?: StringWithAggregatesFilter<"Group"> | string
    createdBy?: StringWithAggregatesFilter<"Group"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
  }

  export type GroupMemberWhereInput = {
    AND?: GroupMemberWhereInput | GroupMemberWhereInput[]
    OR?: GroupMemberWhereInput[]
    NOT?: GroupMemberWhereInput | GroupMemberWhereInput[]
    id?: StringFilter<"GroupMember"> | string
    userId?: StringFilter<"GroupMember"> | string
    groupId?: StringFilter<"GroupMember"> | string
    role?: EnumRoleFilter<"GroupMember"> | $Enums.Role
    joinedAt?: DateTimeFilter<"GroupMember"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }

  export type GroupMemberOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    group?: GroupOrderByWithRelationInput
  }

  export type GroupMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_groupId?: GroupMemberUserIdGroupIdCompoundUniqueInput
    AND?: GroupMemberWhereInput | GroupMemberWhereInput[]
    OR?: GroupMemberWhereInput[]
    NOT?: GroupMemberWhereInput | GroupMemberWhereInput[]
    userId?: StringFilter<"GroupMember"> | string
    groupId?: StringFilter<"GroupMember"> | string
    role?: EnumRoleFilter<"GroupMember"> | $Enums.Role
    joinedAt?: DateTimeFilter<"GroupMember"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }, "id" | "userId_groupId">

  export type GroupMemberOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    _count?: GroupMemberCountOrderByAggregateInput
    _max?: GroupMemberMaxOrderByAggregateInput
    _min?: GroupMemberMinOrderByAggregateInput
  }

  export type GroupMemberScalarWhereWithAggregatesInput = {
    AND?: GroupMemberScalarWhereWithAggregatesInput | GroupMemberScalarWhereWithAggregatesInput[]
    OR?: GroupMemberScalarWhereWithAggregatesInput[]
    NOT?: GroupMemberScalarWhereWithAggregatesInput | GroupMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupMember"> | string
    userId?: StringWithAggregatesFilter<"GroupMember"> | string
    groupId?: StringWithAggregatesFilter<"GroupMember"> | string
    role?: EnumRoleWithAggregatesFilter<"GroupMember"> | $Enums.Role
    joinedAt?: DateTimeWithAggregatesFilter<"GroupMember"> | Date | string
  }

  export type DailyChallengeWhereInput = {
    AND?: DailyChallengeWhereInput | DailyChallengeWhereInput[]
    OR?: DailyChallengeWhereInput[]
    NOT?: DailyChallengeWhereInput | DailyChallengeWhereInput[]
    id?: StringFilter<"DailyChallenge"> | string
    groupId?: StringFilter<"DailyChallenge"> | string
    createdBy?: StringNullableFilter<"DailyChallenge"> | string | null
    date?: DateTimeFilter<"DailyChallenge"> | Date | string
    problemLink?: StringNullableFilter<"DailyChallenge"> | string | null
    status?: EnumChallengeStatusFilter<"DailyChallenge"> | $Enums.ChallengeStatus
    createdAt?: DateTimeFilter<"DailyChallenge"> | Date | string
    updatedAt?: DateTimeFilter<"DailyChallenge"> | Date | string
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    submissions?: SubmissionListRelationFilter
  }

  export type DailyChallengeOrderByWithRelationInput = {
    id?: SortOrder
    groupId?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    date?: SortOrder
    problemLink?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    group?: GroupOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
    submissions?: SubmissionOrderByRelationAggregateInput
  }

  export type DailyChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    groupId_date?: DailyChallengeGroupIdDateCompoundUniqueInput
    AND?: DailyChallengeWhereInput | DailyChallengeWhereInput[]
    OR?: DailyChallengeWhereInput[]
    NOT?: DailyChallengeWhereInput | DailyChallengeWhereInput[]
    groupId?: StringFilter<"DailyChallenge"> | string
    createdBy?: StringNullableFilter<"DailyChallenge"> | string | null
    date?: DateTimeFilter<"DailyChallenge"> | Date | string
    problemLink?: StringNullableFilter<"DailyChallenge"> | string | null
    status?: EnumChallengeStatusFilter<"DailyChallenge"> | $Enums.ChallengeStatus
    createdAt?: DateTimeFilter<"DailyChallenge"> | Date | string
    updatedAt?: DateTimeFilter<"DailyChallenge"> | Date | string
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    submissions?: SubmissionListRelationFilter
  }, "id" | "groupId_date">

  export type DailyChallengeOrderByWithAggregationInput = {
    id?: SortOrder
    groupId?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    date?: SortOrder
    problemLink?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyChallengeCountOrderByAggregateInput
    _max?: DailyChallengeMaxOrderByAggregateInput
    _min?: DailyChallengeMinOrderByAggregateInput
  }

  export type DailyChallengeScalarWhereWithAggregatesInput = {
    AND?: DailyChallengeScalarWhereWithAggregatesInput | DailyChallengeScalarWhereWithAggregatesInput[]
    OR?: DailyChallengeScalarWhereWithAggregatesInput[]
    NOT?: DailyChallengeScalarWhereWithAggregatesInput | DailyChallengeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyChallenge"> | string
    groupId?: StringWithAggregatesFilter<"DailyChallenge"> | string
    createdBy?: StringNullableWithAggregatesFilter<"DailyChallenge"> | string | null
    date?: DateTimeWithAggregatesFilter<"DailyChallenge"> | Date | string
    problemLink?: StringNullableWithAggregatesFilter<"DailyChallenge"> | string | null
    status?: EnumChallengeStatusWithAggregatesFilter<"DailyChallenge"> | $Enums.ChallengeStatus
    createdAt?: DateTimeWithAggregatesFilter<"DailyChallenge"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyChallenge"> | Date | string
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    groupId?: StringFilter<"Submission"> | string
    challengeId?: StringFilter<"Submission"> | string
    solved?: BoolFilter<"Submission"> | boolean
    solvedAt?: DateTimeFilter<"Submission"> | Date | string
    timeTaken?: IntNullableFilter<"Submission"> | number | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    challenge?: XOR<DailyChallengeScalarRelationFilter, DailyChallengeWhereInput>
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    challengeId?: SortOrder
    solved?: SortOrder
    solvedAt?: SortOrder
    timeTaken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    group?: GroupOrderByWithRelationInput
    challenge?: DailyChallengeOrderByWithRelationInput
  }

  export type SubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_challengeId?: SubmissionUserIdChallengeIdCompoundUniqueInput
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    userId?: StringFilter<"Submission"> | string
    groupId?: StringFilter<"Submission"> | string
    challengeId?: StringFilter<"Submission"> | string
    solved?: BoolFilter<"Submission"> | boolean
    solvedAt?: DateTimeFilter<"Submission"> | Date | string
    timeTaken?: IntNullableFilter<"Submission"> | number | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    challenge?: XOR<DailyChallengeScalarRelationFilter, DailyChallengeWhereInput>
  }, "id" | "userId_challengeId">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    challengeId?: SortOrder
    solved?: SortOrder
    solvedAt?: SortOrder
    timeTaken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SubmissionCountOrderByAggregateInput
    _avg?: SubmissionAvgOrderByAggregateInput
    _max?: SubmissionMaxOrderByAggregateInput
    _min?: SubmissionMinOrderByAggregateInput
    _sum?: SubmissionSumOrderByAggregateInput
  }

  export type SubmissionScalarWhereWithAggregatesInput = {
    AND?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    OR?: SubmissionScalarWhereWithAggregatesInput[]
    NOT?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Submission"> | string
    userId?: StringWithAggregatesFilter<"Submission"> | string
    groupId?: StringWithAggregatesFilter<"Submission"> | string
    challengeId?: StringWithAggregatesFilter<"Submission"> | string
    solved?: BoolWithAggregatesFilter<"Submission"> | boolean
    solvedAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    timeTaken?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
  }

  export type UserGroupStatsWhereInput = {
    AND?: UserGroupStatsWhereInput | UserGroupStatsWhereInput[]
    OR?: UserGroupStatsWhereInput[]
    NOT?: UserGroupStatsWhereInput | UserGroupStatsWhereInput[]
    id?: StringFilter<"UserGroupStats"> | string
    userId?: StringFilter<"UserGroupStats"> | string
    groupId?: StringFilter<"UserGroupStats"> | string
    currentStreak?: IntFilter<"UserGroupStats"> | number
    longestStreak?: IntFilter<"UserGroupStats"> | number
    totalSolved?: IntFilter<"UserGroupStats"> | number
    last7DaysSolved?: IntFilter<"UserGroupStats"> | number
    last30DaysSolved?: IntFilter<"UserGroupStats"> | number
    freezeCount?: IntFilter<"UserGroupStats"> | number
    lastSolvedDate?: DateTimeNullableFilter<"UserGroupStats"> | Date | string | null
    createdAt?: DateTimeFilter<"UserGroupStats"> | Date | string
    updatedAt?: DateTimeFilter<"UserGroupStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }

  export type UserGroupStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalSolved?: SortOrder
    last7DaysSolved?: SortOrder
    last30DaysSolved?: SortOrder
    freezeCount?: SortOrder
    lastSolvedDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    group?: GroupOrderByWithRelationInput
  }

  export type UserGroupStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_groupId?: UserGroupStatsUserIdGroupIdCompoundUniqueInput
    AND?: UserGroupStatsWhereInput | UserGroupStatsWhereInput[]
    OR?: UserGroupStatsWhereInput[]
    NOT?: UserGroupStatsWhereInput | UserGroupStatsWhereInput[]
    userId?: StringFilter<"UserGroupStats"> | string
    groupId?: StringFilter<"UserGroupStats"> | string
    currentStreak?: IntFilter<"UserGroupStats"> | number
    longestStreak?: IntFilter<"UserGroupStats"> | number
    totalSolved?: IntFilter<"UserGroupStats"> | number
    last7DaysSolved?: IntFilter<"UserGroupStats"> | number
    last30DaysSolved?: IntFilter<"UserGroupStats"> | number
    freezeCount?: IntFilter<"UserGroupStats"> | number
    lastSolvedDate?: DateTimeNullableFilter<"UserGroupStats"> | Date | string | null
    createdAt?: DateTimeFilter<"UserGroupStats"> | Date | string
    updatedAt?: DateTimeFilter<"UserGroupStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }, "id" | "userId_groupId">

  export type UserGroupStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalSolved?: SortOrder
    last7DaysSolved?: SortOrder
    last30DaysSolved?: SortOrder
    freezeCount?: SortOrder
    lastSolvedDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserGroupStatsCountOrderByAggregateInput
    _avg?: UserGroupStatsAvgOrderByAggregateInput
    _max?: UserGroupStatsMaxOrderByAggregateInput
    _min?: UserGroupStatsMinOrderByAggregateInput
    _sum?: UserGroupStatsSumOrderByAggregateInput
  }

  export type UserGroupStatsScalarWhereWithAggregatesInput = {
    AND?: UserGroupStatsScalarWhereWithAggregatesInput | UserGroupStatsScalarWhereWithAggregatesInput[]
    OR?: UserGroupStatsScalarWhereWithAggregatesInput[]
    NOT?: UserGroupStatsScalarWhereWithAggregatesInput | UserGroupStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserGroupStats"> | string
    userId?: StringWithAggregatesFilter<"UserGroupStats"> | string
    groupId?: StringWithAggregatesFilter<"UserGroupStats"> | string
    currentStreak?: IntWithAggregatesFilter<"UserGroupStats"> | number
    longestStreak?: IntWithAggregatesFilter<"UserGroupStats"> | number
    totalSolved?: IntWithAggregatesFilter<"UserGroupStats"> | number
    last7DaysSolved?: IntWithAggregatesFilter<"UserGroupStats"> | number
    last30DaysSolved?: IntWithAggregatesFilter<"UserGroupStats"> | number
    freezeCount?: IntWithAggregatesFilter<"UserGroupStats"> | number
    lastSolvedDate?: DateTimeNullableWithAggregatesFilter<"UserGroupStats"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserGroupStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserGroupStats"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    memberships?: GroupMemberCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    stats?: UserGroupStatsCreateNestedManyWithoutUserInput
    createdChallenges?: DailyChallengeCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    memberships?: GroupMemberUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    stats?: UserGroupStatsUncheckedCreateNestedManyWithoutUserInput
    createdChallenges?: DailyChallengeUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: GroupMemberUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    stats?: UserGroupStatsUpdateManyWithoutUserNestedInput
    createdChallenges?: DailyChallengeUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: GroupMemberUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    stats?: UserGroupStatsUncheckedUpdateManyWithoutUserNestedInput
    createdChallenges?: DailyChallengeUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupCreateInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
    members?: GroupMemberCreateNestedManyWithoutGroupInput
    challenges?: DailyChallengeCreateNestedManyWithoutGroupInput
    stats?: UserGroupStatsCreateNestedManyWithoutGroupInput
    submissions?: SubmissionCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
    members?: GroupMemberUncheckedCreateNestedManyWithoutGroupInput
    challenges?: DailyChallengeUncheckedCreateNestedManyWithoutGroupInput
    stats?: UserGroupStatsUncheckedCreateNestedManyWithoutGroupInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupMemberUpdateManyWithoutGroupNestedInput
    challenges?: DailyChallengeUpdateManyWithoutGroupNestedInput
    stats?: UserGroupStatsUpdateManyWithoutGroupNestedInput
    submissions?: SubmissionUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupMemberUncheckedUpdateManyWithoutGroupNestedInput
    challenges?: DailyChallengeUncheckedUpdateManyWithoutGroupNestedInput
    stats?: UserGroupStatsUncheckedUpdateManyWithoutGroupNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMemberCreateInput = {
    id?: string
    role?: $Enums.Role
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
    group: GroupCreateNestedOneWithoutMembersInput
  }

  export type GroupMemberUncheckedCreateInput = {
    id?: string
    userId: string
    groupId: string
    role?: $Enums.Role
    joinedAt?: Date | string
  }

  export type GroupMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    group?: GroupUpdateOneRequiredWithoutMembersNestedInput
  }

  export type GroupMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMemberCreateManyInput = {
    id?: string
    userId: string
    groupId: string
    role?: $Enums.Role
    joinedAt?: Date | string
  }

  export type GroupMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyChallengeCreateInput = {
    id?: string
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    group: GroupCreateNestedOneWithoutChallengesInput
    creator?: UserCreateNestedOneWithoutCreatedChallengesInput
    submissions?: SubmissionCreateNestedManyWithoutChallengeInput
  }

  export type DailyChallengeUncheckedCreateInput = {
    id?: string
    groupId: string
    createdBy?: string | null
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type DailyChallengeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutChallengesNestedInput
    creator?: UserUpdateOneWithoutCreatedChallengesNestedInput
    submissions?: SubmissionUpdateManyWithoutChallengeNestedInput
  }

  export type DailyChallengeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type DailyChallengeCreateManyInput = {
    id?: string
    groupId: string
    createdBy?: string | null
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyChallengeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyChallengeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateInput = {
    id?: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSubmissionsInput
    group: GroupCreateNestedOneWithoutSubmissionsInput
    challenge: DailyChallengeCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: string
    userId: string
    groupId: string
    challengeId: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
  }

  export type SubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    group?: GroupUpdateOneRequiredWithoutSubmissionsNestedInput
    challenge?: DailyChallengeUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyInput = {
    id?: string
    userId: string
    groupId: string
    challengeId: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
  }

  export type SubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupStatsCreateInput = {
    id?: string
    currentStreak?: number
    longestStreak?: number
    totalSolved?: number
    last7DaysSolved?: number
    last30DaysSolved?: number
    freezeCount?: number
    lastSolvedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStatsInput
    group: GroupCreateNestedOneWithoutStatsInput
  }

  export type UserGroupStatsUncheckedCreateInput = {
    id?: string
    userId: string
    groupId: string
    currentStreak?: number
    longestStreak?: number
    totalSolved?: number
    last7DaysSolved?: number
    last30DaysSolved?: number
    freezeCount?: number
    lastSolvedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGroupStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalSolved?: IntFieldUpdateOperationsInput | number
    last7DaysSolved?: IntFieldUpdateOperationsInput | number
    last30DaysSolved?: IntFieldUpdateOperationsInput | number
    freezeCount?: IntFieldUpdateOperationsInput | number
    lastSolvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStatsNestedInput
    group?: GroupUpdateOneRequiredWithoutStatsNestedInput
  }

  export type UserGroupStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalSolved?: IntFieldUpdateOperationsInput | number
    last7DaysSolved?: IntFieldUpdateOperationsInput | number
    last30DaysSolved?: IntFieldUpdateOperationsInput | number
    freezeCount?: IntFieldUpdateOperationsInput | number
    lastSolvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupStatsCreateManyInput = {
    id?: string
    userId: string
    groupId: string
    currentStreak?: number
    longestStreak?: number
    totalSolved?: number
    last7DaysSolved?: number
    last30DaysSolved?: number
    freezeCount?: number
    lastSolvedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGroupStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalSolved?: IntFieldUpdateOperationsInput | number
    last7DaysSolved?: IntFieldUpdateOperationsInput | number
    last30DaysSolved?: IntFieldUpdateOperationsInput | number
    freezeCount?: IntFieldUpdateOperationsInput | number
    lastSolvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalSolved?: IntFieldUpdateOperationsInput | number
    last7DaysSolved?: IntFieldUpdateOperationsInput | number
    last30DaysSolved?: IntFieldUpdateOperationsInput | number
    freezeCount?: IntFieldUpdateOperationsInput | number
    lastSolvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type GroupMemberListRelationFilter = {
    every?: GroupMemberWhereInput
    some?: GroupMemberWhereInput
    none?: GroupMemberWhereInput
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type UserGroupStatsListRelationFilter = {
    every?: UserGroupStatsWhereInput
    some?: UserGroupStatsWhereInput
    none?: UserGroupStatsWhereInput
  }

  export type DailyChallengeListRelationFilter = {
    every?: DailyChallengeWhereInput
    some?: DailyChallengeWhereInput
    none?: DailyChallengeWhereInput
  }

  export type GroupMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserGroupStatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyChallengeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
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

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    inviteCode?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    inviteCode?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    inviteCode?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GroupScalarRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type GroupMemberUserIdGroupIdCompoundUniqueInput = {
    userId: string
    groupId: string
  }

  export type GroupMemberCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type GroupMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type GroupMemberMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type EnumChallengeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChallengeStatus | EnumChallengeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChallengeStatus[] | ListEnumChallengeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChallengeStatus[] | ListEnumChallengeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChallengeStatusFilter<$PrismaModel> | $Enums.ChallengeStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DailyChallengeGroupIdDateCompoundUniqueInput = {
    groupId: string
    date: Date | string
  }

  export type DailyChallengeCountOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    createdBy?: SortOrder
    date?: SortOrder
    problemLink?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyChallengeMaxOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    createdBy?: SortOrder
    date?: SortOrder
    problemLink?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyChallengeMinOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    createdBy?: SortOrder
    date?: SortOrder
    problemLink?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumChallengeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChallengeStatus | EnumChallengeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChallengeStatus[] | ListEnumChallengeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChallengeStatus[] | ListEnumChallengeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChallengeStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChallengeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChallengeStatusFilter<$PrismaModel>
    _max?: NestedEnumChallengeStatusFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DailyChallengeScalarRelationFilter = {
    is?: DailyChallengeWhereInput
    isNot?: DailyChallengeWhereInput
  }

  export type SubmissionUserIdChallengeIdCompoundUniqueInput = {
    userId: string
    challengeId: string
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    challengeId?: SortOrder
    solved?: SortOrder
    solvedAt?: SortOrder
    timeTaken?: SortOrder
    createdAt?: SortOrder
  }

  export type SubmissionAvgOrderByAggregateInput = {
    timeTaken?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    challengeId?: SortOrder
    solved?: SortOrder
    solvedAt?: SortOrder
    timeTaken?: SortOrder
    createdAt?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    challengeId?: SortOrder
    solved?: SortOrder
    solvedAt?: SortOrder
    timeTaken?: SortOrder
    createdAt?: SortOrder
  }

  export type SubmissionSumOrderByAggregateInput = {
    timeTaken?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserGroupStatsUserIdGroupIdCompoundUniqueInput = {
    userId: string
    groupId: string
  }

  export type UserGroupStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalSolved?: SortOrder
    last7DaysSolved?: SortOrder
    last30DaysSolved?: SortOrder
    freezeCount?: SortOrder
    lastSolvedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserGroupStatsAvgOrderByAggregateInput = {
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalSolved?: SortOrder
    last7DaysSolved?: SortOrder
    last30DaysSolved?: SortOrder
    freezeCount?: SortOrder
  }

  export type UserGroupStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalSolved?: SortOrder
    last7DaysSolved?: SortOrder
    last30DaysSolved?: SortOrder
    freezeCount?: SortOrder
    lastSolvedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserGroupStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalSolved?: SortOrder
    last7DaysSolved?: SortOrder
    last30DaysSolved?: SortOrder
    freezeCount?: SortOrder
    lastSolvedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserGroupStatsSumOrderByAggregateInput = {
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalSolved?: SortOrder
    last7DaysSolved?: SortOrder
    last30DaysSolved?: SortOrder
    freezeCount?: SortOrder
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GroupMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput> | GroupMemberCreateWithoutUserInput[] | GroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutUserInput | GroupMemberCreateOrConnectWithoutUserInput[]
    createMany?: GroupMemberCreateManyUserInputEnvelope
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutUserInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type UserGroupStatsCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGroupStatsCreateWithoutUserInput, UserGroupStatsUncheckedCreateWithoutUserInput> | UserGroupStatsCreateWithoutUserInput[] | UserGroupStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupStatsCreateOrConnectWithoutUserInput | UserGroupStatsCreateOrConnectWithoutUserInput[]
    createMany?: UserGroupStatsCreateManyUserInputEnvelope
    connect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
  }

  export type DailyChallengeCreateNestedManyWithoutCreatorInput = {
    create?: XOR<DailyChallengeCreateWithoutCreatorInput, DailyChallengeUncheckedCreateWithoutCreatorInput> | DailyChallengeCreateWithoutCreatorInput[] | DailyChallengeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DailyChallengeCreateOrConnectWithoutCreatorInput | DailyChallengeCreateOrConnectWithoutCreatorInput[]
    createMany?: DailyChallengeCreateManyCreatorInputEnvelope
    connect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
  }

  export type GroupMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput> | GroupMemberCreateWithoutUserInput[] | GroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutUserInput | GroupMemberCreateOrConnectWithoutUserInput[]
    createMany?: GroupMemberCreateManyUserInputEnvelope
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type UserGroupStatsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGroupStatsCreateWithoutUserInput, UserGroupStatsUncheckedCreateWithoutUserInput> | UserGroupStatsCreateWithoutUserInput[] | UserGroupStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupStatsCreateOrConnectWithoutUserInput | UserGroupStatsCreateOrConnectWithoutUserInput[]
    createMany?: UserGroupStatsCreateManyUserInputEnvelope
    connect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
  }

  export type DailyChallengeUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<DailyChallengeCreateWithoutCreatorInput, DailyChallengeUncheckedCreateWithoutCreatorInput> | DailyChallengeCreateWithoutCreatorInput[] | DailyChallengeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DailyChallengeCreateOrConnectWithoutCreatorInput | DailyChallengeCreateOrConnectWithoutCreatorInput[]
    createMany?: DailyChallengeCreateManyCreatorInputEnvelope
    connect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GroupMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput> | GroupMemberCreateWithoutUserInput[] | GroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutUserInput | GroupMemberCreateOrConnectWithoutUserInput[]
    upsert?: GroupMemberUpsertWithWhereUniqueWithoutUserInput | GroupMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GroupMemberCreateManyUserInputEnvelope
    set?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    disconnect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    delete?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    update?: GroupMemberUpdateWithWhereUniqueWithoutUserInput | GroupMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GroupMemberUpdateManyWithWhereWithoutUserInput | GroupMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutUserInput | SubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutUserInput | SubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutUserInput | SubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type UserGroupStatsUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGroupStatsCreateWithoutUserInput, UserGroupStatsUncheckedCreateWithoutUserInput> | UserGroupStatsCreateWithoutUserInput[] | UserGroupStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupStatsCreateOrConnectWithoutUserInput | UserGroupStatsCreateOrConnectWithoutUserInput[]
    upsert?: UserGroupStatsUpsertWithWhereUniqueWithoutUserInput | UserGroupStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGroupStatsCreateManyUserInputEnvelope
    set?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    disconnect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    delete?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    connect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    update?: UserGroupStatsUpdateWithWhereUniqueWithoutUserInput | UserGroupStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGroupStatsUpdateManyWithWhereWithoutUserInput | UserGroupStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGroupStatsScalarWhereInput | UserGroupStatsScalarWhereInput[]
  }

  export type DailyChallengeUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<DailyChallengeCreateWithoutCreatorInput, DailyChallengeUncheckedCreateWithoutCreatorInput> | DailyChallengeCreateWithoutCreatorInput[] | DailyChallengeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DailyChallengeCreateOrConnectWithoutCreatorInput | DailyChallengeCreateOrConnectWithoutCreatorInput[]
    upsert?: DailyChallengeUpsertWithWhereUniqueWithoutCreatorInput | DailyChallengeUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: DailyChallengeCreateManyCreatorInputEnvelope
    set?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    disconnect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    delete?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    connect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    update?: DailyChallengeUpdateWithWhereUniqueWithoutCreatorInput | DailyChallengeUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: DailyChallengeUpdateManyWithWhereWithoutCreatorInput | DailyChallengeUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: DailyChallengeScalarWhereInput | DailyChallengeScalarWhereInput[]
  }

  export type GroupMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput> | GroupMemberCreateWithoutUserInput[] | GroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutUserInput | GroupMemberCreateOrConnectWithoutUserInput[]
    upsert?: GroupMemberUpsertWithWhereUniqueWithoutUserInput | GroupMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GroupMemberCreateManyUserInputEnvelope
    set?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    disconnect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    delete?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    update?: GroupMemberUpdateWithWhereUniqueWithoutUserInput | GroupMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GroupMemberUpdateManyWithWhereWithoutUserInput | GroupMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutUserInput | SubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutUserInput | SubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutUserInput | SubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type UserGroupStatsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGroupStatsCreateWithoutUserInput, UserGroupStatsUncheckedCreateWithoutUserInput> | UserGroupStatsCreateWithoutUserInput[] | UserGroupStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupStatsCreateOrConnectWithoutUserInput | UserGroupStatsCreateOrConnectWithoutUserInput[]
    upsert?: UserGroupStatsUpsertWithWhereUniqueWithoutUserInput | UserGroupStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGroupStatsCreateManyUserInputEnvelope
    set?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    disconnect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    delete?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    connect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    update?: UserGroupStatsUpdateWithWhereUniqueWithoutUserInput | UserGroupStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGroupStatsUpdateManyWithWhereWithoutUserInput | UserGroupStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGroupStatsScalarWhereInput | UserGroupStatsScalarWhereInput[]
  }

  export type DailyChallengeUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<DailyChallengeCreateWithoutCreatorInput, DailyChallengeUncheckedCreateWithoutCreatorInput> | DailyChallengeCreateWithoutCreatorInput[] | DailyChallengeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DailyChallengeCreateOrConnectWithoutCreatorInput | DailyChallengeCreateOrConnectWithoutCreatorInput[]
    upsert?: DailyChallengeUpsertWithWhereUniqueWithoutCreatorInput | DailyChallengeUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: DailyChallengeCreateManyCreatorInputEnvelope
    set?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    disconnect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    delete?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    connect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    update?: DailyChallengeUpdateWithWhereUniqueWithoutCreatorInput | DailyChallengeUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: DailyChallengeUpdateManyWithWhereWithoutCreatorInput | DailyChallengeUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: DailyChallengeScalarWhereInput | DailyChallengeScalarWhereInput[]
  }

  export type GroupMemberCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput> | GroupMemberCreateWithoutGroupInput[] | GroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutGroupInput | GroupMemberCreateOrConnectWithoutGroupInput[]
    createMany?: GroupMemberCreateManyGroupInputEnvelope
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
  }

  export type DailyChallengeCreateNestedManyWithoutGroupInput = {
    create?: XOR<DailyChallengeCreateWithoutGroupInput, DailyChallengeUncheckedCreateWithoutGroupInput> | DailyChallengeCreateWithoutGroupInput[] | DailyChallengeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: DailyChallengeCreateOrConnectWithoutGroupInput | DailyChallengeCreateOrConnectWithoutGroupInput[]
    createMany?: DailyChallengeCreateManyGroupInputEnvelope
    connect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
  }

  export type UserGroupStatsCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserGroupStatsCreateWithoutGroupInput, UserGroupStatsUncheckedCreateWithoutGroupInput> | UserGroupStatsCreateWithoutGroupInput[] | UserGroupStatsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupStatsCreateOrConnectWithoutGroupInput | UserGroupStatsCreateOrConnectWithoutGroupInput[]
    createMany?: UserGroupStatsCreateManyGroupInputEnvelope
    connect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutGroupInput = {
    create?: XOR<SubmissionCreateWithoutGroupInput, SubmissionUncheckedCreateWithoutGroupInput> | SubmissionCreateWithoutGroupInput[] | SubmissionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutGroupInput | SubmissionCreateOrConnectWithoutGroupInput[]
    createMany?: SubmissionCreateManyGroupInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type GroupMemberUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput> | GroupMemberCreateWithoutGroupInput[] | GroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutGroupInput | GroupMemberCreateOrConnectWithoutGroupInput[]
    createMany?: GroupMemberCreateManyGroupInputEnvelope
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
  }

  export type DailyChallengeUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<DailyChallengeCreateWithoutGroupInput, DailyChallengeUncheckedCreateWithoutGroupInput> | DailyChallengeCreateWithoutGroupInput[] | DailyChallengeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: DailyChallengeCreateOrConnectWithoutGroupInput | DailyChallengeCreateOrConnectWithoutGroupInput[]
    createMany?: DailyChallengeCreateManyGroupInputEnvelope
    connect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
  }

  export type UserGroupStatsUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserGroupStatsCreateWithoutGroupInput, UserGroupStatsUncheckedCreateWithoutGroupInput> | UserGroupStatsCreateWithoutGroupInput[] | UserGroupStatsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupStatsCreateOrConnectWithoutGroupInput | UserGroupStatsCreateOrConnectWithoutGroupInput[]
    createMany?: UserGroupStatsCreateManyGroupInputEnvelope
    connect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<SubmissionCreateWithoutGroupInput, SubmissionUncheckedCreateWithoutGroupInput> | SubmissionCreateWithoutGroupInput[] | SubmissionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutGroupInput | SubmissionCreateOrConnectWithoutGroupInput[]
    createMany?: SubmissionCreateManyGroupInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type GroupMemberUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput> | GroupMemberCreateWithoutGroupInput[] | GroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutGroupInput | GroupMemberCreateOrConnectWithoutGroupInput[]
    upsert?: GroupMemberUpsertWithWhereUniqueWithoutGroupInput | GroupMemberUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupMemberCreateManyGroupInputEnvelope
    set?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    disconnect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    delete?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    update?: GroupMemberUpdateWithWhereUniqueWithoutGroupInput | GroupMemberUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupMemberUpdateManyWithWhereWithoutGroupInput | GroupMemberUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
  }

  export type DailyChallengeUpdateManyWithoutGroupNestedInput = {
    create?: XOR<DailyChallengeCreateWithoutGroupInput, DailyChallengeUncheckedCreateWithoutGroupInput> | DailyChallengeCreateWithoutGroupInput[] | DailyChallengeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: DailyChallengeCreateOrConnectWithoutGroupInput | DailyChallengeCreateOrConnectWithoutGroupInput[]
    upsert?: DailyChallengeUpsertWithWhereUniqueWithoutGroupInput | DailyChallengeUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: DailyChallengeCreateManyGroupInputEnvelope
    set?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    disconnect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    delete?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    connect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    update?: DailyChallengeUpdateWithWhereUniqueWithoutGroupInput | DailyChallengeUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: DailyChallengeUpdateManyWithWhereWithoutGroupInput | DailyChallengeUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: DailyChallengeScalarWhereInput | DailyChallengeScalarWhereInput[]
  }

  export type UserGroupStatsUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserGroupStatsCreateWithoutGroupInput, UserGroupStatsUncheckedCreateWithoutGroupInput> | UserGroupStatsCreateWithoutGroupInput[] | UserGroupStatsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupStatsCreateOrConnectWithoutGroupInput | UserGroupStatsCreateOrConnectWithoutGroupInput[]
    upsert?: UserGroupStatsUpsertWithWhereUniqueWithoutGroupInput | UserGroupStatsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserGroupStatsCreateManyGroupInputEnvelope
    set?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    disconnect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    delete?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    connect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    update?: UserGroupStatsUpdateWithWhereUniqueWithoutGroupInput | UserGroupStatsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserGroupStatsUpdateManyWithWhereWithoutGroupInput | UserGroupStatsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserGroupStatsScalarWhereInput | UserGroupStatsScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutGroupNestedInput = {
    create?: XOR<SubmissionCreateWithoutGroupInput, SubmissionUncheckedCreateWithoutGroupInput> | SubmissionCreateWithoutGroupInput[] | SubmissionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutGroupInput | SubmissionCreateOrConnectWithoutGroupInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutGroupInput | SubmissionUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: SubmissionCreateManyGroupInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutGroupInput | SubmissionUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutGroupInput | SubmissionUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type GroupMemberUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput> | GroupMemberCreateWithoutGroupInput[] | GroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutGroupInput | GroupMemberCreateOrConnectWithoutGroupInput[]
    upsert?: GroupMemberUpsertWithWhereUniqueWithoutGroupInput | GroupMemberUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupMemberCreateManyGroupInputEnvelope
    set?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    disconnect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    delete?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    update?: GroupMemberUpdateWithWhereUniqueWithoutGroupInput | GroupMemberUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupMemberUpdateManyWithWhereWithoutGroupInput | GroupMemberUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
  }

  export type DailyChallengeUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<DailyChallengeCreateWithoutGroupInput, DailyChallengeUncheckedCreateWithoutGroupInput> | DailyChallengeCreateWithoutGroupInput[] | DailyChallengeUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: DailyChallengeCreateOrConnectWithoutGroupInput | DailyChallengeCreateOrConnectWithoutGroupInput[]
    upsert?: DailyChallengeUpsertWithWhereUniqueWithoutGroupInput | DailyChallengeUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: DailyChallengeCreateManyGroupInputEnvelope
    set?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    disconnect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    delete?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    connect?: DailyChallengeWhereUniqueInput | DailyChallengeWhereUniqueInput[]
    update?: DailyChallengeUpdateWithWhereUniqueWithoutGroupInput | DailyChallengeUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: DailyChallengeUpdateManyWithWhereWithoutGroupInput | DailyChallengeUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: DailyChallengeScalarWhereInput | DailyChallengeScalarWhereInput[]
  }

  export type UserGroupStatsUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserGroupStatsCreateWithoutGroupInput, UserGroupStatsUncheckedCreateWithoutGroupInput> | UserGroupStatsCreateWithoutGroupInput[] | UserGroupStatsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupStatsCreateOrConnectWithoutGroupInput | UserGroupStatsCreateOrConnectWithoutGroupInput[]
    upsert?: UserGroupStatsUpsertWithWhereUniqueWithoutGroupInput | UserGroupStatsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserGroupStatsCreateManyGroupInputEnvelope
    set?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    disconnect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    delete?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    connect?: UserGroupStatsWhereUniqueInput | UserGroupStatsWhereUniqueInput[]
    update?: UserGroupStatsUpdateWithWhereUniqueWithoutGroupInput | UserGroupStatsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserGroupStatsUpdateManyWithWhereWithoutGroupInput | UserGroupStatsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserGroupStatsScalarWhereInput | UserGroupStatsScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<SubmissionCreateWithoutGroupInput, SubmissionUncheckedCreateWithoutGroupInput> | SubmissionCreateWithoutGroupInput[] | SubmissionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutGroupInput | SubmissionCreateOrConnectWithoutGroupInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutGroupInput | SubmissionUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: SubmissionCreateManyGroupInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutGroupInput | SubmissionUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutGroupInput | SubmissionUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type GroupCreateNestedOneWithoutMembersInput = {
    create?: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutMembersInput
    connect?: GroupWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type GroupUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutMembersInput
    upsert?: GroupUpsertWithoutMembersInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutMembersInput, GroupUpdateWithoutMembersInput>, GroupUncheckedUpdateWithoutMembersInput>
  }

  export type GroupCreateNestedOneWithoutChallengesInput = {
    create?: XOR<GroupCreateWithoutChallengesInput, GroupUncheckedCreateWithoutChallengesInput>
    connectOrCreate?: GroupCreateOrConnectWithoutChallengesInput
    connect?: GroupWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedChallengesInput = {
    create?: XOR<UserCreateWithoutCreatedChallengesInput, UserUncheckedCreateWithoutCreatedChallengesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedChallengesInput
    connect?: UserWhereUniqueInput
  }

  export type SubmissionCreateNestedManyWithoutChallengeInput = {
    create?: XOR<SubmissionCreateWithoutChallengeInput, SubmissionUncheckedCreateWithoutChallengeInput> | SubmissionCreateWithoutChallengeInput[] | SubmissionUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutChallengeInput | SubmissionCreateOrConnectWithoutChallengeInput[]
    createMany?: SubmissionCreateManyChallengeInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutChallengeInput = {
    create?: XOR<SubmissionCreateWithoutChallengeInput, SubmissionUncheckedCreateWithoutChallengeInput> | SubmissionCreateWithoutChallengeInput[] | SubmissionUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutChallengeInput | SubmissionCreateOrConnectWithoutChallengeInput[]
    createMany?: SubmissionCreateManyChallengeInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumChallengeStatusFieldUpdateOperationsInput = {
    set?: $Enums.ChallengeStatus
  }

  export type GroupUpdateOneRequiredWithoutChallengesNestedInput = {
    create?: XOR<GroupCreateWithoutChallengesInput, GroupUncheckedCreateWithoutChallengesInput>
    connectOrCreate?: GroupCreateOrConnectWithoutChallengesInput
    upsert?: GroupUpsertWithoutChallengesInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutChallengesInput, GroupUpdateWithoutChallengesInput>, GroupUncheckedUpdateWithoutChallengesInput>
  }

  export type UserUpdateOneWithoutCreatedChallengesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedChallengesInput, UserUncheckedCreateWithoutCreatedChallengesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedChallengesInput
    upsert?: UserUpsertWithoutCreatedChallengesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedChallengesInput, UserUpdateWithoutCreatedChallengesInput>, UserUncheckedUpdateWithoutCreatedChallengesInput>
  }

  export type SubmissionUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<SubmissionCreateWithoutChallengeInput, SubmissionUncheckedCreateWithoutChallengeInput> | SubmissionCreateWithoutChallengeInput[] | SubmissionUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutChallengeInput | SubmissionCreateOrConnectWithoutChallengeInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutChallengeInput | SubmissionUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: SubmissionCreateManyChallengeInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutChallengeInput | SubmissionUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutChallengeInput | SubmissionUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<SubmissionCreateWithoutChallengeInput, SubmissionUncheckedCreateWithoutChallengeInput> | SubmissionCreateWithoutChallengeInput[] | SubmissionUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutChallengeInput | SubmissionCreateOrConnectWithoutChallengeInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutChallengeInput | SubmissionUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: SubmissionCreateManyChallengeInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutChallengeInput | SubmissionUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutChallengeInput | SubmissionUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
  }

  export type GroupCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<GroupCreateWithoutSubmissionsInput, GroupUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutSubmissionsInput
    connect?: GroupWhereUniqueInput
  }

  export type DailyChallengeCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<DailyChallengeCreateWithoutSubmissionsInput, DailyChallengeUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: DailyChallengeCreateOrConnectWithoutSubmissionsInput
    connect?: DailyChallengeWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    upsert?: UserUpsertWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmissionsInput, UserUpdateWithoutSubmissionsInput>, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type GroupUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<GroupCreateWithoutSubmissionsInput, GroupUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutSubmissionsInput
    upsert?: GroupUpsertWithoutSubmissionsInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutSubmissionsInput, GroupUpdateWithoutSubmissionsInput>, GroupUncheckedUpdateWithoutSubmissionsInput>
  }

  export type DailyChallengeUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<DailyChallengeCreateWithoutSubmissionsInput, DailyChallengeUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: DailyChallengeCreateOrConnectWithoutSubmissionsInput
    upsert?: DailyChallengeUpsertWithoutSubmissionsInput
    connect?: DailyChallengeWhereUniqueInput
    update?: XOR<XOR<DailyChallengeUpdateToOneWithWhereWithoutSubmissionsInput, DailyChallengeUpdateWithoutSubmissionsInput>, DailyChallengeUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserCreateNestedOneWithoutStatsInput = {
    create?: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatsInput
    connect?: UserWhereUniqueInput
  }

  export type GroupCreateNestedOneWithoutStatsInput = {
    create?: XOR<GroupCreateWithoutStatsInput, GroupUncheckedCreateWithoutStatsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutStatsInput
    connect?: GroupWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatsInput
    upsert?: UserUpsertWithoutStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStatsInput, UserUpdateWithoutStatsInput>, UserUncheckedUpdateWithoutStatsInput>
  }

  export type GroupUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<GroupCreateWithoutStatsInput, GroupUncheckedCreateWithoutStatsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutStatsInput
    upsert?: GroupUpsertWithoutStatsInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutStatsInput, GroupUpdateWithoutStatsInput>, GroupUncheckedUpdateWithoutStatsInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedEnumChallengeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChallengeStatus | EnumChallengeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChallengeStatus[] | ListEnumChallengeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChallengeStatus[] | ListEnumChallengeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChallengeStatusFilter<$PrismaModel> | $Enums.ChallengeStatus
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

  export type NestedEnumChallengeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChallengeStatus | EnumChallengeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChallengeStatus[] | ListEnumChallengeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChallengeStatus[] | ListEnumChallengeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChallengeStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChallengeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChallengeStatusFilter<$PrismaModel>
    _max?: NestedEnumChallengeStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GroupMemberCreateWithoutUserInput = {
    id?: string
    role?: $Enums.Role
    joinedAt?: Date | string
    group: GroupCreateNestedOneWithoutMembersInput
  }

  export type GroupMemberUncheckedCreateWithoutUserInput = {
    id?: string
    groupId: string
    role?: $Enums.Role
    joinedAt?: Date | string
  }

  export type GroupMemberCreateOrConnectWithoutUserInput = {
    where: GroupMemberWhereUniqueInput
    create: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput>
  }

  export type GroupMemberCreateManyUserInputEnvelope = {
    data: GroupMemberCreateManyUserInput | GroupMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubmissionCreateWithoutUserInput = {
    id?: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
    group: GroupCreateNestedOneWithoutSubmissionsInput
    challenge: DailyChallengeCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutUserInput = {
    id?: string
    groupId: string
    challengeId: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput>
  }

  export type SubmissionCreateManyUserInputEnvelope = {
    data: SubmissionCreateManyUserInput | SubmissionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserGroupStatsCreateWithoutUserInput = {
    id?: string
    currentStreak?: number
    longestStreak?: number
    totalSolved?: number
    last7DaysSolved?: number
    last30DaysSolved?: number
    freezeCount?: number
    lastSolvedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    group: GroupCreateNestedOneWithoutStatsInput
  }

  export type UserGroupStatsUncheckedCreateWithoutUserInput = {
    id?: string
    groupId: string
    currentStreak?: number
    longestStreak?: number
    totalSolved?: number
    last7DaysSolved?: number
    last30DaysSolved?: number
    freezeCount?: number
    lastSolvedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGroupStatsCreateOrConnectWithoutUserInput = {
    where: UserGroupStatsWhereUniqueInput
    create: XOR<UserGroupStatsCreateWithoutUserInput, UserGroupStatsUncheckedCreateWithoutUserInput>
  }

  export type UserGroupStatsCreateManyUserInputEnvelope = {
    data: UserGroupStatsCreateManyUserInput | UserGroupStatsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DailyChallengeCreateWithoutCreatorInput = {
    id?: string
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    group: GroupCreateNestedOneWithoutChallengesInput
    submissions?: SubmissionCreateNestedManyWithoutChallengeInput
  }

  export type DailyChallengeUncheckedCreateWithoutCreatorInput = {
    id?: string
    groupId: string
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type DailyChallengeCreateOrConnectWithoutCreatorInput = {
    where: DailyChallengeWhereUniqueInput
    create: XOR<DailyChallengeCreateWithoutCreatorInput, DailyChallengeUncheckedCreateWithoutCreatorInput>
  }

  export type DailyChallengeCreateManyCreatorInputEnvelope = {
    data: DailyChallengeCreateManyCreatorInput | DailyChallengeCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type GroupMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: GroupMemberWhereUniqueInput
    update: XOR<GroupMemberUpdateWithoutUserInput, GroupMemberUncheckedUpdateWithoutUserInput>
    create: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput>
  }

  export type GroupMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: GroupMemberWhereUniqueInput
    data: XOR<GroupMemberUpdateWithoutUserInput, GroupMemberUncheckedUpdateWithoutUserInput>
  }

  export type GroupMemberUpdateManyWithWhereWithoutUserInput = {
    where: GroupMemberScalarWhereInput
    data: XOR<GroupMemberUpdateManyMutationInput, GroupMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type GroupMemberScalarWhereInput = {
    AND?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
    OR?: GroupMemberScalarWhereInput[]
    NOT?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
    id?: StringFilter<"GroupMember"> | string
    userId?: StringFilter<"GroupMember"> | string
    groupId?: StringFilter<"GroupMember"> | string
    role?: EnumRoleFilter<"GroupMember"> | $Enums.Role
    joinedAt?: DateTimeFilter<"GroupMember"> | Date | string
  }

  export type SubmissionUpsertWithWhereUniqueWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutUserInput, SubmissionUncheckedUpdateWithoutUserInput>
    create: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutUserInput, SubmissionUncheckedUpdateWithoutUserInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutUserInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutUserInput>
  }

  export type SubmissionScalarWhereInput = {
    AND?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    OR?: SubmissionScalarWhereInput[]
    NOT?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    id?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    groupId?: StringFilter<"Submission"> | string
    challengeId?: StringFilter<"Submission"> | string
    solved?: BoolFilter<"Submission"> | boolean
    solvedAt?: DateTimeFilter<"Submission"> | Date | string
    timeTaken?: IntNullableFilter<"Submission"> | number | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
  }

  export type UserGroupStatsUpsertWithWhereUniqueWithoutUserInput = {
    where: UserGroupStatsWhereUniqueInput
    update: XOR<UserGroupStatsUpdateWithoutUserInput, UserGroupStatsUncheckedUpdateWithoutUserInput>
    create: XOR<UserGroupStatsCreateWithoutUserInput, UserGroupStatsUncheckedCreateWithoutUserInput>
  }

  export type UserGroupStatsUpdateWithWhereUniqueWithoutUserInput = {
    where: UserGroupStatsWhereUniqueInput
    data: XOR<UserGroupStatsUpdateWithoutUserInput, UserGroupStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserGroupStatsUpdateManyWithWhereWithoutUserInput = {
    where: UserGroupStatsScalarWhereInput
    data: XOR<UserGroupStatsUpdateManyMutationInput, UserGroupStatsUncheckedUpdateManyWithoutUserInput>
  }

  export type UserGroupStatsScalarWhereInput = {
    AND?: UserGroupStatsScalarWhereInput | UserGroupStatsScalarWhereInput[]
    OR?: UserGroupStatsScalarWhereInput[]
    NOT?: UserGroupStatsScalarWhereInput | UserGroupStatsScalarWhereInput[]
    id?: StringFilter<"UserGroupStats"> | string
    userId?: StringFilter<"UserGroupStats"> | string
    groupId?: StringFilter<"UserGroupStats"> | string
    currentStreak?: IntFilter<"UserGroupStats"> | number
    longestStreak?: IntFilter<"UserGroupStats"> | number
    totalSolved?: IntFilter<"UserGroupStats"> | number
    last7DaysSolved?: IntFilter<"UserGroupStats"> | number
    last30DaysSolved?: IntFilter<"UserGroupStats"> | number
    freezeCount?: IntFilter<"UserGroupStats"> | number
    lastSolvedDate?: DateTimeNullableFilter<"UserGroupStats"> | Date | string | null
    createdAt?: DateTimeFilter<"UserGroupStats"> | Date | string
    updatedAt?: DateTimeFilter<"UserGroupStats"> | Date | string
  }

  export type DailyChallengeUpsertWithWhereUniqueWithoutCreatorInput = {
    where: DailyChallengeWhereUniqueInput
    update: XOR<DailyChallengeUpdateWithoutCreatorInput, DailyChallengeUncheckedUpdateWithoutCreatorInput>
    create: XOR<DailyChallengeCreateWithoutCreatorInput, DailyChallengeUncheckedCreateWithoutCreatorInput>
  }

  export type DailyChallengeUpdateWithWhereUniqueWithoutCreatorInput = {
    where: DailyChallengeWhereUniqueInput
    data: XOR<DailyChallengeUpdateWithoutCreatorInput, DailyChallengeUncheckedUpdateWithoutCreatorInput>
  }

  export type DailyChallengeUpdateManyWithWhereWithoutCreatorInput = {
    where: DailyChallengeScalarWhereInput
    data: XOR<DailyChallengeUpdateManyMutationInput, DailyChallengeUncheckedUpdateManyWithoutCreatorInput>
  }

  export type DailyChallengeScalarWhereInput = {
    AND?: DailyChallengeScalarWhereInput | DailyChallengeScalarWhereInput[]
    OR?: DailyChallengeScalarWhereInput[]
    NOT?: DailyChallengeScalarWhereInput | DailyChallengeScalarWhereInput[]
    id?: StringFilter<"DailyChallenge"> | string
    groupId?: StringFilter<"DailyChallenge"> | string
    createdBy?: StringNullableFilter<"DailyChallenge"> | string | null
    date?: DateTimeFilter<"DailyChallenge"> | Date | string
    problemLink?: StringNullableFilter<"DailyChallenge"> | string | null
    status?: EnumChallengeStatusFilter<"DailyChallenge"> | $Enums.ChallengeStatus
    createdAt?: DateTimeFilter<"DailyChallenge"> | Date | string
    updatedAt?: DateTimeFilter<"DailyChallenge"> | Date | string
  }

  export type GroupMemberCreateWithoutGroupInput = {
    id?: string
    role?: $Enums.Role
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type GroupMemberUncheckedCreateWithoutGroupInput = {
    id?: string
    userId: string
    role?: $Enums.Role
    joinedAt?: Date | string
  }

  export type GroupMemberCreateOrConnectWithoutGroupInput = {
    where: GroupMemberWhereUniqueInput
    create: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput>
  }

  export type GroupMemberCreateManyGroupInputEnvelope = {
    data: GroupMemberCreateManyGroupInput | GroupMemberCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type DailyChallengeCreateWithoutGroupInput = {
    id?: string
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    creator?: UserCreateNestedOneWithoutCreatedChallengesInput
    submissions?: SubmissionCreateNestedManyWithoutChallengeInput
  }

  export type DailyChallengeUncheckedCreateWithoutGroupInput = {
    id?: string
    createdBy?: string | null
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type DailyChallengeCreateOrConnectWithoutGroupInput = {
    where: DailyChallengeWhereUniqueInput
    create: XOR<DailyChallengeCreateWithoutGroupInput, DailyChallengeUncheckedCreateWithoutGroupInput>
  }

  export type DailyChallengeCreateManyGroupInputEnvelope = {
    data: DailyChallengeCreateManyGroupInput | DailyChallengeCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserGroupStatsCreateWithoutGroupInput = {
    id?: string
    currentStreak?: number
    longestStreak?: number
    totalSolved?: number
    last7DaysSolved?: number
    last30DaysSolved?: number
    freezeCount?: number
    lastSolvedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStatsInput
  }

  export type UserGroupStatsUncheckedCreateWithoutGroupInput = {
    id?: string
    userId: string
    currentStreak?: number
    longestStreak?: number
    totalSolved?: number
    last7DaysSolved?: number
    last30DaysSolved?: number
    freezeCount?: number
    lastSolvedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGroupStatsCreateOrConnectWithoutGroupInput = {
    where: UserGroupStatsWhereUniqueInput
    create: XOR<UserGroupStatsCreateWithoutGroupInput, UserGroupStatsUncheckedCreateWithoutGroupInput>
  }

  export type UserGroupStatsCreateManyGroupInputEnvelope = {
    data: UserGroupStatsCreateManyGroupInput | UserGroupStatsCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type SubmissionCreateWithoutGroupInput = {
    id?: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSubmissionsInput
    challenge: DailyChallengeCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutGroupInput = {
    id?: string
    userId: string
    challengeId: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutGroupInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutGroupInput, SubmissionUncheckedCreateWithoutGroupInput>
  }

  export type SubmissionCreateManyGroupInputEnvelope = {
    data: SubmissionCreateManyGroupInput | SubmissionCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type GroupMemberUpsertWithWhereUniqueWithoutGroupInput = {
    where: GroupMemberWhereUniqueInput
    update: XOR<GroupMemberUpdateWithoutGroupInput, GroupMemberUncheckedUpdateWithoutGroupInput>
    create: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput>
  }

  export type GroupMemberUpdateWithWhereUniqueWithoutGroupInput = {
    where: GroupMemberWhereUniqueInput
    data: XOR<GroupMemberUpdateWithoutGroupInput, GroupMemberUncheckedUpdateWithoutGroupInput>
  }

  export type GroupMemberUpdateManyWithWhereWithoutGroupInput = {
    where: GroupMemberScalarWhereInput
    data: XOR<GroupMemberUpdateManyMutationInput, GroupMemberUncheckedUpdateManyWithoutGroupInput>
  }

  export type DailyChallengeUpsertWithWhereUniqueWithoutGroupInput = {
    where: DailyChallengeWhereUniqueInput
    update: XOR<DailyChallengeUpdateWithoutGroupInput, DailyChallengeUncheckedUpdateWithoutGroupInput>
    create: XOR<DailyChallengeCreateWithoutGroupInput, DailyChallengeUncheckedCreateWithoutGroupInput>
  }

  export type DailyChallengeUpdateWithWhereUniqueWithoutGroupInput = {
    where: DailyChallengeWhereUniqueInput
    data: XOR<DailyChallengeUpdateWithoutGroupInput, DailyChallengeUncheckedUpdateWithoutGroupInput>
  }

  export type DailyChallengeUpdateManyWithWhereWithoutGroupInput = {
    where: DailyChallengeScalarWhereInput
    data: XOR<DailyChallengeUpdateManyMutationInput, DailyChallengeUncheckedUpdateManyWithoutGroupInput>
  }

  export type UserGroupStatsUpsertWithWhereUniqueWithoutGroupInput = {
    where: UserGroupStatsWhereUniqueInput
    update: XOR<UserGroupStatsUpdateWithoutGroupInput, UserGroupStatsUncheckedUpdateWithoutGroupInput>
    create: XOR<UserGroupStatsCreateWithoutGroupInput, UserGroupStatsUncheckedCreateWithoutGroupInput>
  }

  export type UserGroupStatsUpdateWithWhereUniqueWithoutGroupInput = {
    where: UserGroupStatsWhereUniqueInput
    data: XOR<UserGroupStatsUpdateWithoutGroupInput, UserGroupStatsUncheckedUpdateWithoutGroupInput>
  }

  export type UserGroupStatsUpdateManyWithWhereWithoutGroupInput = {
    where: UserGroupStatsScalarWhereInput
    data: XOR<UserGroupStatsUpdateManyMutationInput, UserGroupStatsUncheckedUpdateManyWithoutGroupInput>
  }

  export type SubmissionUpsertWithWhereUniqueWithoutGroupInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutGroupInput, SubmissionUncheckedUpdateWithoutGroupInput>
    create: XOR<SubmissionCreateWithoutGroupInput, SubmissionUncheckedCreateWithoutGroupInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutGroupInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutGroupInput, SubmissionUncheckedUpdateWithoutGroupInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutGroupInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutGroupInput>
  }

  export type UserCreateWithoutMembershipsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    stats?: UserGroupStatsCreateNestedManyWithoutUserInput
    createdChallenges?: DailyChallengeCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    stats?: UserGroupStatsUncheckedCreateNestedManyWithoutUserInput
    createdChallenges?: DailyChallengeUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type GroupCreateWithoutMembersInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
    challenges?: DailyChallengeCreateNestedManyWithoutGroupInput
    stats?: UserGroupStatsCreateNestedManyWithoutGroupInput
    submissions?: SubmissionCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
    challenges?: DailyChallengeUncheckedCreateNestedManyWithoutGroupInput
    stats?: UserGroupStatsUncheckedCreateNestedManyWithoutGroupInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutMembersInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    stats?: UserGroupStatsUpdateManyWithoutUserNestedInput
    createdChallenges?: DailyChallengeUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    stats?: UserGroupStatsUncheckedUpdateManyWithoutUserNestedInput
    createdChallenges?: DailyChallengeUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type GroupUpsertWithoutMembersInput = {
    update: XOR<GroupUpdateWithoutMembersInput, GroupUncheckedUpdateWithoutMembersInput>
    create: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutMembersInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutMembersInput, GroupUncheckedUpdateWithoutMembersInput>
  }

  export type GroupUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenges?: DailyChallengeUpdateManyWithoutGroupNestedInput
    stats?: UserGroupStatsUpdateManyWithoutGroupNestedInput
    submissions?: SubmissionUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenges?: DailyChallengeUncheckedUpdateManyWithoutGroupNestedInput
    stats?: UserGroupStatsUncheckedUpdateManyWithoutGroupNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateWithoutChallengesInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
    members?: GroupMemberCreateNestedManyWithoutGroupInput
    stats?: UserGroupStatsCreateNestedManyWithoutGroupInput
    submissions?: SubmissionCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutChallengesInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
    members?: GroupMemberUncheckedCreateNestedManyWithoutGroupInput
    stats?: UserGroupStatsUncheckedCreateNestedManyWithoutGroupInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutChallengesInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutChallengesInput, GroupUncheckedCreateWithoutChallengesInput>
  }

  export type UserCreateWithoutCreatedChallengesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    memberships?: GroupMemberCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    stats?: UserGroupStatsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedChallengesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    memberships?: GroupMemberUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    stats?: UserGroupStatsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedChallengesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedChallengesInput, UserUncheckedCreateWithoutCreatedChallengesInput>
  }

  export type SubmissionCreateWithoutChallengeInput = {
    id?: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSubmissionsInput
    group: GroupCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutChallengeInput = {
    id?: string
    userId: string
    groupId: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutChallengeInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutChallengeInput, SubmissionUncheckedCreateWithoutChallengeInput>
  }

  export type SubmissionCreateManyChallengeInputEnvelope = {
    data: SubmissionCreateManyChallengeInput | SubmissionCreateManyChallengeInput[]
    skipDuplicates?: boolean
  }

  export type GroupUpsertWithoutChallengesInput = {
    update: XOR<GroupUpdateWithoutChallengesInput, GroupUncheckedUpdateWithoutChallengesInput>
    create: XOR<GroupCreateWithoutChallengesInput, GroupUncheckedCreateWithoutChallengesInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutChallengesInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutChallengesInput, GroupUncheckedUpdateWithoutChallengesInput>
  }

  export type GroupUpdateWithoutChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupMemberUpdateManyWithoutGroupNestedInput
    stats?: UserGroupStatsUpdateManyWithoutGroupNestedInput
    submissions?: SubmissionUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupMemberUncheckedUpdateManyWithoutGroupNestedInput
    stats?: UserGroupStatsUncheckedUpdateManyWithoutGroupNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type UserUpsertWithoutCreatedChallengesInput = {
    update: XOR<UserUpdateWithoutCreatedChallengesInput, UserUncheckedUpdateWithoutCreatedChallengesInput>
    create: XOR<UserCreateWithoutCreatedChallengesInput, UserUncheckedCreateWithoutCreatedChallengesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedChallengesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedChallengesInput, UserUncheckedUpdateWithoutCreatedChallengesInput>
  }

  export type UserUpdateWithoutCreatedChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: GroupMemberUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    stats?: UserGroupStatsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: GroupMemberUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    stats?: UserGroupStatsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubmissionUpsertWithWhereUniqueWithoutChallengeInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutChallengeInput, SubmissionUncheckedUpdateWithoutChallengeInput>
    create: XOR<SubmissionCreateWithoutChallengeInput, SubmissionUncheckedCreateWithoutChallengeInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutChallengeInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutChallengeInput, SubmissionUncheckedUpdateWithoutChallengeInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutChallengeInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutChallengeInput>
  }

  export type UserCreateWithoutSubmissionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    memberships?: GroupMemberCreateNestedManyWithoutUserInput
    stats?: UserGroupStatsCreateNestedManyWithoutUserInput
    createdChallenges?: DailyChallengeCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    memberships?: GroupMemberUncheckedCreateNestedManyWithoutUserInput
    stats?: UserGroupStatsUncheckedCreateNestedManyWithoutUserInput
    createdChallenges?: DailyChallengeUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutSubmissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
  }

  export type GroupCreateWithoutSubmissionsInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
    members?: GroupMemberCreateNestedManyWithoutGroupInput
    challenges?: DailyChallengeCreateNestedManyWithoutGroupInput
    stats?: UserGroupStatsCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
    members?: GroupMemberUncheckedCreateNestedManyWithoutGroupInput
    challenges?: DailyChallengeUncheckedCreateNestedManyWithoutGroupInput
    stats?: UserGroupStatsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutSubmissionsInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutSubmissionsInput, GroupUncheckedCreateWithoutSubmissionsInput>
  }

  export type DailyChallengeCreateWithoutSubmissionsInput = {
    id?: string
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    group: GroupCreateNestedOneWithoutChallengesInput
    creator?: UserCreateNestedOneWithoutCreatedChallengesInput
  }

  export type DailyChallengeUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    groupId: string
    createdBy?: string | null
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyChallengeCreateOrConnectWithoutSubmissionsInput = {
    where: DailyChallengeWhereUniqueInput
    create: XOR<DailyChallengeCreateWithoutSubmissionsInput, DailyChallengeUncheckedCreateWithoutSubmissionsInput>
  }

  export type UserUpsertWithoutSubmissionsInput = {
    update: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: GroupMemberUpdateManyWithoutUserNestedInput
    stats?: UserGroupStatsUpdateManyWithoutUserNestedInput
    createdChallenges?: DailyChallengeUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: GroupMemberUncheckedUpdateManyWithoutUserNestedInput
    stats?: UserGroupStatsUncheckedUpdateManyWithoutUserNestedInput
    createdChallenges?: DailyChallengeUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type GroupUpsertWithoutSubmissionsInput = {
    update: XOR<GroupUpdateWithoutSubmissionsInput, GroupUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<GroupCreateWithoutSubmissionsInput, GroupUncheckedCreateWithoutSubmissionsInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutSubmissionsInput, GroupUncheckedUpdateWithoutSubmissionsInput>
  }

  export type GroupUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupMemberUpdateManyWithoutGroupNestedInput
    challenges?: DailyChallengeUpdateManyWithoutGroupNestedInput
    stats?: UserGroupStatsUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupMemberUncheckedUpdateManyWithoutGroupNestedInput
    challenges?: DailyChallengeUncheckedUpdateManyWithoutGroupNestedInput
    stats?: UserGroupStatsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type DailyChallengeUpsertWithoutSubmissionsInput = {
    update: XOR<DailyChallengeUpdateWithoutSubmissionsInput, DailyChallengeUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<DailyChallengeCreateWithoutSubmissionsInput, DailyChallengeUncheckedCreateWithoutSubmissionsInput>
    where?: DailyChallengeWhereInput
  }

  export type DailyChallengeUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: DailyChallengeWhereInput
    data: XOR<DailyChallengeUpdateWithoutSubmissionsInput, DailyChallengeUncheckedUpdateWithoutSubmissionsInput>
  }

  export type DailyChallengeUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutChallengesNestedInput
    creator?: UserUpdateOneWithoutCreatedChallengesNestedInput
  }

  export type DailyChallengeUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutStatsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    memberships?: GroupMemberCreateNestedManyWithoutUserInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    createdChallenges?: DailyChallengeCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutStatsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    memberships?: GroupMemberUncheckedCreateNestedManyWithoutUserInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    createdChallenges?: DailyChallengeUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
  }

  export type GroupCreateWithoutStatsInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
    members?: GroupMemberCreateNestedManyWithoutGroupInput
    challenges?: DailyChallengeCreateNestedManyWithoutGroupInput
    submissions?: SubmissionCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutStatsInput = {
    id?: string
    name: string
    inviteCode: string
    createdBy: string
    createdAt?: Date | string
    members?: GroupMemberUncheckedCreateNestedManyWithoutGroupInput
    challenges?: DailyChallengeUncheckedCreateNestedManyWithoutGroupInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutStatsInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutStatsInput, GroupUncheckedCreateWithoutStatsInput>
  }

  export type UserUpsertWithoutStatsInput = {
    update: XOR<UserUpdateWithoutStatsInput, UserUncheckedUpdateWithoutStatsInput>
    create: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStatsInput, UserUncheckedUpdateWithoutStatsInput>
  }

  export type UserUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: GroupMemberUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    createdChallenges?: DailyChallengeUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: GroupMemberUncheckedUpdateManyWithoutUserNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    createdChallenges?: DailyChallengeUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type GroupUpsertWithoutStatsInput = {
    update: XOR<GroupUpdateWithoutStatsInput, GroupUncheckedUpdateWithoutStatsInput>
    create: XOR<GroupCreateWithoutStatsInput, GroupUncheckedCreateWithoutStatsInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutStatsInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutStatsInput, GroupUncheckedUpdateWithoutStatsInput>
  }

  export type GroupUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupMemberUpdateManyWithoutGroupNestedInput
    challenges?: DailyChallengeUpdateManyWithoutGroupNestedInput
    submissions?: SubmissionUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupMemberUncheckedUpdateManyWithoutGroupNestedInput
    challenges?: DailyChallengeUncheckedUpdateManyWithoutGroupNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupMemberCreateManyUserInput = {
    id?: string
    groupId: string
    role?: $Enums.Role
    joinedAt?: Date | string
  }

  export type SubmissionCreateManyUserInput = {
    id?: string
    groupId: string
    challengeId: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
  }

  export type UserGroupStatsCreateManyUserInput = {
    id?: string
    groupId: string
    currentStreak?: number
    longestStreak?: number
    totalSolved?: number
    last7DaysSolved?: number
    last30DaysSolved?: number
    freezeCount?: number
    lastSolvedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyChallengeCreateManyCreatorInput = {
    id?: string
    groupId: string
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutMembersNestedInput
  }

  export type GroupMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutSubmissionsNestedInput
    challenge?: DailyChallengeUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupStatsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalSolved?: IntFieldUpdateOperationsInput | number
    last7DaysSolved?: IntFieldUpdateOperationsInput | number
    last30DaysSolved?: IntFieldUpdateOperationsInput | number
    freezeCount?: IntFieldUpdateOperationsInput | number
    lastSolvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutStatsNestedInput
  }

  export type UserGroupStatsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalSolved?: IntFieldUpdateOperationsInput | number
    last7DaysSolved?: IntFieldUpdateOperationsInput | number
    last30DaysSolved?: IntFieldUpdateOperationsInput | number
    freezeCount?: IntFieldUpdateOperationsInput | number
    lastSolvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupStatsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalSolved?: IntFieldUpdateOperationsInput | number
    last7DaysSolved?: IntFieldUpdateOperationsInput | number
    last30DaysSolved?: IntFieldUpdateOperationsInput | number
    freezeCount?: IntFieldUpdateOperationsInput | number
    lastSolvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyChallengeUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutChallengesNestedInput
    submissions?: SubmissionUpdateManyWithoutChallengeNestedInput
  }

  export type DailyChallengeUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type DailyChallengeUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMemberCreateManyGroupInput = {
    id?: string
    userId: string
    role?: $Enums.Role
    joinedAt?: Date | string
  }

  export type DailyChallengeCreateManyGroupInput = {
    id?: string
    createdBy?: string | null
    date: Date | string
    problemLink?: string | null
    status?: $Enums.ChallengeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGroupStatsCreateManyGroupInput = {
    id?: string
    userId: string
    currentStreak?: number
    longestStreak?: number
    totalSolved?: number
    last7DaysSolved?: number
    last30DaysSolved?: number
    freezeCount?: number
    lastSolvedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionCreateManyGroupInput = {
    id?: string
    userId: string
    challengeId: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
  }

  export type GroupMemberUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type GroupMemberUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMemberUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyChallengeUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutCreatedChallengesNestedInput
    submissions?: SubmissionUpdateManyWithoutChallengeNestedInput
  }

  export type DailyChallengeUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type DailyChallengeUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    problemLink?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChallengeStatusFieldUpdateOperationsInput | $Enums.ChallengeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupStatsUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalSolved?: IntFieldUpdateOperationsInput | number
    last7DaysSolved?: IntFieldUpdateOperationsInput | number
    last30DaysSolved?: IntFieldUpdateOperationsInput | number
    freezeCount?: IntFieldUpdateOperationsInput | number
    lastSolvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStatsNestedInput
  }

  export type UserGroupStatsUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalSolved?: IntFieldUpdateOperationsInput | number
    last7DaysSolved?: IntFieldUpdateOperationsInput | number
    last30DaysSolved?: IntFieldUpdateOperationsInput | number
    freezeCount?: IntFieldUpdateOperationsInput | number
    lastSolvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupStatsUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalSolved?: IntFieldUpdateOperationsInput | number
    last7DaysSolved?: IntFieldUpdateOperationsInput | number
    last30DaysSolved?: IntFieldUpdateOperationsInput | number
    freezeCount?: IntFieldUpdateOperationsInput | number
    lastSolvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    challenge?: DailyChallengeUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyChallengeInput = {
    id?: string
    userId: string
    groupId: string
    solved?: boolean
    solvedAt?: Date | string
    timeTaken?: number | null
    createdAt?: Date | string
  }

  export type SubmissionUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    group?: GroupUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    solved?: BoolFieldUpdateOperationsInput | boolean
    solvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeTaken?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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