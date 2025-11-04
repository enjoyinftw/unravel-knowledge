import { fn } from "storybook/test";
import * as actual from "./listService";

export * from "./listService";
export const fetchListData = fn(actual.fetchListData).mockName("fetchListData");
