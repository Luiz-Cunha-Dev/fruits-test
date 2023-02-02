import { equal, number, string } from "joi";
import supertest from "supertest";
import app from "../src/app";

const api = supertest(app);

describe("POST /fruits", () => {

    it('should respond with status 201', async () => {
        const result = await api.post("/fruits").send({name: "maçã",price: 1})
        expect(result.status).toBe(201)
    });

    it('should respond with status 409', async () => {
        const result = await api.post("/fruits").send({name: "maçã",price: 1})
        expect(result.status).toBe(409)
    });

    it('should respond with status 422', async () => {
        const result = await api.post("/fruits").send({name: "maçã"})
        expect(result.status).toBe(422)
    });

    it('should respond with status 422', async () => {
        const result = await api.post("/fruits").send({price: 1})
        expect(result.status).toBe(422)
    });

    it('should respond with status 201', async () => {
        const result = await api.post("/fruits").send({name: "banana",price: 2})
        expect(result.status).toBe(201)
    });

})

describe("GET /fruits", () => {

    it('should respond with status 200', async () => {
        const result = await api.get("/fruits")
        expect(result.status).toBe(200)
        expect(result.body.length).toBe(2)
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        )
    });

})

describe("GET /fruits/:id", () => {

    it('should respond with status 200', async () => {
        const result = await api.get("/fruits/1")
        expect(result.status).toBe(200)
    });

    it('should respond with status 404', async () => {
        const result = await api.get("/fruits/3")
        expect(result.status).toBe(404)
    });

})