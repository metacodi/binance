# Setup


## Configuring CommonJS dependencies

> WARNING in ...my-project-file.ts depends on '@metacodi/binance'. CommonJS or AMD dependencies can cause optimization bailouts.

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