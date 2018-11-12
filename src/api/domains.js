let domainsFuc = (env) => {
    let domain;
    if (env==='development') {
        domain = 'http://192.168.1.160:8082/crm'
    }else{
        domain = 'http://192.168.1.160:8082/crm'
    }
    return {
        domain:domain
    }
};
export default domainsFuc
