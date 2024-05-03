import mysql, { Pool, createPool } from 'mysql2';


export let pool: Pool;

function check(it: false | (Window & typeof globalThis) | typeof globalThis) {
    return it && it.Math === Math && it;
}
const globalObject =
check(typeof window === 'object' && window) ||
check(typeof self === 'object' && self) ||
check(typeof global === 'object' && global) ||
(() => {
    return this;
})() ||
Function('return this')();
const registerService = (name: string, initFn: any) => {
    if (process.env.NODE_ENV === 'development') {
        if (!(name in globalObject)) {
            globalObject[name] = initFn();
        }
      return globalObject[name];
    }
    return initFn();
};

pool = registerService('mysql', () =>
  mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: 3306,
  }),
);

pool.getConnection((err, conn) => {
    if (err) console.log('Error connecting to db...')
    else {
        console.log('Connected to db...!')
        conn.release()
    }
})

const executeQuery = (query: string, arrParams: any[]) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arrParams, (err, data) => {
                if (err) {
                    console.log('Error in executing the query')
                    reject(err)
                }
                console.log('------db.jsx------')
                //console.log(data)
                resolve(data)
            })
        } catch (err) {
            reject(err)
        }
    })
}

export default executeQuery