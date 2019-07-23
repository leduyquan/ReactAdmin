import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    DELETE_MANY,
    fetchUtils,
} from 'react-admin';
import { AppConstant } from './constants';
import { stringify } from 'query-string';

//const API_URL = 'http://localhost:8000';
const API_URL = AppConstant.API_URL;

const convertDataProviderRequestToHTTP = (type, resource, params) => {
    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                _start: (page - 1) * perPage,
                _end: page * perPage,
                _sort: field,
                _order: order,
                q: params.filter.q,
            };
            return { url: `${API_URL}/${resource}` };//?${stringify(query)}` };
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
        case UPDATE: {
            let bodyRequest = null;
            if (resource === 'places/update') {
                bodyRequest = {
                    ...params.data,
                    images: convertArrayObjectToString(params.data.images)
                };
            } else bodyRequest = params.data;
            return {
                url: `${API_URL}/${resource}/${params.id}`,
                options: { method: 'PUT', body: JSON.stringify(bodyRequest) },
            };
        }
        case CREATE: {
            let bodyRequest = null;
            if (resource === 'places/create') {
                bodyRequest = {
                    ...params.data,
                    images: convertArrayObjectToString(params.data.images),
                    ...fakePostPlace
                };
            } else bodyRequest = params.data;
            console.log('bodyRequest', bodyRequest)
            return {
                url: `${API_URL}/${resource}`,
                options: { method: 'POST', body: JSON.stringify(bodyRequest) },
            };
        }
        case DELETE:
            return {
                url: `${API_URL}/${resource}/${params.id}`,
                options: { method: 'DELETE' },
            };

        case DELETE_MANY:
            return {
                url: `${API_URL}/${resource}`,
                options: { method: 'DELETE' },
            }

        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
};

const convertHTTPResponseToDataProvider = (response, type, params, resourceAPI) => {
    const { headers, json } = response;

    switch (type) {
        case GET_LIST:
            if (resourceAPI === 'places') {
                return {
                    data: json.data.map(x => ({ ...x, images: convertArrayStringToObject(x.images) })),
                    total: parseInt(headers.get('X-Total-Count'))
                };
            }
            return {
                data: json.data.map(x => ({ ...x })),
                total: parseInt(headers.get('X-Total-Count'))
            };
        case CREATE:
            return { data: { ...params.data, id: json.data.id } };
        case DELETE:
            return { data: { id: null } };
        case DELETE_MANY:
            //console.log('fdfdfdday ne', { data: [] })
            return { data: [] };
        default:
            if (resourceAPI === 'places/info') {
                return { data: { ...json.data, images: convertArrayStringToObject(json.data.images) } };
            }
            if (resourceAPI === 'places/update') {
                return { data: { ...json.data, images: convertArrayStringToObject(json.data.images) } };
            }
            return { data: { ...json.data } };
    }
};

export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const resourceAPI = getResource(type, resource);
    console.log('resourceAPI', resourceAPI)
    const { url, options } = convertDataProviderRequestToHTTP(type, resourceAPI, params);

    if (type === 'DELETE_MANY') {
        console.log(' params', params.ids)
        return params.ids.map(id => fetchJson(`${url}/${id}`, options)
            .then(response => convertHTTPResponseToDataProvider(response, type, params, resourceAPI))
        )
    }
    console.log('url', url)

    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, params, resourceAPI));
};

const convertArrayObjectToString = (array) => {
    let result = [];
    array.map(x => result.push(x.url));
    return result;
}

const convertArrayStringToObject = (array) => {
    let result = [];
    array.map(x => result.push({ url: x }));
    return result;
}

const fakePostPlace = {
    location: {
        type: 'Point',
        coordinates: [107.538995, 16.452682]
    },
    parentID: [],
    childID: ["5cee392bb1775203d079f07c"],
    tickets: [{ name: "qwe", price: 120000 }],
    boundary: { type: "Polygon", coordinates: [[[107.538651, 16.452639], [107.5393, 16.452815], [107.539006, 16.453824], [107.538352, 16.453652]]] },
    rating: 5,
    translations: [{
        languageCode: "vi",
        title: "Văn Miếu Huế",
        address: "Đường Văn Thánh, Hương Hồ, Hương Trà, Thừa Thiên Huế",
        shortDescription: "Dưới triều nhà Nguyễn, Văn Miếu của cả triều đại",
        audio: "",
        video: "/resources/places/VanMieuHue/translations/vi/videos/video.mp4"
    }]
}

const getResource = (type, resource) => {
    switch (type) {
        case GET_LIST: {
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
            };
        }
        case GET_ONE: {
            switch (resource) {
                case 'users':
                    return 'users';

                case 'places':
                    return 'places/info';

                case 'languages':
                    return 'languages';

                case 'objects':
                    return 'objects';

                default:
                    throw new Error(`Unknown resource ${resource}`);
            };
        }

        case GET_MANY: {
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
            };
        }
        case GET_MANY_REFERENCE: {
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
            };
        }
        case UPDATE: {
            switch (resource) {
                case 'users':
                    return 'users';

                case 'places':
                    return 'places/update';

                case 'languages':
                    return 'languages';

                case 'objects':
                    return 'objects';

                default:
                    throw new Error(`Unknown resource ${resource}`);
            };
        }
        case CREATE: {
            switch (resource) {
                case 'users':
                    return 'users';

                case 'places':
                    return 'places/create';

                case 'languages':
                    return 'languages';

                case 'objects':
                    return 'objects';

                default:
                    throw new Error(`Unknown resource ${resource}`);
            };
        }
        case DELETE: {
            switch (resource) {
                case 'users':
                    return 'users';

                case 'places':
                    return 'places/remove';

                case 'languages':
                    return 'languages';

                case 'objects':
                    return 'objects';

                default:
                    throw new Error(`Unknown resource ${resource}`);
            };
        }
        case DELETE_MANY: {
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
            };
        }
        default:
            throw new Error(`Unknown type ${type}`);
    }
};