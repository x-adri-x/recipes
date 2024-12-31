// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const response = await fetch('https://upload.contentful.com/spaces/dtigw1ldgyh9/uploads', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.CONTENTFUL_CMA_ACCESS_TOKEN,
      'Content-Type': 'application/octet-stream',
    },
    body: {
      'data-binary': '/fahejas-almachips-thumbnail.png',
    },
  }).then((response) => response.json())
  const body = {
    fields: {
      title: {
        'en-US': 'lmao',
      },
      file: {
        'en-US': {
          contentType: 'image/png',
          fileName: 'fahejas-almachips-thumbnail.png',
          uploadFrom: {
            sys: {
              type: 'Link',
              linkType: 'Upload',
              id: response.sys.id,
            },
          },
        },
      },
    },
  }

  const data = await fetch('https://api.contentful.com/spaces/dtigw1ldgyh9/environments/master/assets/test-asset', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + process.env.CONTENTFUL_CMA_ACCESS_TOKEN,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
    },
    body: JSON.stringify(body),
  }).then((data) => data.json())

  res.status(200).json(data)
}
