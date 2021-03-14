# Slipgate

This is to be a frontend to download Quake maps from [Quaddicted](https://www.quaddicted.com/). Watch this space!

## To Contributers

### Unit Tests

To run the main process' unit tests, do:

    yarn workspace main jest

### Launching

Build the main process (in VSCode) with Cmd-Shift-b. Then do:

    yarn start

Changes to the renderer process get reloaded automatically. To pick up changes to the main process, enter Cmd-Shift-b to compile it, then choose Slipgate's "Restart" menu item to restart it.

Use the "Attach to Chrome" Run Configuration to debug the renderer process (the React).

### Debugging The Main Process

There's a different workflow if you also need to debug the main process. First, start the React server:

    BROWSER=none yarn workspace main start

When its port is open, use the "Electron: All" launch configuration in VSCode. You'll hit any breakpoint in the codebase.

For more details, refer to the [Electron/React/TypeScript Boilerplate](https://github.com/duganchen/electron-react-typescript-boilerplate) that this is based on.
