# Two state validation demo

This is a simple React demo to showcase a form implementing a *two state validation pattern* with *debouncing*.

The two state validation pattern in a nutshell:

- If the form input **is untouched**, it validates input only on blur (when the form input loses focus).
- If the form input has been validated and **is invalid**, it validates input on every change. However, to avoid validating while the user is actively inputting data, it waits for a few milliseconds of inactivity before doing it (that's the **debouncing**).

## Running the demo

The demo is a simple `create-react-app` app, so you can simply clone the repo, `npm install` and then `npm start`.

## Credits

The demo was made using React, `create-react-app`, and a few icons from Bootstrap.