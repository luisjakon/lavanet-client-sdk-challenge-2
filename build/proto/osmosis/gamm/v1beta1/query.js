"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryNumPoolsResponse = exports.QueryNumPoolsRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "osmosis.gamm.v1beta1";
function createBaseQueryNumPoolsRequest() {
    return {};
}
exports.QueryNumPoolsRequest = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryNumPoolsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseQueryNumPoolsRequest();
        return message;
    },
};
function createBaseQueryNumPoolsResponse() {
    return { numPools: long_1.default.UZERO };
}
exports.QueryNumPoolsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.numPools.isZero()) {
            writer.uint32(8).uint64(message.numPools);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryNumPoolsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.numPools = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { numPools: isSet(object.numPools) ? long_1.default.fromValue(object.numPools) : long_1.default.UZERO };
    },
    toJSON(message) {
        const obj = {};
        message.numPools !== undefined && (obj.numPools = (message.numPools || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryNumPoolsResponse();
        message.numPools = (object.numPools !== undefined && object.numPools !== null)
            ? long_1.default.fromValue(object.numPools)
            : long_1.default.UZERO;
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || "osmosis.gamm.v1beta1.Query";
        this.rpc = rpc;
        this.NumPools = this.NumPools.bind(this);
    }
    NumPools(request) {
        const data = exports.QueryNumPoolsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "NumPools", data);
        return promise.then((data) => exports.QueryNumPoolsResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
