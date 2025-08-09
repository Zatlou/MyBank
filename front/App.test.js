// front/src/App.test.js
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("axios"); // <-- important

function App() {
  return <h1>Mybank</h1>;
}

test("affiche le titre Mybank", () => {
  render(<App />);
  expect(screen.getByText(/Mybank/i)).toBeInTheDocument();
});
