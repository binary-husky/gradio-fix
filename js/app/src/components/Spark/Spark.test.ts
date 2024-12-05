import { test, describe, assert, afterEach } from "vitest";
import { cleanup, render } from "@gradio/tootils";

import Spark from "./Spark.svelte";
import type { LoadingStatus } from "../StatusTracker/types";

const loading_status = {
    eta: 0,
    queue_position: 1,
    status: "complete" as LoadingStatus["status"],
    scroll_to_output: false,
    visible: true,
    fn_index: 0
};

describe("Spark", () => {
    afterEach(() => cleanup());

    test("renders provided value", () => {
        const { getByDisplayValue } = render(Spark, {
            loading_status,
            show_label: true,
            mode: "dynamic",
            value: "test",
            label: "Spark"
        });

        const item: HTMLInputElement = getByDisplayValue("test");
        assert.equal(item.value, "test");
    });
}); 