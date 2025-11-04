import { describe, it, expect } from "vitest";
import ListComponent, { FakeData } from "@/components/ItemList/ListComponent";

import { render, screen } from "@testing-library/react";

const getListComponentElements = () => {
  return {
    liElements: screen.queryAllByRole("listitem"),
    loadingElement: screen.queryByText(/loading/i),
    errorElement: screen.queryByText(/error/i),
    noItemsElement: screen.queryByText(/no items/i),
  };
};

describe("ListComponent tests", () => {
  it("should render a list of items when given data, is not loading and has no error", () => {
    const listState = {
      items: FakeData,
      isLoading: false,
      errorMsg: "",
    };
    render(<ListComponent {...listState} />);

    const { liElements, loadingElement, errorElement, noItemsElement } = getListComponentElements();

    expect(liElements).toHaveLength(3);
    expect(liElements[0]).toHaveTextContent("hello");
    expect(liElements[1]).toHaveTextContent("world");
    expect(liElements[2]).toHaveTextContent("what a lovely day");

    expect(loadingElement).not.toBeInTheDocument();
    expect(errorElement).not.toBeInTheDocument();
    expect(noItemsElement).not.toBeInTheDocument();
  });

  it("should show loading when given state is loading", () => {
    const listState = {
      items: [],
      isLoading: true,
      errorMsg: "",
    };
    render(<ListComponent {...listState} />);

    const { liElements, loadingElement, errorElement, noItemsElement } = getListComponentElements();

    expect(loadingElement).toBeInTheDocument();
    expect(liElements).toHaveLength(0);
    expect(errorElement).not.toBeInTheDocument();
    expect(noItemsElement).not.toBeInTheDocument();
  });

  it("should show error message when given state has error message", () => {
    const listState = {
      items: [],
      isLoading: false,
      errorMsg: "error",
    };
    render(<ListComponent {...listState} />);

    const { liElements, loadingElement, errorElement, noItemsElement } = getListComponentElements();

    expect(errorElement).toBeInTheDocument();
    expect(liElements).toHaveLength(0);
    expect(loadingElement).not.toBeInTheDocument();
    expect(noItemsElement).not.toBeInTheDocument();
  });

  it("should show no items message when not loading, no error message and no items", () => {
    const listState = {
      items: [],
      isLoading: false,
      errorMsg: "",
    };
    render(<ListComponent {...listState} />);
    const { liElements, loadingElement, errorElement, noItemsElement } = getListComponentElements();

    expect(noItemsElement).toBeInTheDocument;
    expect(liElements).toHaveLength(0);
    expect(loadingElement).not.toBeInTheDocument();
    expect(errorElement).not.toBeInTheDocument();
  });
});
