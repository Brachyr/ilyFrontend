import React from 'react';
import './App.css';
import Login from "./components/Login";
import Teacher from "./components/Teacher";
import Student from "./components/Student";
import Watcher from "./components/Watcher";
import { Admin, Resource, Create, SimpleForm, Edit, TextInput, ListGuesser, EditGuesser, EditButton, List, Datagrid, TextField } from "react-admin";
import restProvider from 'ra-data-simple-rest';

const dataProvider = restProvider('http://localhost:8090');

function App() {
    var role = sessionStorage.getItem('role');
    switch (role) {
        case 'teacher': return <Teacher />;
        case 'student': return <Student />;
        case 'watcher': return <Admin dataProvider={dataProvider}>
            <Resource name="test" list={TestList} edit={TestEdit} create={TestCreate} />
        </Admin>;
        default: return <Login />;
    }
}

export const TestList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="state" />
            <EditButton />
        </Datagrid>
    </List>
);

export const TestEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="state" />
        </SimpleForm>
    </Edit>
);

export const TestCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="state" />
        </SimpleForm>
    </Create>
);

export default App;
