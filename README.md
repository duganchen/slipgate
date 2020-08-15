# Slipgate

This is will be used to download Quake maps from [Quaddicted](https://www.quaddicted.com/). Watch this space!

## Setting Up

Just wanted to write a bit about how this project was bootstrapped. It basically just combines the create-react-app with the Typescript version of the Electron quickstart, setting them up with separate source directories and separate Typescript configurations:

    npx create-react-app --template=typescript slipgate
    git clone https://github.com/electron/electron-quick-start-typescript.git
    mkdir -p slipgate/electron
    cp electron-quick-start-typescript/src/*.ts slipgate/electron
    cp electron-quick-start-typescript/tsconfig.json slipgate/electron.json
    cd slipgate
    npm install --save-dev electron

And then I:

* merge the "scripts" section of the Electron quickstart's package.json, editing the script names so that they begin with "-electron" and the script commands so that they use "-p electron.json"
* Edit electron.json to output to public and not dist
* edit main.ts to load http://localhost:3000 (idea from [here](https://medium.com/@brockhoff/using-electron-with-react-the-basics-e93f9761f86f))

To run it, you do:
1. `npm run start`
2. wait for the React app to load in the browser
3. `npm run electron-start`