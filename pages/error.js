export async function getStaticProps({res, err}) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return {statusCode}
}

function Error({statusCode}) {
    return(
        <p>
            {statusCode 
            ? `An error with ${statusCode} occured on the server.` 
            : 'An error occured on the client side.'}
        </p>
    )
}

export default Error