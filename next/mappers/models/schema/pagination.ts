//@ts-ignore
import { Mapping } from "~/mappers";

const pagination: Mapping = {
    total: {},
    current_page: {
        newName: 'currentPage'
    },
    per_page: {
        newName: 'perPage'
    },
    last_page: {
        newName: 'lastPage'
    }
};

export default pagination