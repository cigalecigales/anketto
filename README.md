# :bar_chart: anketto
## What is this ?
When giving a presentation, we will take a questionnaire from the participants and display the results in real time.

![anketto](https://user-images.githubusercontent.com/7352476/105623952-3d680d00-5e61-11eb-87e3-f6b67c80353f.png)


## Usage

```bash
$ git clone　https://github.com/cigalecigales/anketto.git
$ cd anketto
$ yarn install

$ yarn build:next
$ yarn build:server
$ yarn start

# access: http://localhost:3000
#  /management ･･･ for a speaker
#  /entry      ･･･ for other
```

## Changing questions

1. Open `src/data/data.json`.

2. Please write questions. This is a sample.

```json
{
  "title": "Sample Questions", // presentation's title
  "questions": [
    {
      "type": "bar-graph", // currently only 'bar-graph' is supported
      "title": "What food do you like ?", // question's title
      "maxSelectableCount": 1, // 1: radio,  2 or more: checkbox
      "selections": [
        {
          "selection": "sushi",
          "color": "#5bc8ac" // graph's color
        },
        {
          "selection": "pasta",
          "color": "#e6d72a"
        },
        {
          "selection": "bento",
          "color": "#f18d9e"
        }
      ]
    },
    // and more
  ]
}
```
