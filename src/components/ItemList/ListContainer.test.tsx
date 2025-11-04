import { describe, it, expect, afterEach, vi } from "vitest";
import ListContainer from "./ListContainer";
import { render, screen } from "@testing-library/react";
import * as listService from "@/services/listService";
import { FakeData } from "./ListComponent";

const getListComponentElements = () => {
  return {
    liElements: screen.queryAllByRole("listitem"),
    loadingElement: screen.queryByText(/loading/i),
    errorElement: screen.queryByText(/error/i),
    noItemsElement: screen.queryByText(/no items/i),
  };
};

describe("ListContainer tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should show only a loading message when mounting", () => {
    render(<ListContainer />);
    const { liElements, loadingElement, errorElement, noItemsElement } = getListComponentElements();

    expect(liElements).toHaveLength(0);
    expect(loadingElement).toBeInTheDocument();
    expect(errorElement).not.toBeInTheDocument();
    expect(noItemsElement).not.toBeInTheDocument();
  });

  it("should show the ListItems when data has been fetched", async () => {
    const spy = vi.spyOn(listService, "fetchListData").mockResolvedValueOnce(FakeData);

    render(<ListContainer />);
    const { loadingElement } = getListComponentElements();
    expect(loadingElement).toBeInTheDocument();

    const liElements = await screen.findAllByRole("listitem");
    const {
      loadingElement: newLoadingElement,
      errorElement,
      noItemsElement,
    } = getListComponentElements();

    expect(newLoadingElement).not.toBeInTheDocument();

    expect(liElements).toHaveLength(3);
    expect(liElements[0]).toHaveTextContent("hello");
    expect(liElements[1]).toHaveTextContent("world");
    expect(liElements[2]).toHaveTextContent("what a lovely day");

    expect(errorElement).not.toBeInTheDocument();
    expect(noItemsElement).not.toBeInTheDocument();
  });

  it("should show an error message when data fetch has not been successful", async () => {
    const spy = vi.spyOn(listService, "fetchListData").mockRejectedValueOnce("error");

    render(<ListContainer />);
    const { loadingElement } = getListComponentElements();

    expect(loadingElement).toBeInTheDocument();
    const errorElement = await screen.findByText(/error/i);

    const {
      loadingElement: newLoadingElement,
      liElements,
      noItemsElement,
    } = getListComponentElements();

    expect(errorElement).toBeInTheDocument();
    expect(liElements).toHaveLength(0);
    expect(newLoadingElement).not.toBeInTheDocument();
    expect(noItemsElement).not.toBeInTheDocument();
  });

  it("should show that the list is empty when data without list content is fetched", async () => {
    const spy = vi.spyOn(listService, "fetchListData").mockResolvedValueOnce([]);
    render(<ListContainer />);
    const { loadingElement } = getListComponentElements();
    expect(loadingElement).toBeInTheDocument();

    const noItemsElement = await screen.findByText(/no items/i);
    const {
      loadingElement: newLoadingElement,
      liElements,
      errorElement,
    } = getListComponentElements();

    expect(noItemsElement).toBeInTheDocument();
    expect(liElements).toHaveLength(0);
    expect(newLoadingElement).not.toBeInTheDocument();
    expect(errorElement).not.toBeInTheDocument();
  });
});
