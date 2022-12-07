# Running Puzzle Solutions
To run each solution, within a given puzzle folder (eg `src/puzzles/1`) run:
```
npm i
npx ts-node index.ts
```

# Setting Up Input Files
You can place input files into `src/input` with format `${day}.txt`.
Alternatively, copy your session value from the cookie header in an input request and save it in `.env` as `AOC_SESSION`, and the files will be fetched as needed for you.