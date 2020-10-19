import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Default from "./Default";

test("renders a link that to the page", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Default />
    </Router>
  );
  expect(screen.getByRole("link")).toHaveTextContent("return home");
});
