/** @jest-environment jsdom */

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Timer from "./timer"

jest.mock("next/font/google", () => ({
  Red_Hat_Mono: () => ({
    style: {
      fontFamily: "mocked",
    },
  }),
}))

describe("Timer formats time correctly", () => {
  test("0 seconds", async () => {
    render(<Timer elapsedSeconds={0} />)
    expect(screen.getByText("00:00:00")).toBeInTheDocument()
  })

  test("59 seconds", async () => {
    render(<Timer elapsedSeconds={59} />)
    expect(screen.getByText("00:00:59")).toBeInTheDocument()
  })

  test("1 minute", async () => {
    render(<Timer elapsedSeconds={60} />)
    expect(screen.getByText("00:01:00")).toBeInTheDocument()
  })

  test("1 minute and 12 seconds", async () => {
    render(<Timer elapsedSeconds={72} />)
    expect(screen.getByText("00:01:12")).toBeInTheDocument()
  })

  test("1 hour", async () => {
    render(<Timer elapsedSeconds={3600} />)
    expect(screen.getByText("01:00:00")).toBeInTheDocument()
  })

  test("1 hour and 59 minutes and 59 seconds", async () => {
    render(<Timer elapsedSeconds={7199} />)
    expect(screen.getByText("01:59:59")).toBeInTheDocument()
  })

  test("2 hours", async () => {
    render(<Timer elapsedSeconds={7200} />)
    expect(screen.getByText("02:00:00")).toBeInTheDocument()
  })
})
