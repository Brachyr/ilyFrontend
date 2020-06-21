import React from 'react';
import { Admin, Resource, Create, SimpleForm, Edit, TextInput, ListGuesser, EditGuesser, EditButton, List, Datagrid, TextField } from "react-admin";
import restProvider from 'ra-data-simple-rest';

const dataProvider = restProvider('http://localhost:8090');

export function MyAdmin() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="test" list={TestList} edit={TestEdit} create={TestCreate} />
        </Admin>);
}

const TestList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="state" />
            <EditButton />
        </Datagrid>
    </List>
);

const TestEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="state" />
        </SimpleForm>
    </Edit>
);

const TestCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="state" />
        </SimpleForm>
    </Create>
);