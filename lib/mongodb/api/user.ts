import { User } from "@/lib/objects/User";
import clientPromise from "../mongodb";

export interface ResultProps {
  _id: string;
  users: User[];
}

export async function getUser(username: string): Promise<User | null> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  const results = await collection.findOne<User>(
    { username },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    return {
      ...results,
    };
  } else {
    return null;
  }
}

export async function getFirstUser(): Promise<User | null> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  const results = await collection.findOne<User>(
    {},
    {
      projection: { _id: 0, emailVerified: 0 }
    }
  );
  if (results) {
    return {
      ...results,
    };
  } else {
    return null;
  }
}

export async function getAllUsers(): Promise<ResultProps[]> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection
    .aggregate<ResultProps>([
      {
        $limit: 1000
      },
      {
        $group: {
          _id: {
            $toLower: { $substrCP: ['$name', 0, 1] }
          },
          users: {
            $push: {
              name: '$name',
              email: '$email',
              image: '$image',
              status: '$status'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        //sort alphabetically
        $sort: {
          _id: 1
        }
      }
    ])
    .toArray();
}

export async function searchUser(query: string): Promise<User[]> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection
    .aggregate<User>([
      {
        $search: {
          index: 'name-index',
          /* 
          name-index is a search index as follows:

          {
            "mappings": {
              "fields": {
                "followers": {
                  "type": "number"
                },
                "name": {
                  "analyzer": "lucene.whitespace",
                  "searchAnalyzer": "lucene.whitespace",
                  "type": "string"
                },
                "username": {
                  "type": "string"
                }
              }
            }
          }

          */
          text: {
            query: query,
            path: {
              wildcard: '*' // match on both name and username
            },
            fuzzy: {},
            score: {
              // search ranking algorithm: multiply relevance score by the log1p of follower count
              function: {
                multiply: [
                  {
                    score: 'relevance'
                  },
                  {
                    log1p: {
                      path: {
                        value: 'followers'
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        // filter out users that are not verified
        $match: {
          verified: true
        }
      },
      // limit to 10 results
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          emailVerified: 0,
          score: {
            $meta: 'searchScore'
          }
        }
      }
    ])
    .toArray();
}

export async function getUserCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection.countDocuments();
}

export async function updateUser(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection.updateOne({ username }, { $set: { bio } });
}
