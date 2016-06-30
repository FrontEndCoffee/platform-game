# Troubleshooting your development environment

## 1. I cannot run the gulp script!

### 1.1 Check node and npm version
Use the following commands to verify your install:

```bash
npm --version #Should return 3.9.x
node --version #Should return v6.x
```

### 1.2 `npm run start` fails with the following error:
```
gulp.task('default', (callback) => {
                                 ^
SyntaxError: Unexpected token >
[truncated...]
```

This is an issue with your node version. Check out [Troubleshooting 1.1](#11-check-node-and-npm-version)