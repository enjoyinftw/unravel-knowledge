import { describe, it, expect, vi } from "vitest";

import { render, screen } from "@testing-library/react"

import SimpleTimer from "./SimpleTimer";

describe("SimpleTimer", () => {
  it("should show timer at 0 when rendered", () => {
    render(<SimpleTimer />)
    
    const counterElement = screen.getByText(/this component/i);

    expect(counterElement).toBeInTheDocument();
    expect(counterElement).toHaveTextContent(/This component has been mounted for 0 seconds./i)
  })

  it("should call clean up function when unmounted", () => {
    const clearSpy = vi.spyOn(global, "clearInterval")
    const { unmount } = render(<SimpleTimer />)
    
    unmount();
    expect(clearSpy).toHaveBeenCalledOnce();
  })
})