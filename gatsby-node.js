const fetch = require("node-fetch")

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  const processPhoto = video => {
    const nodeId = createNodeId(`dailymotion-video${video.id}`)
    const nodeContent = JSON.stringify(video)
    const nodeData = Object.assign({}, video, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `DailymotionVideo`,
        content: nodeContent,
        contentDigest: createContentDigest(video),
      },
    })

    return nodeData
  }
  const URL = `https://api.dailymotion.com/user/${
    configOptions.user
  }/videos?fields=id,embed_url,embed_html,title,url,created_time,thumbnail_large_url,description&limit=${
    configOptions.limit
  }`
  const apiURL = URL.trim()
  return (
    // Fetch a response from the apiUrl
    fetch(apiURL)
      // Parse the response as JSON
      .then(response => response.json())
      // Process the JSON data into a node
      .then(data => {
        // For each query result (or 'hit')
        data.list.forEach(data => {
          // Process the photo data to match the structure of a Gatsby node
          const nodeData = processPhoto(data)
          // Use Gatsby's createNode helper to create a node from the node data
          createNode(nodeData)
        })
      })
  )
}
