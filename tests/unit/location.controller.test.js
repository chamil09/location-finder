const LocationController = require("../../controllers/location.controllers");
const LocationModel = require("../../model/location.model");
const httpMocks = require("node-mocks-http");
const newLocation = require("../mock-data/new-location.json");

LocationModel.create = jest.fn(); //to check if the method is called

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("LocationController.getLocation", () => {
    it("should have a getLocation function", () => {
        expect(typeof LocationController.getLocation).toBe("function");
    });
    it("Should call LocationModel.find({})", async () => {
       //await LocationController.getLocation(req, res, next);
       // expect(LocationController.find).toHaveBeenCalledWith({});
    });
});
describe("LocationController.addLocation", () => {

    beforeEach(()=>{
        req.body = newLocation;
    })
    it("should have an addLocation function", () => {
        expect(typeof LocationController.addLocation).toBe("function");
    });
    it("should call LocationModel.create", () => {
        LocationController.addLocation(req, res);
        expect(LocationModel.create).toBeCalledWith(newLocation);
    });
    it("should return 201 response code", async () => {
        await LocationController.addLocation(req, res);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("Should return json body in response", async () => {
        LocationModel.create.mockReturnValue(newLocation);
        await LocationController.addLocation(req, res);
        expect((res._getJSONData())).toStrictEqual(newLocation);
    });
    it("Should handle errors", async () => {
        const errorMessage = { message: 'Error retrieving locations'};
        const rejectedPromise = Promise.reject(errorMessage);
        LocationModel.create.mockReturnValue(rejectedPromise);
        await LocationController.addLocation(req, res);
        expect(res.statusCode).toBe(500);
        expect(res._isEndCalled()).toBeTruthy();
    })
}); 