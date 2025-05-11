import { render, screen } from "@testing-library/react";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import GameProgress from "@/components/GameProgress";

describe("GameProgress Component", () => {
  it("renders the phase and percentage correctly", () => {
    render(<GameProgress current={3} total={10} phase="City Selection" />);

    // Check if the phase is rendered
    expect(screen.getByText("City Selection")).toBeInTheDocument();

    // Check if the percentage is rendered correctly
    expect(screen.getByText("30%")).toBeInTheDocument();
  });

  it("renders the progress bar with the correct width", () => {
    render(<GameProgress current={5} total={10} phase="Vehicle Selection" />);

    // Check if the progress bar width is correct
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle("width: 50%");
  });

  it("handles edge cases for percentage calculation", () => {
    // Case: current = 0
    render(<GameProgress current={0} total={10} phase="Start" />);
    expect(screen.getByText("0%")).toBeInTheDocument();

    // Case: current = total
    render(<GameProgress current={10} total={10} phase="Complete" />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("handles invalid total values gracefully", () => {
    render(<GameProgress current={0} total={5} phase="Error" />);

    // Check if the percentage is rendered as 0% when total is 0
    expect(screen.getByText("0%")).toBeInTheDocument();

    // Check if the progress bar width is 0%
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle("width: 0%");
  });
});