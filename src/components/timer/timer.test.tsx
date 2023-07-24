/** @jest-environment jsdom */

import React from "react"
import "@testing-library/react"
import { render } from "@testing-library/react"
import Timer from "./timer"

describe("Timer formats time correctly", () => {
  test("30 seconds", async () => {
    render(<Timer elapsedSeconds={30} />)
  })
})
