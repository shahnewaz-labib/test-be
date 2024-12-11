import supertest from "supertest";
import app from "../src/app";
import { expect } from "chai";
import { User } from "../src/model";
import sinon from "sinon";

describe("Test User Service", () => {
	let findStub: sinon.SinonStub;
	let saveStub: sinon.SinonStub;

	beforeEach(async () => {
		findStub = sinon.stub(User, "find").resolves([{
			_id: "123",
			name: "John Doe",
			email: "john.doe@example.com",
			role: "admin",
		},
		]);

		saveStub = sinon.stub(User.prototype, "save").resolves({
			_id: "123",
			name: "John Doe",
			email: "john.doe@example.com",
			role: "admin",
		});
	});

	afterEach(async () => {
		findStub.restore();
		saveStub.restore();
	});

	it("should create a new user", async () => {
		const res = await supertest(app)
			.post("/create")
			.send({ name: "John Doe", email: "john-doe@email.com" });

		expect(res.status).to.equal(201);

		expect(res.body).to.have.property("name");
		expect(res.body).to.have.property("email");

		expect(res.body.name).to.equal("John Doe");
		expect(res.body.email).to.equal("john-doe@email.com");

		expect(saveStub.calledOnce).to.be.true;
	});

	//it("should return all users", async () => {
	//	const res = await supertest(app).get("/read");
	//	expect(res.status).to.equal(200);
	//	expect(res.body).to.be.an("array");
	//});
});
