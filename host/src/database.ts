import * as mongodb from "mongodb";
import { Employee } from "./employee";
import { User } from "./user";

export const collections: {
    employees?: mongodb.Collection<Employee>;
    users?: mongodb.Collection<User>;
} = {};


export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("wishlearndb");
    await applySchemaValidation(db);

    const employeesCollection = db.collection<Employee>("employees");
    const usersCollection = db.collection<User>("user");
    collections.employees = employeesCollection;
    collections.users = usersCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                position: {
                    bsonType: "string",
                    description: "'position' is required and is a string",
                    minLength: 5
                },
                level: {
                    bsonType: "string",
                    description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["junior", "mid", "senior"],
                },
            },
        },
    };

    const jsonSchema_user = {
        $jsonSchema: {
            bsonType: "object",
            required: ["fname", "lname", "pno", "email", "dob", "gender", "type"],
            additionalProperties: false,
            properties: {
                _id: {},
                fname: {
                    bsonType: "string",
                    description: "'First name' is required and is a string",
                },
                lname: {
                    bsonType: "string",
                    description: "'Last name' is required and is a string",
                    minLength: 5
                },
                pno: {
                    bsonType: "string",
                    description: "'Phone number' is required and is a string",
                    minLength: 10
                },
                email: {
                    bsonType: "string",
                    description: "'Email' is required and is a string",
                    minLength: 10
                },
                dob: {
                    bsonType: "string",
                    description: "'date of birth' is required and is a string",
                    minLength: 10
                },
                gender: {
                    bsonType: "string",
                    description: "'Gender' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["male", "female"],
                },
                type: {
                    bsonType: "string",
                    description: "'Type' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["teacher", "student"],
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "employees",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("employees", { validator: jsonSchema });
        }
    });

    await db.command({
        collMod: "users",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("users", { validator: jsonSchema_user });
        }
    });
}