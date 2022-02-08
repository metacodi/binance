echo off
cls

if [%1]==[] (
  echo "npx ts-node precode\publish.ts"
  npx ts-node precode\publish.ts
) else (
  @REM Descripció pel commit.
  @REM echo "npx ts-node precode\publish.ts -c %1 %2 %3 %4 %5 %6 %7 %8 %9"
  npx ts-node precode\publish.ts -v -c \"%1 %2 %3 %4 %5 %6 %7 %8 %9\"
)