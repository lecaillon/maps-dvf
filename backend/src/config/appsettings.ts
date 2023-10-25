import os from "os";
import path from "path";

export const HOME = path.join(os.homedir(), ".maps-dvf");
export const PORT = 3000;
export const DVF_YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
export const DB_APP_PATH = path.resolve(__dirname, "../../database/maps-dvf.db");
export const DB_DVF_PATH = path.resolve(HOME, "dvf.db");
