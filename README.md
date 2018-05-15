# Ethense-Frontend
React client for the Ethense credential issuing application

## Getting started
The only dependencies for setting up this application are `node v8.4.0` and `yarn 1.6.0
To install local dependencies
```bash
yarn install
```

To test the application
```bash
yarn test
```

To deploy the application locally
```bash
yarn start
```

## Dev process
- code is automatically formatted during a `git` pre-commit hook using `prettier`
- `yarn test` is run during a pre-push hook to prevent failing builds from being checked in