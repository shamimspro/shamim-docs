import React from 'react';
import GithubLink from '../components/GithubLink';
import TopicBullet from '../components/TopicBullet';
import TopicCode from '../components/TopicCode';
import TopicHeading from '../components/TopicHeading';
import TopicParagraph from '../components/TopicParagraph';
import TopicTitle from '../components/TopicTitle';
import useTitle from '../hooks/useTitle';

const MongodbCrud = () => {
    useTitle("MongoDB CRUD");
    return (
        <>
            <TopicTitle>React Express Mongo CRUD</TopicTitle>
            <TopicHeading>What is CRUD operation?</TopicHeading>
            <TopicParagraph>In computer programming, create, read, update, and delete are the four basic operations of persistent storage. CRUD is also sometimes used to describe user interface conventions that facilitate viewing, searching, and changing information using computer-based forms and reports.</TopicParagraph>
            <TopicHeading>Server Side Project</TopicHeading>
            <TopicBullet>1: Setup server-side project (Use CMD)</TopicBullet>
            <TopicCode>{`mkdir server-project
cd server-project
npm init -y
npm install express
npm install cors
npm install mongodb
npm install dotenv`}</TopicCode>
            <TopicBullet>2: Folder structure of server-side project</TopicBullet>
            <TopicCode>{`node_modules
.env
.gitignore
index.js
package-lock.json
package.json
README.md`}</TopicCode>
            <TopicBullet>3: package.json</TopicBullet>
            <TopicCode>{`{
    "name": "react-express-mongo-crud-server",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/shamimspro/react-express-mongo-crud-server.git"
    },
    "keywords": [],
    "author": "Shamim Sarker",
    "license": "ISC",
    "bugs": {
        "url": "https://github.com/shamimspro/react-express-mongo-crud-server/issues"
    },
    "homepage": "https://github.com/shamimspro/react-express-mongo-crud-server#readme",
    "dependencies": {
        "cors": "^2.8.5",
        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "mongodb": "^4.11.0"
    }
}`}</TopicCode>
            <TopicBullet>3: .gitignore</TopicBullet>
            <TopicCode>{`node_modules`}</TopicCode>
            <TopicBullet>4: index.js</TopicBullet>
            <TopicCode>{`const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = \`mongodb+srv://\${process.env.DB_USER}:\${process.env.DB_PASSWORD}@cluster0.egsefuu.mongodb.net/?retryWrites=true&w=majority\`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

async function run() {
    try {
        const database = client.db("userDb");
        const collection = database.collection("userCollection");

        // C from CRUD
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await collection.insertOne(user);
            res.send(result);
            console.log('Data added successfully...');
        });

        // R from CRUD
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = collection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        // R from CRUD (find by id)
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const user = await collection.findOne(query);
            res.send(user);
        });

        // R from CRUD (using query parameters)
        // http://localhost:5000/usrs?firstName=Shamim (query parameter format)
        app.get('/usrs', async (req, res) => {
            let query = {};
            if(req.query.firstName) {
                query = {
                    firstName: req.query.firstName
                };
            }
            const cursor = collection.find(query);
            const usrs = await cursor.toArray();
            res.send(usrs);
        });

        // U from CRUD
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const user = req.body;
            const option = {upsert: true};
            const updatedUser = {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            };
            const result = await collection.updateOne(filter, updatedUser, option);
            res.send(result);
        });

        // D from CRUD
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await collection.deleteOne(query);
            res.send(result);
        });

    } catch(error) {
        console.log(error.message);
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is working fine!!!');
});

app.listen(port, () => {
    console.log(\`Example app listening on port \${port}\`);
});`}</TopicCode>

            <TopicBullet>5: .env</TopicBullet>
            <TopicCode>{`DB_USER="XXXXXXXXXX"
DB_PASSWORD="XXXXXXXXXXXXXXX"`}</TopicCode>

            <TopicHeading>Client Side Project</TopicHeading>
            <TopicBullet>1: Setup client-side project (Use CMD)</TopicBullet>
            <TopicCode>{`npm create vite@latest
√ Project name: ... vite-project
√ Select a framework: » React
√ Select a variant: » JavaScript
cd vite-project
npm install
npm install react-router-dom
npm install react-hook-form`}</TopicCode>
            <TopicBullet>2: Folder structure of client-side project</TopicBullet>
            <TopicCode>{`node_modules
public
src
    |-components
        |-DisplayData.jsx
        |-ErrorPage.jsx
        |-InsertData.jsx
        |-UpdateData.jsx
    |-App.jsx
    |-main.jsx
.gitignore
package-lock.json
package.json
README.md
vite.config.js`}</TopicCode>
            <TopicBullet>3: App.jsx</TopicBullet>
            <TopicCode>{`import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import DisplayData from './components/DisplayData';
import ErrorPage from './components/ErrorPage';
import InsertData from './components/InsertData';
import UpdateData from './components/UpdateData';

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            loader: () => fetch(\`http://localhost:5000/users/\`),
            element: <DisplayData></DisplayData>,
            errorElement: <ErrorPage></ErrorPage>
        },
        {
            path: '/insertData',
            element: <InsertData></InsertData>,
            errorElement: <ErrorPage></ErrorPage>
        },
        {
            path: '/update/:id',
            loader: ({params}) => fetch(\`http://localhost:5000/users/\${params.id}\`),
            element: <UpdateData></UpdateData>,
            errorElement: <ErrorPage></ErrorPage>
        }
    ]);
        return (
        <RouterProvider router={router}></RouterProvider>
    );
};

export default App;`}</TopicCode>

            <TopicBullet>4: DisplayData.jsx</TopicBullet>
            <TopicCode>{`import React, {useState} from 'react';
import {Link, useLoaderData} from 'react-router-dom';

const DisplayData = () => {
    // R from CRUD
    const [displayUsers, setDisplayUsers] = useState(useLoaderData());

    // D from CRUD
    const handleDelete = user => {
        fetch(\`http://localhost:5000/users/\${user._id}\`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => {
            const remainingUsers = displayUsers.filter(usr => usr._id !== user._id);
            setDisplayUsers(remainingUsers);
            console.log(\`\${user.firstName} \${user.lastName} is deleted successfully!!!\`);
        });
    };

    return (
        <>
            <h2>Display User Information</h2>
            <Link to={"/insertData"}><button>Insert New Data</button></Link>
            {
                displayUsers.map(user => <p key={user._id}>
                    {user.firstName} {user.lastName}
                    <Link to={\`/update/\${user._id}\`}><button>Update</button></Link>
                    <button onClick={() => handleDelete(user)}>Delete</button>
                </p>)
            }
        </>
    );
};

export default DisplayData;`} </TopicCode>

            <TopicBullet>5: InsertData.jsx</TopicBullet>
            <TopicCode>{`import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';

const InsertData = () => {
    const {register, handleSubmit, resetField} = useForm();
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // C from CRUD
    const onSubmitHandler = user => {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        }).then(() => {
            console.log(\`\${user.firstName} \${user.lastName} is inserted successfully!!!\`);
            setMessage(\`\${user.firstName} \${user.lastName} is inserted successfully!!!\`);
            resetField("firstName");
            resetField("lastName");
            setErrorMessage('');
        }).catch(error => {
            console.error(error.message);
            setErrorMessage('Insert Data failed!!!');
            setMessage('');
        });
    };

    const onFocusHandler = () => {
        setMessage('');
        setErrorMessage('');
    };

    return (
        <>
            <h2>Insert Data</h2>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <input onFocus={onFocusHandler} {...register('firstName')} placeholder='First Name' /><br />
                <input onFocus={onFocusHandler} {...register('lastName')} placeholder='Last Name' /><br />
                <button type="submit">Submit</button>
                <Link to={"/"}><button>Display</button></Link>
            </form>
            <p style={{color: "green"}}>{message}</p>
            <p style={{color: "red"}}>{errorMessage}</p>
        </>
    );
};

export default InsertData;`}</TopicCode>

            <TopicBullet>6: UpdateData.jsx</TopicBullet>
            <TopicCode>{`import React from 'react';
import {useForm} from 'react-hook-form';
import {useLoaderData, useNavigate} from 'react-router-dom';

const UpdateData = () => {
    const {register, handleSubmit} = useForm();
    const storedUser = useLoaderData();
    const navigate = useNavigate();

    // U from CRUD
    const onUpdateHandler = user => {
        fetch(\`http://localhost:5000/users/\${storedUser._id}\`, {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        }).then(() => {
            console.log(\`\${user.firstName} \${user.lastName} is updated successfully!!!\`);
            navigate("/");
        }).catch(err => console.log(err));
    };

    return (
        <>
            <h2>Update Data</h2>
            <form onSubmit={handleSubmit(onUpdateHandler)}>
                <input defaultValue={storedUser.firstName} {...register('firstName')} /><br />
                <input defaultValue={storedUser.lastName} {...register('lastName')} /><br />
                <button type="submit">Update</button>
            </form>
        </>
    );
};

export default UpdateData;`}</TopicCode>

            <TopicBullet>7: ErrorPage.jsx</TopicBullet>
            <TopicCode>{`import React from 'react';

const ErrorPage = () => {
    return (
        <div>
            <h2>404 Not Found!!!</h2>
        </div>
    );
};

export default ErrorPage;`}</TopicCode>

            <TopicHeading>Some Instructions</TopicHeading>
            <TopicParagraph>This CRUD operation project is three tier architechture project. So, to run this project we have to open three servers. They are React.js frontend server, Node.js backend server, MongoDB database server.</TopicParagraph>

            <div className='flex justify-center gap-x-3'>
                <GithubLink>{'https://github.com/shamimspro/react-express-mongo-crud-server'}</GithubLink>
                <GithubLink>{'https://github.com/shamimspro/react-express-mongo-crud-client'}</GithubLink>
                <GithubLink>{'https://github.com/shamimspro/amazon-server'}</GithubLink>
                <GithubLink>{'https://github.com/shamimspro/amazon-client'}</GithubLink>
            </div>
        </>
    );
};

export default MongodbCrud;