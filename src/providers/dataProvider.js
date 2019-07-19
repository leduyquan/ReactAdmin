import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';

const API_URL = 'http://localhost:8000';

const getResource = resource => {
    switch (resource) {
        case 'users':
            return 'users';

        case 'places':
            return 'places';

        case 'languages':
            return 'languages';

        case 'objects':
            return 'objects';

        default:
            throw new Error(`Unknown resource ${resource}`);
    }
};

const convertDataProviderRequestToHTTP = (type, resource, params) => {
    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify(params.filter),
            };
            return { url: `${API_URL}/${resource}?${stringify(query)}` };
        }
        case GET_ONE:
            return { url: `${API_URL}/${resource}/${params.id}` };
        case GET_MANY: {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            return { url: `${API_URL}/${resource}?${stringify(query)}` };
        }
        case GET_MANY_REFERENCE: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
            };
            return { url: `${API_URL}/${resource}?${stringify(query)}` };
        }
        case UPDATE:
            return {
                url: `${API_URL}/${resource}/${params.id}`,
                options: { method: 'PUT', body: JSON.stringify(params.data) },
            };
        case CREATE:
            return {
                url: `${API_URL}/${resource}`,
                options: { method: 'POST', body: JSON.stringify(params.data) },
            };
        case DELETE:
            return {
                url: `${API_URL}/${resource}/${params.id}`,
                options: { method: 'DELETE' },
            };
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
};

const convertHTTPResponseToDataProvider = (response, type, params) => {
    const { json } = response;
    switch (type) {
        case GET_LIST:
            return {
                data: json.map(x => x),
                total: json.length
                // total: parseInt(headers.get('content-range').split('/').pop(), 10),
            };
        case CREATE:
            return { data: { ...params.data, id: json.id } };
        default:
            return { data: json };
    }
};

export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const resourceAPI = getResource(resource);
    const { url, options } = convertDataProviderRequestToHTTP(type, resourceAPI, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, params));
};