import supertest from "supertest";
import app from "../src/app";
import { expect } from "chai";
import { User } from "../src/model";
import sinon from "sinon";

describe("/create", () => {
	let saveStub: sinon.SinonStub;

	beforeEach(async () => {
		saveStub = sinon.stub(User.prototype, "save").resolves(
			{
				_id: "123",
				name: "John Doe",
				email: "john.doe@example.com",
				role: "admin",
			}
		);
	});

	afterEach(async () => {
		saveStub.restore();
	});

	it("should create a new user with valid credentials", async () => {
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

	it("should fail to create a new user with missing field: email", async () => {
		const res = await supertest(app)
			.post("/create")
			.send({ name: "John Doe" });

		expect(res.status).to.equal(400);
		expect(res.body).to.have.property("errors");
		expect(res.body.errors).to.have.property("email");

		expect(saveStub.called).to.be.false;
	});

	it("should fail to create a new user with missing field: name", async () => {
		const res = await supertest(app)
			.post("/create")
			.send({ email: "John Doe" });

		expect(res.status).to.equal(400);
		expect(res.body).to.have.property("errors");
		expect(res.body.errors).to.have.property("name");

		expect(saveStub.called).to.be.false;
	});

	it("should fail to create a new user with empty field: email", async () => {
		const res = await supertest(app)
			.post("/create")
			.send({ email: "", name: "John Doe" });

		expect(res.status).to.equal(400);
		expect(res.body).to.have.property("errors");
		expect(res.body.errors).to.have.property("email");

		expect(saveStub.called).to.be.false;
	});

	it("should fail to create a new user with empty field: name", async () => {
		const res = await supertest(app)
			.post("/create")
			.send({ name: "", email: "john-doe@email.com" });

		expect(res.status).to.equal(400);
		expect(res.body).to.have.property("errors");
		expect(res.body.errors).to.have.property("name");

		expect(saveStub.called).to.be.false;
	});
});

describe("/read", () => {
	let findStub: sinon.SinonStub;

	beforeEach(() => {
		findStub = sinon.stub(User, "find").resolves([
			{
				_id: "123",
				name: "John Doe",
				email: "john.doe@example.com",
				role: "admin",
			},
			{
				_id: "456",
				name: "Jane Doe",
				email: "jane.doe@example.com",
				role: "user",
			},
		]);
	});

	afterEach(() => {
		findStub.restore();
	});

	it("should return all users successfully", async () => {
		const res = await supertest(app)
			.get("/read")
			.set("Accept", "application/json");

		expect(res.status).to.equal(200);
		expect(res.body).to.be.an("array").that.is.not.empty;
		expect(res.body[0]).to.have.property("name");
		expect(res.body[0]).to.have.property("email");
		expect(res.body[0].name).to.equal("John Doe");
		expect(res.body[1].name).to.equal("Jane Doe");

		expect(findStub.calledOnce).to.be.true;
	});

	it("should return an empty array when there are no users", async () => {
		findStub.resolves([]);

		const res = await supertest(app)
			.get("/read")
			.set("Accept", "application/json");

		expect(res.status).to.equal(200);
		expect(res.body).to.be.an("array").that.is.empty;
		expect(findStub.calledOnce).to.be.true;
	});
});
