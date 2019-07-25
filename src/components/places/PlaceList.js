import React from 'react';
import { Filter, SearchInput, List, Datagrid, TextField, ReferenceField, EditButton, ArrayField, UrlField, SingleFieldList } from 'react-admin';
import ShortTextField from '../../common/shortTextField'
import PlaceTitle from './PlaceTitle';

const PlaceFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
)

const PlaceList = props => (
    <List title={<PlaceTitle type="Places" />} filters={<PlaceFilter />} {...props}>
        <Datagrid>
            <TextField label="Name" source="translations[0].title" />
            <TextField source="code" />
            <ShortTextField source="makerIcon" length={30}/>
            <ShortTextField source="thumbnail" length={30}/>
            {/* <ArrayField source="images">
                <Datagrid>
                    <ShortTextField source="url" length={50}/>
                </Datagrid>
            </ArrayField> */}
            <TextField source="subType" />
            <TextField source="type" />
            <TextField source="owner" />
            <EditButton />
        </Datagrid>
    </List>
);

export default PlaceList;