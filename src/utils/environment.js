import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime'

const source = new RecordSource()
const store = new Store(source)

const fetchQuery = function (
    operation,
    variables,
    cacheConfig,
    uploadables,
) {
    return fetch(process.env.API_ENDPOINT, {
        method: 'POST',
        headers: {
            // Add authentication and other headers here
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text, // GraphQL text from input
            variables,
        }),
    }).then(response => response.json())
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery)

// Create an environment using this network:
const environment = new Environment({
    store,
    network,
});

export default environment