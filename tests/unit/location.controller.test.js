const LocationController = require("../../controllers/location.controllers");
const LocationModel = require("../../model/location.model");
const httpMocks = require("node-mocks-http");
const newLocation = require("../mock-data/new-location.json");
const allLocations = require("../mock-data/all-locations.json");

//LocationModel.create = jest.fn(); //to check if the method is called

jest.mock("../../model/location.model");

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
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

describe("LocationController.getLocations", () => {
    it("should have a getLocations function", () => {
        expect(typeof LocationController.getLocations).toBe("function");
    });
    it("Should call LocationModel.find({})", async () => {
       await LocationController.getLocations(req, res);
       //expect(LocationController.find).toHaveBeenCalledWith({});
    });
    it("Should return response with status 200 and all locations", async () => {
        LocationModel.find.mockReturnValue(allLocations);
        await LocationController.getLocations(req,res);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allLocations);
    });
    it("Should handle errors in getLocations", async () => {
        const errorMessage = { message: 'Error retrieving locations'};
        const rejectedPromise = Promise.reject(errorMessage);
        LocationModel.find.mockReturnValue(rejectedPromise);
        await LocationController.getLocations(req,res);
        expect(res.statusCode).toBe(500);
        expect(res._isEndCalled()).toBeTruthy();
    });
});