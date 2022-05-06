
if [%1]==[pub] (
  if [%2]==[] (
    npx ts-node precode\publish.ts
  ) else (
    npx ts-node precode\publish.ts -c \"%2 %3 %4 %5 %6 %7 %8 %9\"
  )
)

if [%1]==[test] (
  npx ts-node test/test.ts
)