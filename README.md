# ghadyaal
React component art clock based on [@paulrickards](https://twitter.com/paulrickards)'s [8-bit line numerals](https://twitter.com/paulrickards/status/947919163611328512)

[Example](https://media.giphy.com/media/l0HU5yvMwdJ2OsQ1O/giphy.gif)

## Install
```
npm install ghadyaal
```

## Usage
```
<Ghadyaal // these are the default values
  numeralSize={30}
  baseStrokeWidth={4}
  backgroundColor="#fff"
  strokeColor="#000"
/>
```

or simply:
```
<Ghadyaal />
```

## Relevant DOM Elements
`id=timers` [Container for the numerals]

`class=timer`

`class=line`
