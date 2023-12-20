function returnstringOrNum<T> (val: T):T {
  return val
}

const test1 = returnstringOrNum<number>(53);
const test2 = returnstringOrNum<string>("53");
