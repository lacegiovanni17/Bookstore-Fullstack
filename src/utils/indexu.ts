import fs from "fs";

export const getAllData = (path: string) => {
    const result: any = fs.readFileSync(path, "utf-8")
    return JSON.parse(result);
}

export const createData = (path: string, data: any) => {
    const stringData = JSON.stringify(data, null, 2)
    const result: any = fs.writeFileSync(path, stringData);
}