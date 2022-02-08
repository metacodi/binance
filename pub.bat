echo off
cls

if [%1]==[] (
  echo "npx ts-node precode\publish.ts"
  npx ts-node precode\publish.ts
) else (
  REM Descripció pel commit.
  echo "npx ts-node precode\publish.ts -c %1"
  npx ts-node precode\publish.ts -c %1
)