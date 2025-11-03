1. List Component
Description: A component that fetches data when it is mounted. It shows a loading screen initially and then displays a list of items once the data is fetched. Exercise Steps:
On mount, trigger a data-fetching function using useEffect.
Display a loading message while the data is being fetched.
Once the data is retrieved, render it in a list format.
Testing Strategies:
Unit Test: Mock the fetch call to return a resolved promise. Assert that the loading indicator appears first, and then the data is displayed.
Storybook: Start with a loading state and transition to displaying items. Use Storybook's asynchronous controls to simulate the fetch delay.
2. Timer Component
Description: A timer that starts counting on mount and stops (cleanup) on unmount. Exercise Steps:
Begin with a counter set to 0.
Use useEffect to start a timer that increments the counter every second.
Implement cleanup logic in useEffect to clear the timer when unmounted.
Testing Strategies:
Unit Test: Use Jest's fake timers to verify the timer starts, increments, and cleans up correctly.
Storybook: Display the timer running and stopping; allow users to toggle the visibility of the component to test unmounting.
3. Text Component with Unmount Logging
Description: A simple text component that logs a message to the console when it unmounts. Exercise Steps:
Render some basic text in the component.
Use useEffect with a cleanup function that logs "Component unmounted" to the console.
Testing Strategies:
Unit Test: Use a spy on console.log to confirm the unmount message is logged correctly.
Storybook: Use controls to mount and unmount the text component, observing console logs in the Storybook console.
4. Text Component with Dynamic Title
Description: A component that updates the document title based on user input changes. Exercise Steps:
Render an input field with a default value.
Use useEffect with dependencies to update the document title whenever the input value changes.
Testing Strategies:
Unit Test: Simulate input changes and verify that the document.title updates accordingly using mocking.
Storybook: Have controls to type into the input and show changes in the document title reflected immediately.
5. Stopwatch Component
Description: A stopwatch with a start/pause button, keeping track of elapsed time. Exercise Steps:
Start with a timer display showing 0.
Implement a start/pause button that toggles the counting state.
Use useEffect to manage the interval based on the counting state.
Testing Strategies:
Unit Test: Use fake timers to simulate time progression, asserting increments in time and proper pause behavior.
Storybook: Show the interactive stopwatch with start/pause capabilities, allowing interaction to start and stop timing.