export interface User {
    email:string,
    password:string
}

export interface Employee {
  _id?:string,
  name:string,
  description:string,
  date?:Date,
}

export interface Log {
  action:string,
  ip:string,
  hour:Date,
}