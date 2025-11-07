1. Text Component with Dynamic Title
Description: A component that updates the document title based on user input changes. Exercise Steps:
Render an input field with a default value.
Use useEffect with dependencies to update the document title whenever the input value changes.
Testing Strategies:
Unit Test: Simulate input changes and verify that the document.title updates accordingly using mocking.
Storybook: Have controls to type into the input and show changes in the document title reflected immediately.
1. Stopwatch Component
Description: A stopwatch with a start/pause button, keeping track of elapsed time. Exercise Steps:
Start with a timer display showing 0.
Implement a start/pause button that toggles the counting state.
Use useEffect to manage the interval based on the counting state.
Testing Strategies:
Unit Test: Use fake timers to simulate time progression, asserting increments in time and proper pause behavior.
Storybook: Show the interactive stopwatch with start/pause capabilities, allowing interaction to start and stop timing.