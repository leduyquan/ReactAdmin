import { stringify } from "query-string";
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    GET_MANY,
    GET_MANY_REFERENCE,
    DELETE_MANY,
    UPDATE_MANY
} from "react-admin";
import { fetchUtils } from "react-admin";

export default function (apiUrl, httpClient = fetchUtils.fetchJson) {
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = "";
        const options = {};
        options.user = {
            authenticated: true,
            token: "Bearer " + localStorage.getItem("token")
        };
        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...fetchUtils.flattenObject(params.filter),
                    sort: field,
                    order: order,
                    page: page,
                    perPage: perPage
                };
                //url = `${apiUrl}/${resource}`;
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }

            case GET_MANY: {
                const query = {
                    id: params.ids
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }

            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;

            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...fetchUtils.flattenObject(params.filter),
                    [params.target]: params.id,
                    _sort: field,
                    _order: order,
                    _start: (page - 1) * perPage,
                    _end: page * perPage
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }

            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = "POST";
                options.body = JSON.stringify(params.data);
                break;

            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = "PUT";
                options.body = JSON.stringify(params.data);
                break;

            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = "DELETE";
                break;

            case DELETE_MANY:
                url = `${apiUrl}/${resource}`;
                options.method = 'DELETE';
                break;

            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    

    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, json } = response;
        console.log("headers", headers);
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                console.log('haha', headers.get("accept"))
                return {
                    data: json.data,
                    total: parseInt(headers.get("X-Total-Count"))
                };

            case CREATE:
                return { data: { ...params.data, id: json.id } };

            case DELETE:
                return { data: { id: null } };

            default:
                return { data: json.data };
        }
    };

    return (type, resource, params) => {
        const { url, options } = convertDataRequestToHTTP(type, resource, params);
        // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`, options)))
                .then(responses => ({
                    data: responses.map(response => response.json)
                }));
        }

        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
}

