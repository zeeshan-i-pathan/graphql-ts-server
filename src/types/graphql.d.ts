// tslint:disable
// graphql typescript definitions

export declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
hello: string | null;
getQuotation: IQuotation | null;
}

interface IQuotation {
__typename: "Quotation";
proposers: Array<IUser> | null;
insureds: Array<IUser> | null;
plans: Array<IPlan | null> | null;
}

interface IUser {
__typename: "User";
name: string;
age: number;
email: string;
gender: Gender | null;
}

const enum Gender {
M = 'M',
F = 'F'
}

interface IPlan {
__typename: "Plan";
sumAssured: number;
annualPrem: number;
}

interface IMutation {
__typename: "Mutation";
register: Array<IError> | null;
}

interface IRegisterOnMutationArguments {
email: string;
password: string;
}

interface IError {
__typename: "Error";
path: string | null;
message: string | null;
}
}

// tslint:enable
