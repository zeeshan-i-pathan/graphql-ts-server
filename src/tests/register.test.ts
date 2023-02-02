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
let query = gql`
  mutation {
    register(email: "${email}", password: "${password}") {
      path
      message
    }
  }
`;

describe("Register User Test", () => {
  it("should make a request and succeed and make another request and fail", async () => {
    let response = await request(url, query);
    expect(response.register).toBeNull();
    let user = await User.findOneBy({ email });
    expect(user).not.toBeNull();
    expect(user?.password).not.toEqual(password);
    response = await request(url, query);
    expect(response.register[0].message).toBe('Already Registered!');
  });
});
