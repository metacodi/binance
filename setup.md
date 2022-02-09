# Setup


## Configuring CommonJS dependencies

La llibreria **'@metacodi/binance'** està compilada com un mòdul de tipus **commonjs**. Si s'importa en un projecte compilat com a mòdul **esnext** apareixerà el següent warning.

> WARNING in "...ts" depends on '@metacodi/binance'. CommonJS or AMD dependencies can cause optimization bailouts.

**Fixed**: <https://angular.io/guide/build#configuring-commonjs-dependencies>

```angular.json > projects > app > architect > build > options```
```json
{
  "allowedCommonJsDependencies": [
    "@metacodi/binance"
  ],
}
```

<br />

## Allow Synthetic Default Imports

La llibreria utilitza packages com **isomorphic-ws** que no tenen declarada cap exportació explícita per defecte i, per tant, hauríen de fer-se mitjançant un alias a la manera: `import * as Alias from 'package'`. Com que la llibreria utilitza importacions sintètiques sense àlies, com per exemple `import WebSocket from 'isomorphic-ws'`, apareixerà el següent error:

> ERROR TS1259: Module '".../node_modules/isomorphic-ws/index"' can only be default-imported using the "allowSyntheticDefaultImports' flag


```tsconfig```
```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
  }
}
```

<br />

```tsconfig```
```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "lib": [
      "es2018",
      "dom"
    ],
    "paths": {
      "crypto": [
        "node_modules/crypto-js"
      ]
    },
    "typeRoots": [
      "node_modules/@types"
    ]
  }
}
```