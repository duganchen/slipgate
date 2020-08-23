# Slipgate

This is to be a frontend to download Quake maps from [Quaddicted](https://www.quaddicted.com/). Watch this space!

## To Contributers

To test this, build the main process (in VSCode) with Cmd-Shift-b. Then do:

    yarn start

Changes to the renderer process get reloaded automatically. To pick up changes to the main process, enter Cmd-Shift-b to compile it, then choose Slipgate's "Restart" menu item.

Use the "Attach to Chrome" Run Configuration to debug.

For more details, refer to the [Electron/React/TypeScript Boilerplate](https://github.com/duganchen/electron-react-typescript-boilerplate) that this is based on.

To run the main process' unit tests, do:

    yarn workspace main jest
