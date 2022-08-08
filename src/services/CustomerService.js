import axios from "../axios";

class CustomerService {
    loginCustomer = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('auth/login', data)    // 20s
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        });

        return await promise;
    }
    postCustomer = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('users', data)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }
    putCustomer = async (data, id) => {
        const promise = new Promise((resolve, reject) => {
            axios.put('users/' + id, data)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }
    getAllCustomer = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('users')
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    }

    deleteCustomer = async (params) => {
        const promise = new Promise((resolve, reject) => {
            axios.delete('users/' + params,)
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    };

}

export default new CustomerService();