const request = require("supertest");
const app = require("../../app");
const newLocation = require("../mock-data/new-location.json");

const locationURL = "/location/";

describe(locationURL, () => {
    it("POST" + locationURL, async () => {
        const response = await request(app)
            .post(locationURL)
            .send(newLocation);
        //expect(response.statusCode).toBe(201);
        //expect(response.body.name).toBe(newLocation.name);

    });
    it("Should return error 500 on malformed data with POST" + locationURL, 
    async () => {
        const response = await request(app)
        .post(locationURL)
        .send({ name: "Properties missing" });
    //expect(response.statusCode).toBe(500); 
   // expect(response.body).toEqual({
    //     message: "Location validation failed"
    // });  
    });
})