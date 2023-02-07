import Server from "../server";
import { AddressInfo } from "net";
import { IncomingMessage, ServerResponse, Server as HttpServer } from "http";
import { request, gql } from "graphql-request";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { faker } from '@faker-js/faker';

let conn: HttpServer<typeof IncomingMessage, typeof ServerResponse>;
let address: AddressInfo;
let url: string;
beforeAll(async () => {
  conn = await Server();
  address = conn.address() as AddressInfo;
  url = `http://localhost:${address.port}/graphql`;
});

afterAll(async () => {
  conn.close();
  await AppDataSource.destroy();
});
let email = faker.internet.email();
let password = faker.internet.password();
let query = (email: string, password: string) => gql`
  mutation {
    register(email: "${email}", password: "${password}") {
      path
      message
    }
  }
`;

describe("Register User Test", () => {
  it("should make a request and succeed and make another request and fail", async () => {
    // Register a new email once
    let response = await request(url, query(email, password));
    // This should be able to succeed
    expect(response.register).toBeNull();
    let user = await User.findOne({where: {email}, select: ['password']});
    expect(user).not.toBeNull();
    // The password should not match as the password should be encrypted in the database
    expect(user?.password).not.toEqual(password);
    // Try to Register with the same email again
    response = await request(url, query(email, password));
    // This should fail with an error message
    expect(response.register.length).toBe(1);
    expect(response.register[0].path).toBe('email');
  });

  it("should check for valid email", async () => {
    // Register with invalid email
    let response = await request(url, query("ab", password));
    // It should throw two errors
    expect(response.register.length).toBe(2);
    // And both the errors should be related to email;
    expect(response.register[0]?.path).toBe("email");
    expect(response.register[1]?.path).toBe("email");
  })
});
