import { TAddress } from "@/types/address.types";
import { TApiDefinition, HttpMethod } from "@/types/base.types";
import { RESOURCES } from "../constants";

export const addressesApi = {
    // BUYER PUBLIC //

    // BUYER PRIVATE //

    // QUERY //
    getDefault: (): TApiDefinition<TAddress> => ({
        route: `${RESOURCES.ADDRESSES.PRIVATE}/default`,
        method: HttpMethod.GET,
    }),

};