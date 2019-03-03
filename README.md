# gatsby-source-dailymotion

Source plugin for pulling data into Gatsby from Dailymotion user videos endpoint.



## Install

`npm install --save gatsby-source-dailymotion`
or
`yarn add gatsby-source-dailymotion`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-dailymotion`,
    options: {
      options: {
        user: "<USER-NAME>",
        limit: "100",
      },
  },
];
```

## Plugin Options

### user

###### REQUIRED

```
User ID that you want to fetch videos from
```


## Examples of how to query:

Get all the videos:

```graphql
{
  allDailymotionVideo{
      edges {
        node {
          id
          embed_url
          embed_html
          title
          url
          created_time
          thumbnail_large_url
          description
        }
      }
  	}
}

```


## Note

Remember you are only fetching video information, so this will provide
you with Video titles, descriptions, embedded iframes and thumbnails.
