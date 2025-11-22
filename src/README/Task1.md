# Task 1: Portfolio Overview Screen

## Overview

Create a “My Portfolio” screen that:
•	Fetches stock/crypto data (can be from a free public API or a mock JSON file)
•	Displays the list in a scrollable view showing symbol, name, and change %
•	Allows user to “pin” up to 3 items to the top (persisted via AsyncStorage)
•	Automatically highlights pinned rows with a different background color


### State persistence approach

Used a custom `usePinnedStocks()` hook that manages two useEffect calls: the first loads pinned stock IDs from AsyncStorage when the component mounts, and the second automatically saves to AsyncStorage whenever the pinned IDs change. Also prevented race conditions by using an `isLoading` state that blocks saves until the initial load is complete. Ensuring that pinned items persist across app reloads without duplicating data or losing state during the loading phase.
