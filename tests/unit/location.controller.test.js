const LocationController = require("../../controllers/location.controllers");
const LocationModel = require("../../model/location.model");
const httpMocks = require("node-mocks-http");
const newLocation = require("../mock-data/new-location.json");
const allLocations = require("../mock-data/all-locations.json");

jest.mock("../../model/location.model");

let req, res, next;
const locationId = "64b13eb35eff801fd21659b6";
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});
describe("LocationController.addLocation", () => {

    beforeEach(() => {
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
        expect((res._getJSONData()))
    });
    it("Should handle errors", async () => {
        const rejectedPromise = Promise.reject();
        LocationModel.create.mockReturnValue(rejectedPromise);
        await LocationController.addLocation(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
    });
    
});

describe("LocationController.getLocations", () => {
    it("should have a getLocations function", () => {
        expect(typeof LocationController.getLocations).toBe("function");
    });
    it("Should call LocationModel.find({})", async () => {
        await LocationController.getLocations(req, res);
        expect(LocationModel.find).toHaveBeenCalledWith({});
    });
    it("Should return response with status 200 and all locations", async () => {
        LocationModel.find.mockReturnValue(allLocations);
        await LocationController.getLocations(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData())
    });
    it("Should handle errors in getLocations", async () => {
        const rejectedPromise = Promise.reject();
        LocationModel.find.mockReturnValue(rejectedPromise);
        await LocationController.getLocations(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
    });
});

describe("LocationController.getLoationById", () => {
    it("Should have a getLoationById", () => {
        expect(typeof LocationController.getLocationById).toBe("function");
    });
    it("Should call LocationModel.findById with route parameters", async () => {
        req.params.locationId = locationId;
        await LocationController.getLocationById(req, res);
        expect(LocationModel.findById).toBeCalledWith(locationId);
    });
    it("Should handle errors in getLocationById", async () => {
        const rejectedPromise = Promise.reject();
        LocationModel.findById.mockReturnValue(rejectedPromise);
        await LocationController.getLocationById(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("Should return 404 when item doesn't exist", async () => {
        LocationModel.findById.mockReturnValue(null);
        await LocationController.getLocationById(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    });
});

describe("LocationController.updateLocation", () => {
    it("Should have an updateLocation function", () => {
        expect(typeof LocationController.updateLocation).toBe("function");
    });
    it("Should update with LocationModel.findByIdAndUpdate", async () => {
        req.params.locationId = locationId;
        req.body = newLocation;
        await LocationController.updateLocation(req, res);
        expect(LocationModel.findByIdAndUpdate).toHaveBeenCalledWith(locationId, newLocation, {
            new: true,
            useFindAndModify: false
        });
    });
    it("Should return response with status 200 and json body", async () => {
        req.params.locationId = locationId;
        req.body = newLocation;
        LocationModel.findByIdAndUpdate.mockReturnValue(newLocation);
        await LocationController.updateLocation(req, res);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData());
    });
    it("Should handle errors in getLocationById", async () => {
        const rejectedPromise = Promise.reject();
        LocationModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await LocationController.updateLocation(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("Should return 404 when item doesn't exist", async () => {
        LocationModel.findByIdAndUpdate.mockReturnValue(null);
        await LocationController.updateLocation(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    });
});

describe("LocationController.deleteLocation", () => {
    it("Should have an deleteLocation function", () => {
        expect(typeof LocationController.deleteLocation).toBe("function");
    });
    it("Should delete with LocationModel.findByIdAndDelete", async () => {
        req.params.locationId = locationId;
        req.body = newLocation;
        await LocationController.deleteLocation(req, res);
        expect(LocationModel.findByIdAndDelete).toBeCalledWith(locationId);
    });
    it("Should return response with status 200 and json body", async () => {
        req.params.locationId = locationId;
        req.body = newLocation;
        LocationModel.findByIdAndDelete.mockReturnValue(newLocation);
        await LocationController.deleteLocation(req, res);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData());
    });
    it("Should handle errors in deleteLocation", async () => {
        const rejectedPromise = Promise.reject();
        LocationModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await LocationController.deleteLocation(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("Should return 404 when item doesn't exist", async () => {
        LocationModel.findByIdAndDelete.mockReturnValue(null);
        await LocationController.deleteLocation(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    });
})